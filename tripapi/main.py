from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field, EmailStr
import random
import uuid
import datetime # <--- CHANGED: Import the full module to avoid naming conflicts

app = FastAPI(
    title="Flight Booking API",
    description="A simple API to simulate flight bookings via POST requests.",
    version="1.0.0"
)

# --- Pydantic Models (Data Structures) ---

class Passenger(BaseModel):
    first_name: str = Field(..., min_length=1, description="Passenger's first name")
    last_name: str = Field(..., min_length=1, description="Passenger's last name")
    email: EmailStr = Field(..., description="Valid email address for ticket confirmation")

class BookingRequest(BaseModel):
    origin: str = Field(..., min_length=3, max_length=3, description="IATA code for origin (e.g., JFK)")
    destination: str = Field(..., min_length=3, max_length=3, description="IATA code for destination (e.g., LHR)")
    
    # --- FIX IS BELOW ---
    # We use 'datetime.date' for the type, so it doesn't clash with the field name 'date'
    date: datetime.date = Field(..., description="Flight date (YYYY-MM-DD)") 
    # --------------------

    passenger: Passenger
    seat_class: str = Field("economy", pattern="^(economy|business|first)$", description="Seat class preference")

class BookingResponse(BaseModel):
    booking_id: str
    status: str
    flight_number: str
    seat: str
    price: float
    message: str
    request_details: BookingRequest

# --- Helper Functions (Simulating Business Logic) ---

def generate_flight_number(origin: str, destination: str) -> str:
    """Generates a fake flight number based on route."""
    airline_code = "AZ"
    number = random.randint(100, 999)
    return f"{airline_code}{number}"

def calculate_price(seat_class: str) -> float:
    """Simulates price calculation based on class."""
    base_price = 150.00
    multipliers = {"economy": 1.0, "business": 2.5, "first": 4.0}
    return base_price * multipliers.get(seat_class, 1.0)

# --- API Endpoints ---

@app.post(
    "/bookings", 
    response_model=BookingResponse, 
    status_code=status.HTTP_201_CREATED,
    tags=["Bookings"]
)
async def create_booking(booking: BookingRequest):
    """
    Creates a new flight booking.
    """
    
    if booking.origin.upper() == booking.destination.upper():
        raise HTTPException(status_code=400, detail="Origin and Destination cannot be the same.")

    booking_id = f"BLK-{uuid.uuid4().hex[:8].upper()}"
    flight_num = generate_flight_number(booking.origin, booking.destination)
    ticket_price = calculate_price(booking.seat_class)
    assigned_seat = f"{random.randint(1, 30)}{random.choice(['A', 'B', 'C', 'D', 'E', 'F'])}"

    response_data = BookingResponse(
        booking_id=booking_id,
        status="confirmed",
        flight_number=flight_num,
        seat=assigned_seat,
        price=ticket_price,
        message="Flight booked successfully.",
        request_details=booking
    )
    
    return response_data

@app.get("/", tags=["Health"])
async def root():
    return {"message": "Flight Booking API is running. Go to /docs for Swagger UI."}
