from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter()

class FingerprintPayload(BaseModel):
    visitorId: str
    components: Dict[str, Any]

@router.post("/fingerprint")
async def analyze_fingerprint(data: FingerprintPayload):
    entropy = len(data.components)
    high_entropy_keys = ["canvasFingerprint", "audioFingerprint", "plugins", "userAgent", "hardwareConcurrency"]

    uniqueness_score = sum(1 for key in high_entropy_keys if key in data.components)

    estimated = "High" if uniqueness_score >= 4 else "Medium" if uniqueness_score >= 2 else "Low"

    return {
        "message": "Fingerprint received",
        "visitorId": data.visitorId,
        "components_collected": entropy,
        "estimated_uniqueness": estimated,
        "tip": "Try running in private browsing mode or with extensions disabled to see how your fingerprint changes.",
        "components": data.components
    }
