from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from ddgs import DDGS

router = APIRouter()

class OSINTPreviewRequest(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    full_name: Optional[str] = None
    max_results: Optional[int] = 5

@router.post("/osint-preview")
def osint_preview(payload: OSINTPreviewRequest):
    if not any([payload.username, payload.email, payload.full_name]):
        raise HTTPException(status_code=400, detail="At least one input is required")

    preview_data = {}

    with DDGS() as ddgs:
        if payload.full_name:
            preview_data["full_name"] = list(ddgs.text(payload.full_name, max_results=payload.max_results))
        if payload.username:
            preview_data["username"] = list(ddgs.text(payload.username, max_results=payload.max_results))
        if payload.email:
            preview_data["email"] = list(ddgs.text(payload.email, max_results=payload.max_results))

    return preview_data
