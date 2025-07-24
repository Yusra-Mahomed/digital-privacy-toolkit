# filename: username_scan.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import subprocess
import json
import os
import tempfile
import shutil

router = APIRouter()

class UsernameScanRequest(BaseModel):
    username: str

@router.post("/username-scan")
async def scan_username(payload: UsernameScanRequest):
    username = payload.username.strip()
    if not username:
        raise HTTPException(status_code=400, detail="Username is required")

    found = []
    not_found = []
    errors = []

    headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html,application/xhtml+xml"
    }

    # Basic platform scan
    platforms = {
        "GitHub": f"https://github.com/{username}",
        "Reddit": f"https://www.reddit.com/user/{username}",
        "Instagram": f"https://www.instagram.com/{username}/",
        "Pastebin": f"https://pastebin.com/u/{username}"
    }

    async with httpx.AsyncClient(timeout=5.0, follow_redirects=True, headers=headers) as client:
        for platform, url in platforms.items():
            try:
                resp = await client.get(url)
                if resp.status_code == 200:
                    found.append({"platform": platform, "url": url})
                elif resp.status_code == 404:
                    not_found.append(platform)
                else:
                    errors.append({"platform": platform, "status": resp.status_code})
            except Exception as e:
                errors.append({"platform": platform, "error": str(e)})

    return {
        "username": username,
        "found": found,
        "not_found": not_found,
        "errors": errors,
    }
