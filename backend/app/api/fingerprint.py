from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any, List, Tuple

router = APIRouter()

class FingerprintPayload(BaseModel):
    visitorId: str
    components: Dict[str, Any]


# -------------------------
# Scoring logic
# -------------------------
def score_components(components: Dict[str, Any]) -> Tuple[int, List[str]]:
    score = 0
    reasons = []

    # Screen resolution
    common_resolutions = ["1920x1080", "1366x768", "1536x864"]
    if components.get("screenResolution") not in common_resolutions:
        score += 1
        reasons.append("Uncommon screen resolution")

    # Plugins
    plugins = components.get("plugins", [])

    default_plugins = [
        "PDF Viewer",
        "Chrome PDF Viewer",
        "Chromium PDF Viewer",
        "Microsoft Edge PDF Viewer",
        "WebKit built-in PDF"
    ]

    # Remove default browser plugins
    real_plugins = [p for p in plugins if p not in default_plugins]

    if isinstance(real_plugins, list):
        if len(real_plugins) > 2:
            score += 2
            reasons.append("Additional browser plugins detected")
        elif len(real_plugins) > 0:
            score += 1
            reasons.append("Some additional browser plugins")

    # Hardware concurrency
    hc = components.get("hardwareConcurrency", 0)
    if isinstance(hc, int):
        if hc >= 8:
            score += 1
            reasons.append("High CPU core count")
        if hc >= 12:
            score += 1
            reasons.append("Very high CPU core count")

    # Device memory
    mem = components.get("deviceMemory", 0)
    if isinstance(mem, (int, float)) and mem >= 8:
        score += 1
        reasons.append("High device memory")

    # Timezone
    common_timezones = ["UTC", "America/New_York", "Europe/London"]
    if components.get("timezone") not in common_timezones:
        score += 1
        reasons.append("Less common timezone")

    # Canvas fingerprint
    if components.get("canvasFingerprint"):
        score += 2
        reasons.append("Canvas fingerprint available")

    # Audio fingerprint
    if components.get("audioFingerprint"):
        score += 2
        reasons.append("Audio fingerprint available")

    # Touch support (helps differentiate mobile vs desktop)
    if components.get("touchSupport"):
        score += 1
        reasons.append("Touch-enabled device")

    return score, reasons


# -------------------------
# Classification
# -------------------------
def classify(score: int) -> str:
    if score <= 2:
        return "Low"
    elif score <= 5:
        return "Medium"
    else:
        return "High"


# -------------------------
# API endpoint
# -------------------------
@router.post("/fingerprint")
async def analyze_fingerprint(data: FingerprintPayload):
    components = data.components

    score, reasons = score_components(components)
    estimated = classify(score)

    # Percentile (UX improvement)
    if score <= 2:
        percentile = "Top 80% (common device)"
    elif score <= 5:
        percentile = "Top 40%"
    else:
        percentile = "Top 10% (highly unique)"

    return {
        "message": "Fingerprint analyzed",
        "visitorId": data.visitorId,
        "components_collected": len(components),
        "uniqueness_score": score,
        "estimated_uniqueness": estimated,
        "percentile": percentile,
        "reasons": reasons,
        "tip": "Try incognito mode, disabling extensions, or switching browsers to reduce fingerprint uniqueness.",
        "components": components
    }