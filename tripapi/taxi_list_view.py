# taxi_list_view.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


# --- Request Model ---
class TaxiListRequest(BaseModel):
    eventId: str | None = None
    title: str | None = None


# --- Mock Data ---
# Matches the data structure used in taxi_list_multi.html / TaxiListMulti.js
MOCK_TAXI_LISTS = [
    {
        "id": 1,
        "provider": "UberX",
        "type": "Standard Sedan",
        "seats": 4,
        "luggage": 2,
        "duration": "45 min trip",
        "rating": 4.8,
        "price": "$65.00",
    },
    {
        "id": 2,
        "provider": "Lyft XL",
        "type": "Large SUV",
        "seats": 6,
        "luggage": 4,
        "duration": "45 min trip",
        "rating": 4.9,
        "price": "$95.50",
    },
    {
        "id": 3,
        "provider": "Yellow Cab",
        "type": "City Taxi",
        "seats": 4,
        "luggage": 2,
        "duration": "50 min trip",
        "rating": 4.5,
        "price": "$55.00",
    },
    {
        "id": 4,
        "provider": "Uber Black",
        "type": "Luxury Sedan",
        "seats": 4,
        "luggage": 3,
        "duration": "45 min trip",
        "rating": 5.0,
        "price": "$120.00",
    },
    {
        "id": 5,
        "provider": "Shuttle Van",
        "type": "Shared Van",
        "seats": 12,
        "luggage": 10,
        "duration": "1h 10m trip",
        "rating": 4.2,
        "price": "$25.00",
    },
]


# --- Endpoint ---
@router.post("/trip/taxi/list")
async def get_taxi_lists(request: TaxiListRequest):
    """
    Receives an eventId and returns the list of available taxi/transfer options.
    """
    print(f"Fetching taxi list for event: {request.eventId} - {request.title}")
    return MOCK_TAXI_LISTS