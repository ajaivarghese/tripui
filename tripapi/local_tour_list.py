# local_tour_list.py
from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["Local Tours List"])


# --- Request Model ---
class LocalTourRequest(BaseModel):
    eventId: Optional[str] = None
    title: Optional[str] = None


# --- Mock Data corresponding to local_tours_list.html ---
MOCK_LOCAL_TOURS = [
    {
        "id": 1,
        "title": "Downtown Historic Walking Tour",
        "type": "Walking",
        "badge": "Bestseller",
        "price": "$25",
        "image": "https://via.placeholder.com/400x250/2b6cb0/ffffff?text=Walking+Tour",
        "desc": "Explore the rich history and architecture of the downtown district with an expert local guide.",
        "duration": "2 Hours",
        "meetingPoint": "City Hall Plaza",
        "inclusions": "Guided tour, Bottled water, Commemorative map",
        "safety": "Wear comfortable walking shoes.",
        "mapLink": "https://maps.google.com/?q=City+Hall+Plaza",
    },
    {
        "id": 2,
        "title": "Sunset Harbor Cruise",
        "type": "Boat",
        "badge": "Scenic",
        "price": "$45",
        "image": "https://via.placeholder.com/400x250/ed8936/ffffff?text=Harbor+Cruise",
        "desc": "Relax on a stunning evening cruise along the harbor with live music and breathtaking skyline views.",
        "duration": "1.5 Hours",
        "meetingPoint": "Pier 4",
        "inclusions": "Boat entry, Live entertainment, 1 Complimentary drink",
        "safety": "Arrive 15 minutes early for boarding.",
        "mapLink": "https://maps.google.com/?q=Pier+4",
    },
    {
        "id": 3,
        "title": "Culinary Tasting Adventure",
        "type": "Food",
        "badge": "Foodie",
        "price": "$65",
        "image": "https://via.placeholder.com/400x250/ecc94b/ffffff?text=Food+Tour",
        "desc": "Taste your way through the city's most iconic eateries, hidden cafes, and local markets.",
        "duration": "3 Hours",
        "meetingPoint": "Central Market Main Entrance",
        "inclusions": "5 Food tastings, Local guide, Recipe booklet",
        "safety": "Please inform us of any food allergies in advance.",
        "mapLink": "https://maps.google.com/?q=Central+Market",
    },
]


# --- Endpoints ---
@router.post("/trip/local_tour/list")
@router.post("/trip/local_tour/lists")
async def get_local_tour_list(request: Optional[LocalTourRequest] = None):
    """
    Returns the JSON list of available local tours matching the timeline request.
    """
    requested_title = request.title if request and request.title else ""

    return {"status": "success", "title": requested_title, "tours": MOCK_LOCAL_TOURS}
