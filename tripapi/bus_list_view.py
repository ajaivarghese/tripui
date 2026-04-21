# bus_list_view.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


# --- Request Model ---
class BusListRequest(BaseModel):
    eventId: str | None = None
    title: str | None = None


# --- Mock Data ---
# Matches the data structure used in bus_list_multi.html
MOCK_BUS_LISTS = [
    {
        "id": 1,
        "operator": "Greyhound",
        "type": "Volvo AC Seater (2+2)",
        "rating": 4.2,
        "depTime": "08:00 AM",
        "depLoc": "South Station",
        "arrTime": "12:30 PM",
        "arrLoc": "Port Authority",
        "duration": "4h 30m",
        "price": "$35",
        "seatsLeft": 12,
        "amenities": ["Free WiFi", "Charging Point", "Water Bottle", "Toilet"],
    },
    {
        "id": 2,
        "operator": "Peter Pan",
        "type": "Scania Multi-Axle",
        "rating": 4.5,
        "depTime": "10:15 AM",
        "depLoc": "South Station",
        "arrTime": "02:45 PM",
        "arrLoc": "Port Authority",
        "duration": "4h 30m",
        "price": "$42",
        "seatsLeft": 8,
        "amenities": ["Free WiFi", "Leg Room", "AC"],
    },
    {
        "id": 3,
        "operator": "FlixBus",
        "type": "Mercedes Benz Sleeper",
        "rating": 3.9,
        "depTime": "01:00 PM",
        "depLoc": "Alewife Station",
        "arrTime": "05:40 PM",
        "arrLoc": "31st St",
        "duration": "4h 40m",
        "price": "$29",
        "seatsLeft": 20,
        "amenities": ["Power Outlet", "Eco Friendly"],
    },
]


# --- Endpoint ---
@router.post("/trip/bus/lists")
async def get_bus_lists(request: BusListRequest):
    """
    Receives an eventId and returns the list of available bus options.
    """
    print(f"Fetching bus list for event: {request.eventId} - {request.title}")
    return MOCK_BUS_LISTS
