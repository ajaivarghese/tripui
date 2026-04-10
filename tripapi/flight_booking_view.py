# flight_booking_view.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class FlightSearchInitiateRequest(BaseModel):
    eventId: str | None = None
    title: str | None = None


# Mock data representing the options available in flight_booking.html
MOCK_FLIGHT_SEARCH_CONFIG = {
    "airports": [
        "JFK - New York John F. Kennedy",
        "LHR - London Heathrow",
        "DXB - Dubai International",
        "SIN - Singapore Changi",
        "HND - Tokyo Haneda",
        "CDG - Paris Charles de Gaulle",
        "AMS - Amsterdam Schiphol",
        "FRA - Frankfurt Airport",
        "SYD - Sydney Kingsford Smith",
        "DEL - Indira Gandhi International",
    ],
    "classes": [
        {"value": "economy", "label": "Economy"},
        {"value": "premium_economy", "label": "Premium Economy"},
        {"value": "business", "label": "Business"},
        {"value": "first", "label": "First Class"},
    ],
    "maxAdults": 9,
    "maxChildren": 9,
}


@router.post("/trip/flights/search")
async def initiate_flight_search(request: FlightSearchInitiateRequest):
    """
    Returns the configuration/mock data needed to populate the flight search form.
    """
    # In a real app, you might use request.eventId to pre-fill dates/locations
    return MOCK_FLIGHT_SEARCH_CONFIG