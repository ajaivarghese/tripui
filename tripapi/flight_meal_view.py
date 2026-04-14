# flight_meal_view.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

# --- Request Model ---
class SeatConfirmationRequest(BaseModel):
    seats: List[str]
    # In a real app, you would likely receive a booking ID here to associate the seats.

# --- Endpoint ---
@router.post("/trip/flight/meals")
async def get_meal_config(request: SeatConfirmationRequest):
    """
    Receives the confirmed seats and returns the configuration needed 
    to populate the meal preference form.
    """
    print(f"Seats confirmed: {request.seats}")

    # Generate a mock list of passengers based on the number of seats selected.
    # This matches the structure expected by FlightMealPreference.js
    mock_passengers = []
    
    for i, seat in enumerate(request.seats):
        # Just creating a mock label for the UI
        label = "Adult" if i == 0 else "Child/Adult" 
        mock_passengers.append({
            "id": f"p{i+1}",
            "name": f"Traveler {i+1} ({label})"
        })

    # If no seats were passed (fallback scenario), return at least one passenger
    if not mock_passengers:
         mock_passengers.append({"id": "p1", "name": "Traveler 1 (Adult)"})

    return {
        "status": "success",
        "message": "Seats locked. Proceed to meal preferences.",
        "passengers": mock_passengers
    }