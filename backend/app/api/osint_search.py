from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional

router = APIRouter()

class OSINTSearchRequest(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None

@router.post("/osint-search")
async def osint_search(payload: OSINTSearchRequest):
    if not any([payload.username, payload.email, payload.full_name]):
        raise HTTPException(status_code=400, detail="Provide at least one input")

    base_ddg = "https://duckduckgo.com/?q="
    results = []

    if payload.username:
        q = f'"{payload.username}" site:pastebin.com OR site:github.com OR site:reddit.com'
        results.append({
            "type": "username",
            "query": payload.username,
            "search_url": base_ddg + q.replace(" ", "+")
        })

    if payload.email:
        q = f'"{payload.email}" site:haveibeenpwned.com OR site:pastebin.com OR filetype:txt'
        results.append({
            "type": "email",
            "query": payload.email,
            "search_url": base_ddg + q.replace(" ", "+")
        })

    if payload.full_name:
        q = f'"{payload.full_name}" site:linkedin.com OR site:facebook.com OR site:github.com'
        results.append({
            "type": "full_name",
            "query": payload.full_name,
            "search_url": base_ddg + q.replace(" ", "+")
        })

    return {
        "input": payload,
        "search_links": results
    }
