# itinerary_view.py
from fastapi import APIRouter
from pydantic import BaseModel

# Create a router object
router = APIRouter()


# --- Request Model ---
class ItineraryViewRequest(BaseModel):
    trip_id: str


# --- Mock Data (Matching itinerary_list_time.html) ---
MOCK_ITINERARY_DETAILS = {
    "trip_001": [
        {
            "dayId": "day1",
            "dayTitle": "Day 1: Arrival & Exploration",
            "events": [
                {
                    "time": "08:00 AM",
                    "icon": "✈️",
                    "title": "Flight Departure",
                    "tagClass": "tag-flight",
                    "tagLabel": "Flight",
                    "details": "<strong>Origin:</strong> JFK - New York<br><strong>Destination:</strong> LHR - London Heathrow",
                },
                {
                    "time": "04:00 PM",
                    "icon": "🚖",
                    "title": "Transfer to Hotel",
                    "tagClass": "tag-taxi",
                    "tagLabel": "Taxi",
                    "details": "Pickup from Terminal 5 to City Center Hotel.",
                },
                {
                    "time": "05:30 PM",
                    "icon": "📸",
                    "title": "City Tour (3 Stops)",
                    "tagClass": "tag-tours",
                    "tagLabel": "Tours",
                    "details": "<ul class='activity-list'><li>Walk through the Royal Botanical Gardens</li><li>Photo op at the Palace Gates</li><li>Evening tea at the Historic Square</li></ul>",
                },
                {
                    "time": "08:00 PM",
                    "icon": "🏨",
                    "title": "Check-in & Rest",
                    "tagClass": "tag-stay",
                    "tagLabel": "Stay",
                    "details": "Back to <em>The Grand Plaza Hotel</em> for the night.",
                },
            ],
        },
        {
            "dayId": "day2",
            "dayTitle": "Day 2: Countryside & Return",
            "events": [
                {
                    "time": "09:00 AM",
                    "icon": "🚖",
                    "title": "Taxi to Countryside",
                    "tagClass": "tag-taxi",
                    "tagLabel": "Taxi",
                    "details": "Drive to the Wine Region (approx. 2 hours).",
                },
                {
                    "time": "12:00 PM",
                    "icon": "🍇",
                    "title": "Local Experience",
                    "tagClass": "tag-activity",
                    "tagLabel": "Activity",
                    "details": "<ul class='activity-list'><li>Vineyard tour and tasting</li><li>Lunch at a rustic farmhouse</li><li>Visit the ancient village church</li></ul>",
                },
                {
                    "time": "02:30 PM",
                    "icon": "🧗",
                    "title": "Canyon Ziplining",
                    "tagClass": "tag-adventure",
                    "tagLabel": "Adventure",
                    "details": "Guided zipline tour across the valley gorge.",
                },
                {
                    "time": "04:00 PM",
                    "icon": "🏡",
                    "title": "Relax at Resort",
                    "tagClass": "tag-stay",
                    "tagLabel": "Stay",
                    "details": "Check-in at <em>Valley View Lodge</em> for a short rest/spa.",
                },
                {
                    "time": "06:30 PM",
                    "icon": "🚖",
                    "title": "Taxi to Airport",
                    "tagClass": "tag-taxi",
                    "tagLabel": "Taxi",
                    "details": "Return transfer from Valley View Lodge to LHR.",
                },
                {
                    "time": "06:45 PM",
                    "icon": "🚌",
                    "title": "Vehicle Rental",
                    "tagClass": "tag-rental",
                    "tagLabel": "Rental",
                    "details": "<strong>Origin:</strong> Paris<br><strong>Destination:</strong> Amsterdam",
                },
                {
                    "time": "07:00 PM",
                    "icon": "🚌",
                    "title": "Transport Home",
                    "tagClass": "tag-transport",
                    "tagLabel": "Transport",
                    "details": "<strong>Origin:</strong> Amsterdam<br><strong>Destination:</strong> Paris",
                },
                {
                    "time": "07:30 PM",
                    "icon": "🚌",
                    "title": "Restaurant Home",
                    "tagClass": "tag-restaurant",
                    "tagLabel": "Restaurant",
                    "details": "<strong>City:</strong> Paris<br><strong>Street:</strong> 4th Ave",
                },
                {
                    "time": "08:30 PM",
                    "icon": "🚌",
                    "title": "Bus",
                    "tagClass": "tag-bus",
                    "tagLabel": "Bus",
                    "details": "<strong>Origin:</strong> Paris<br><strong>Destination:</strong> LHR - London Heathrow",
                },
                {
                    "time": "09:30 PM",
                    "icon": "🚆",
                    "title": "Train Home",
                    "tagClass": "tag-train",
                    "tagLabel": "Train",
                    "details": "<strong>Origin:</strong> LHR - London Heathrow<br><strong>Destination:</strong> JFK - New York",
                },
            ],
        },
    ]
}


# --- Endpoint ---
@router.post("/trip/itinerary/view")
async def view_itinerary(request: ItineraryViewRequest):
    """
    Returns the detailed, day-by-day timeline for a specific trip ID.
    """
    trip_data = MOCK_ITINERARY_DETAILS.get(request.trip_id)

    if not trip_data:
        # Returning empty list if not found, handling it gracefully on the frontend
        return {"error": "Itinerary not found", "days": []}

    return {"tripId": request.trip_id, "days": trip_data}
