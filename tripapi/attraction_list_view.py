from typing import Any, Dict, List, Optional

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class AttractionListRequest(BaseModel):
    eventId: Optional[Any] = None
    title: Optional[str] = None


# --- Mock Data matching attractions_list.html ---
MOCK_ATTRACTIONS: List[Dict[str, Any]] = [
    {
        "id": 1,
        "title": "City Royal Museum",
        "type": "Culture",
        "badge": "Museum",
        "price": "$15.00",
        "image": "https://via.placeholder.com/400x250/718096/ffffff?text=Museum",
        "desc": "Explore ancient artifacts and modern art in the heart of the city.",
        "duration": "2-3 Hours",
        "rating": "★ 4.8",
        "address": "12 Museum Mile, Arts District, City Center",
        "hours": "Mon-Sun: 9:00 AM - 5:00 PM",
        "phone": "+1 555-0199",
        "website": "https://example.com/museum",
        "mapLink": "http://googleusercontent.com/maps.google.com/museum",
        "numericPrice": 15.00,
    },
    {
        "id": 2,
        "title": "Skyline Zipline Adventure",
        "type": "Adventure",
        "badge": "Thrill",
        "price": "$45.00",
        "image": "https://via.placeholder.com/400x250/e53e3e/ffffff?text=Zipline",
        "desc": "An adrenaline-pumping ride across the river canyon. Gear included.",
        "duration": "1 Hour",
        "rating": "★ 4.9",
        "address": "Base Camp 4, Mountain Road, Outskirts",
        "hours": "Tue-Sun: 10:00 AM - 6:00 PM",
        "phone": "+1 555-0122",
        "website": "https://example.com/zip",
        "mapLink": "http://googleusercontent.com/maps.google.com/zip",
        "numericPrice": 45.00,
    },
    {
        "id": 3,
        "title": "Central Botanical Gardens",
        "type": "Relaxation",
        "badge": "Garden",
        "price": "Free",
        "image": "https://via.placeholder.com/400x250/48bb78/ffffff?text=Gardens",
        "desc": "A peaceful escape featuring exotic plants, a koi pond, and walking paths.",
        "duration": "1-2 Hours",
        "rating": "★ 4.7",
        "address": "88 Green Way, Parkside District",
        "hours": "Daily: 6:00 AM - 8:00 PM",
        "phone": "",
        "website": "https://example.com/gardens",
        "mapLink": "http://googleusercontent.com/maps.google.com/gardens",
        "numericPrice": 0.00,
    },
    {
        "id": 4,
        "title": "Harbor Boat Tour",
        "type": "Relaxation",
        "badge": "Tour",
        "price": "$25.00",
        "image": "https://via.placeholder.com/400x250/2b6cb0/ffffff?text=Boat+Tour",
        "desc": "A relaxing 60-minute cruise seeing the famous landmarks from the water.",
        "duration": "1 Hour",
        "rating": "★ 4.5",
        "address": "Pier 4, Harbor Front Walk",
        "hours": "Departs every hour, 10 AM - 4 PM",
        "phone": "+1 555-0888",
        "website": "",
        "mapLink": "http://googleusercontent.com/maps.google.com/boat",
        "numericPrice": 25.00,
    },
    {
        "id": 5,
        "title": "Historic Opera House",
        "type": "Culture",
        "badge": "Sightseeing",
        "price": "$10.00",
        "image": "https://via.placeholder.com/400x250/d69e2e/ffffff?text=Opera+House",
        "desc": "Guided tours of the 19th-century architecture and backstage areas.",
        "duration": "45 Mins",
        "rating": "★ 4.6",
        "address": "1 Grand Avenue, Old Town",
        "hours": "Mon-Fri: 11:00 AM - 3:00 PM",
        "phone": "+1 555-0333",
        "website": "https://example.com/opera",
        "mapLink": "http://googleusercontent.com/maps.google.com/opera",
        "numericPrice": 10.00,
    },
]


@router.post("/trip/attractions/list")
async def get_attractions_list(request: AttractionListRequest):
    """Returns the list of mock attractions matching the HTML view."""
    return MOCK_ATTRACTIONS
