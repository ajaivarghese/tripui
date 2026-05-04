from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Union

# Initialize the router
router = APIRouter()

# Define the expected request payload from the frontend
class AccommodationRequest(BaseModel):
    eventId: Union[str, int, None] = None
    title: Optional[str] = None

@router.post("/trip/accommodation/lists")
async def get_accommodation_lists(request: AccommodationRequest):
    """
    Returns mock JSON data containing stay options based on the 
    structure of the original accommodation_list.html.
    """
    mock_stays = [
        {
            "id": 1,
            "name": "The Grand Horizon",
            "type": "Hotel",
            "rating": 4.9,
            "image": "https://via.placeholder.com/150/2d3748/ffffff?text=Grand+Hotel",
            "location": "Downtown District",
            "review": "Impeccable service and stunning city views. The rooftop pool is a highlight.",
            "amenities": ["Pool", "Gym", "Parking", "Bar", "Concierge"],
            "website": "https://example.com",
            "map": "https://www.openstreetmap.org/search?query=Downtown+District+Hotel",
            "rooms": [
                {"id": "r1a", "name": "Deluxe King", "price": "$250", "features": "King Bed, City View, Bathtub"},
                {"id": "r1b", "name": "Twin Suite", "price": "$320", "features": "2 Queen Beds, Living Area, Balcony"}
            ]
        },
        {
            "id": 2,
            "name": "Backpacker's Nest",
            "type": "Hostel",
            "rating": 4.3,
            "image": "https://via.placeholder.com/150/ed8936/ffffff?text=Hostel",
            "location": "Old Town",
            "review": "Great social vibe and very clean facilities. Perfect for meeting fellow travelers.",
            "amenities": ["Lockers", "Shared Kitchen", "Game Room", "Free WiFi", "Laundry"],
            "website": "https://example.com",
            "map": "https://www.openstreetmap.org/search?query=Old+Town+Hostel",
            "rooms": [
                {"id": "r2a", "name": "8-Bed Dorm", "price": "$25", "features": "Bunk Bed, Shared Bath, Reading Light"},
                {"id": "r2b", "name": "Private Double", "price": "$60", "features": "Double Bed, Shared Bath, Desk"}
            ]
        },
        {
            "id": 3,
            "name": "Riverview Cottage",
            "type": "Homestay",
            "rating": 4.7,
            "image": "https://via.placeholder.com/150/48bb78/ffffff?text=Homestay",
            "location": "Riverside Village",
            "review": "A home away from home. The host, Maria, cooks the best local breakfast.",
            "amenities": ["Breakfast Incl.", "Garden", "Pet Friendly", "Fireplace", "Library"],
            "website": "https://example.com",
            "map": "https://www.openstreetmap.org/search?query=Riverside+Village",
            "rooms": [
                {"id": "r3a", "name": "Garden Room", "price": "$85", "features": "Queen Bed, En-suite, Garden Access"},
                {"id": "r3b", "name": "Attic Loft", "price": "$75", "features": "Double Bed, Skylight, Cozy"}
            ]
        },
        {
            "id": 4,
            "name": "Urban Pods",
            "type": "Hostel",
            "rating": 4.5,
            "image": "https://via.placeholder.com/150/63b3ed/ffffff?text=Pod+Hotel",
            "location": "Tech Park",
            "review": "Futuristic and private sleeping pods. Very quiet and modern.",
            "amenities": ["Quiet Zone", "Coffee Bar", "Co-working Space", "Rain Showers", "Free WiFi"],
            "website": "https://example.com",
            "map": "https://www.openstreetmap.org/search?query=Tech+Park",
            "rooms": [
                {"id": "r4a", "name": "Single Pod", "price": "$40", "features": "Privacy Blind, USB Charging, Vent"}
            ]
        }
    ]
    
    return mock_stays