# flight_passenger_view.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


# --- Request Model ---
class FlightPassengerRequest(BaseModel):
    flightId: str | None = None


# --- Endpoint ---
@router.post("/trip/flight/passengers")
async def get_passenger_config(request: FlightPassengerRequest):
    """
    Returns the pricing and configuration needed for the passenger details form.
    Matches the data structure expected by the FlightPricePassenger React component.
    """
    # Mock logic to return a specific price based on the selected flight ID.
    # In a real app, this would query a database or external airline API.
    base_price = 424.00 if request.flightId == "f2" else 416.50

    return {
        "flightId": request.flightId,
        "basePrice": base_price,
        "currency": "USD",
        "taxesAndFees": "Included",
        "message": "Passenger configuration loaded successfully.",
    }
