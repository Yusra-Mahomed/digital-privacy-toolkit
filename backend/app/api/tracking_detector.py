
# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel, HttpUrl
# from bs4 import BeautifulSoup
# from urllib.parse import urlparse
# import tldextract
# from playwright.async_api import async_playwright

# router = APIRouter()

# class URLRequest(BaseModel):
#     url: HttpUrl

# @router.post("/analyze-url")
# async def analyze_url(payload: URLRequest):
#     url_str = str(payload.url)
#     print("✅ Received request:", payload)

#     try:
#         async with async_playwright() as p:
#             browser = await p.chromium.launch(headless=True)
#             context = await browser.new_context()
#             page = await context.new_page()
#             await page.goto(url_str, wait_until="load", timeout=450000)

#             html = await page.content()
#             cookies = await context.cookies()
#             await browser.close()

#         # Cookie processing
#         cookie_details = []
#         for c in cookies:
#             cookie_details.append({
#                 "name": c["name"],
#                 "value": c["value"],
#                 "domain": c["domain"],
#                 "path": c["path"],
#                 "expires": c["expires"],
#                 "secure": c.get("secure", False),
#                 "httponly": c.get("httpOnly", False),
#                 "samesite": c.get("sameSite", "None")
#             })

#         cookie_count = len(cookie_details)

#         # HTML parsing for scripts
#         soup = BeautifulSoup(html, "html.parser")
#         scripts = soup.find_all("script")

#         script_sources = []
#         third_party_scripts = set()

#         base_domain = tldextract.extract(url_str).registered_domain

#         for script in scripts:
#             src = script.get("src")
#             if src:
#                 script_sources.append(src)
#                 parsed = urlparse(src)
#                 script_domain = tldextract.extract(parsed.netloc).registered_domain
#                 if script_domain and script_domain != base_domain:
#                     third_party_scripts.add(script_domain)

#         # Known trackers
#         known_trackers = [
#             "google-analytics.com", "googletagmanager.com", "facebook.net",
#             "doubleclick.net", "tiktok.com"
#         ]
#         found_trackers = [
#             domain for domain in third_party_scripts
#             if any(t in domain for t in known_trackers)
#         ]

#         # Warnings & Scoring
#         score = 0
#         warnings = []

#         if len(scripts) > 50:
#             score += 2
#             warnings.append("High number of scripts may mean more tracking or ads.")

#         third_party_count = len(third_party_scripts)
#         if third_party_count > 5:
#             score += 3
#             warnings.append("Multiple third-party domains detected.")
#         elif third_party_count > 2:
#             score += 2

#         if found_trackers:
#             score += 3
#             warnings.append(f"Known trackers detected: {', '.join(found_trackers)}")

#         if cookie_count > 0:
#             score += 1

#         insecure_cookies = [
#             c for c in cookie_details
#             if not c["secure"] or not c["httponly"]
#         ]
#         if insecure_cookies:
#             score += 1
#             warnings.append("Some cookies are missing Secure or HttpOnly flags.")

#         # Risk level
#         if score >= 7:
#             risk = "High 🔴"
#         elif score >= 4:
#             risk = "Moderate 🟡"
#         else:
#             risk = "Low 🔵"

#         result = {
#             "total_scripts": len(scripts),
#             "external_scripts": len(script_sources),
#             "third_party_domains": list(third_party_scripts),
#             "known_trackers_found": found_trackers,
#             "cookie_count": cookie_count,
#             "cookie_details": cookie_details,
#             "privacy_score": score,
#             "risk_level": risk,
#             "warnings": warnings
#         }

#         return {"message": "URL analysis complete", "result": result}

#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Error analyzing URL: {str(e)}")
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import tldextract
from playwright.async_api import async_playwright

router = APIRouter()

class URLRequest(BaseModel):
    url: HttpUrl

MAX_SCRIPTS_ANALYZED = 40
MAX_THIRD_PARTY_DOMAINS = 5
MAX_COOKIES_DISPLAYED = 30

@router.post("/analyze-url")
async def analyze_url(payload: URLRequest):
    url_str = str(payload.url)
    print("✅ Received request:", payload)

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context()
            page = await context.new_page()
            await page.goto(url_str, wait_until="domcontentloaded", timeout=10000)


            html = await page.content()
            cookies = await context.cookies()
            await browser.close()

        # Cookie processing (limited)
        cookies = cookies[:MAX_COOKIES_DISPLAYED]
        cookie_details = [{
            "name": c["name"],
            "value": c["value"],
            "domain": c["domain"],
            "path": c["path"],
            "expires": c["expires"],
            "secure": c.get("secure", False),
            "httponly": c.get("httpOnly", False),
            "samesite": c.get("sameSite", "None")
        } for c in cookies]
        cookie_count = len(cookie_details)

        # HTML parsing for scripts (limited)
        soup = BeautifulSoup(html, "html.parser")
        scripts = []
        for i, s in enumerate(soup.find_all("script")):
            scripts.append(s)
            if i + 1 >= MAX_SCRIPTS_ANALYZED:
                break

        script_sources = []
        third_party_scripts = set()
        base_domain = tldextract.extract(url_str).registered_domain

        for script in scripts:
            src = script.get("src")
            if src:
                script_sources.append(src)
                parsed = urlparse(src)
                script_domain = tldextract.extract(parsed.netloc).registered_domain
                if script_domain and script_domain != base_domain:
                    third_party_scripts.add(script_domain)
                    if len(third_party_scripts) >= MAX_THIRD_PARTY_DOMAINS:
                        break

        known_trackers = [
            "google-analytics.com", "googletagmanager.com", "facebook.net",
            "doubleclick.net", "tiktok.com"
        ]
        found_trackers = [
            domain for domain in third_party_scripts
            if any(t in domain for t in known_trackers)
        ]

        # Warnings & Scoring
        score = 0
        warnings = []

        if len(scripts) > 50:
            score += 2
            warnings.append("High number of scripts may mean more tracking or ads.")

        third_party_count = len(third_party_scripts)
        if third_party_count > 5:
            score += 3
            warnings.append("Multiple third-party domains detected.")
        elif third_party_count > 2:
            score += 2

        if found_trackers:
            score += 3
            warnings.append(f"Known trackers detected: {', '.join(found_trackers)}")

        if cookie_count > 0:
            score += 1

        insecure_cookies = [
            c for c in cookie_details
            if not c["secure"] or not c["httponly"]
        ]
        if insecure_cookies:
            score += 1
            warnings.append("Some cookies are missing Secure or HttpOnly flags.")

        # Risk level
        if score >= 7:
            risk = "High 🔴"
        elif score >= 4:
            risk = "Moderate 🟡"
        else:
            risk = "Low 🔵"

        result = {
            "total_scripts": len(scripts),
            "external_scripts": len(script_sources),
            "third_party_domains": list(third_party_scripts),
            "known_trackers_found": found_trackers,
            "cookie_count": cookie_count,
            "cookie_details": cookie_details,
            "privacy_score": score,
            "risk_level": risk,
            "warnings": warnings
        }

        return {"message": "URL analysis complete", "result": result}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error analyzing URL: {str(e)}")
