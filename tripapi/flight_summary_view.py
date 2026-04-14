# flight_summary_view.py
from typing import Dict

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


# --- Request Model ---
class MealPreferenceRequest(BaseModel):
    # Expecting a dict like: {"p1": {"meal": "VGML", "allergies": "", "beverage": ""}}
    preferences: Dict[str, Dict[str, str]]


# --- Endpoint ---
@router.post("/trip/flight/summary")
async def finalize_booking_summary(request: MealPreferenceRequest):
    """
    Receives the final meal preferences, finalizes the booking,
    and returns the complete summary data for the checkout page.
    """
    print(f"Meal preferences saved: {request.preferences}")

    # Mock Data matching the structure needed to render flight_summary.html
    # In a real app, this would pull together data from the database using the session/booking ID.
    mock_summary_data = {
        "status": "success",
        "bookingReference": "EY-88492-X",
        "flight": {
            "airline": "Etihad Airways (EY)",
            "timeRange": "21:55 - 02:35",
            "nextDay": "(+2d)",
            "durationStops": "18h 10m | 1 Stop (AUH)",
            "segments": [
                {
                    "depTime": "21:55 JFK",
                    "depCode": "New York T4",
                    "meta": "Boeing 787-9 | 12h 40m",
                    "arrTime": "19:35 AUH",
                    "arrCode": "Abu Dhabi TA",
                    "isLast": False,
                },
                {
                    "depTime": "21:00 AUH",
                    "depCode": "Abu Dhabi TA",
                    "meta": "Boeing 737 Max 8 | Operated by Akasa Air",
                    "arrTime": "02:35 COK",
                    "arrCode": "Kochi T3",
                    "isLast": True,
                },
            ],
            "layover": "1h 25m Layover in Abu Dhabi",
        },
        "passengers": [
            {
                "id": "p1",
                "name": "Ajai Varghese",
                "type": "Adult",
                "seat": "4A",
                "seatType": "Window",
                "meal": "VGML",
                "mealDesc": "Vegetarian Vegan",
            },
            {
                "id": "p2",
                "name": "Annette Ajai",
                "type": "Child (8 yrs)",
                "seat": "4B",
                "seatType": "Middle",
                "meal": "CHML",
                "mealDesc": "Child Meal",
            },
        ],
        "pricing": {"currency": "USD", "totalAmount": "833.00"},
    }

    return mock_summary_data
