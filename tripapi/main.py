from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# --- 1. SETUP CORS MIDDLEWARE (MUST BE BEFORE ROUTES) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)


# --- 2. DEFINE INPUT MODEL ---
class CalculationRequest(BaseModel):
    value1: float
    value2: float


@app.get("/", tags=["Health"])
async def root():
    return {"message": "API is running"}


# --- 3. DEFINE ENDPOINTS (WITH DOUBLE DECORATOR) ---
@app.post("/calculate")  # Catches URLs without slash
@app.post("/calculate/")  # Catches URLs with slash
async def calculate_sum(request: CalculationRequest):
    sum_result = request.value1 + request.value2
    return {"value3": sum_result}
