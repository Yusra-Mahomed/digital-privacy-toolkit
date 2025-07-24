from fastapi import APIRouter
from .tracking_detector import router as tracking_router
from .fingerprint import router as fingerprint_router
from .social import router as social_router  # 👈 new import
from .osint_search import router as social2_router
from .osint_preview import router as preview_router


router = APIRouter()
router.include_router(tracking_router, prefix="/tracking", tags=["Tracking Analysis"])
router.include_router(fingerprint_router, prefix="/fingerprint", tags=["Browser Fingerprint"])
router.include_router(social_router, prefix="/social", tags=["Social Exposure"])  # 👈 new route
router.include_router(social2_router, prefix="/social")  # 👈 new route
router.include_router(preview_router, prefix="/social")
