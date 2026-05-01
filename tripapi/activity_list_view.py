from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# Request model matching the payload sent from the React frontend
class ActivityRequest(BaseModel):
    eventId: str | int = None
    title: str = None

# Mock data matching the content of activities_free_list.html
MOCK_ACTIVITIES = [
    {
        "id": 1,
        "title": "Crystal Cascade Falls",
        "type": "Water",
        "badge": "Waterfall",
        "image": "https://via.placeholder.com/400x250/2b6cb0/ffffff?text=Waterfall",
        "desc": "A hidden gem located 30 mins from the city. Perfect for a refreshing dip.",
        "facilities": ["🚻 Public Toilet", "🅿️ Free Parking"],
        "transport": "Bus #402 (Stop: Green Valley)",
        "reach": "Follow the marked trail for 15 mins from the bus stop. The path is well-paved.",
        "safety": "Rocks are slippery. No lifeguard on duty.",
        "amenities": "Small snack shack at the entrance.",
        "mapLink": "https://maps.google.com/?q=Crystal+Cascade+Falls"
    },
    {
        "id": 2,
        "title": "Sunset Peak Lookout",
        "type": "Landmark",
        "badge": "Viewpoint",
        "image": "https://via.placeholder.com/400x250/ed8936/ffffff?text=Viewpoint",
        "desc": "The highest point in the district offering 360-degree panoramic city views.",
        "facilities": ["🔭 Free Telescope", "🪑 Seating Area"],
        "transport": "Metro Line A (Station: Hilltop)",
        "reach": "Walk 10 mins uphill from Hilltop Station. Wheelchair accessible ramp available.",
        "safety": "High winds possible. Railings are secure.",
        "amenities": "Cafe and souvenir shop nearby.",
        "mapLink": "https://maps.google.com/?q=Sunset+Peak+Lookout"
    },
    {
        "id": 3,
        "title": "Golden Sands Beach",
        "type": "Water",
        "badge": "Beach",
        "image": "https://via.placeholder.com/400x250/ecc94b/ffffff?text=Beach",
        "desc": "A wide stretch of sandy beach ideal for picnics, volleyball, and swimming.",
        "facilities": ["🚿 Outdoor Showers", "🚻 Changing Rooms"],
        "transport": "Bus #101 or #105",
        "reach": "Direct access from the Coastal Road bus stop.",
        "safety": "⚠️ Swim only in flagged areas. Strong currents.",
        "amenities": "BBQ pits available (First come first serve).",
        "mapLink": "https://maps.google.com/?q=Golden+Sands+Beach"
    },
    {
        "id": 4,
        "title": "Ancient Fort Ruins",
        "type": "Landmark",
        "badge": "Monument",
        "image": "", 
        "desc": "Historical ruins from the 18th century. Great for photography and history buffs.",
        "facilities": ["ℹ️ Info Plaques", "🗑️ Dustbins"],
        "transport": "Train (Station: Old Town)",
        "reach": "5 min walk from Old Town station. Look for the brown heritage signs.",
        "safety": "Uneven ground. Do not climb on walls.",
        "amenities": "Water fountain near the main gate.",
        "mapLink": "https://maps.google.com/?q=Ancient+Fort+Ruins"
    },
    {
        "id": 5,
        "title": "Whispering Woods Trail",
        "type": "Nature",
        "badge": "Nature Walk",
        "image": "https://via.placeholder.com/400x250/48bb78/ffffff?text=Forest+Path",
        "desc": "A gentle 5km loop through dense pine forests. Quiet and serene.",
        "facilities": ["🗺️ Map Boards", "🪑 Benches"],
        "transport": "Car/Taxi recommended",
        "reach": "Park at the North Gate. Trailhead starts behind the ranger station.",
        "safety": "Stay on path. Wildlife may be present.",
        "amenities": "None inside. Bring your own water.",
        "mapLink": "https://maps.google.com/?q=Whispering+Woods+Trail"
    }
]

@router.post("/trip/activity/lists")
async def get_activity_list(request: ActivityRequest):
    """
    Returns a mock JSON list of free activities based on the requested event.
    """
    # You can use request.eventId or request.title here to filter data dynamically in the future.
    return MOCK_ACTIVITIES