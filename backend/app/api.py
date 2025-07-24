from fastapi import APIRouter

router = APIRouter()

@router.get("/api/hello")
def read_hello():
    return {"message": "Hello from FastAPI!"}
