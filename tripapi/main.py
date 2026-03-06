from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Travel Itinerary API")

# Enable CORS so the React frontend can make requests to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend's actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Requests ---


class SearchRequest(BaseModel):
    query: str


class ItineraryViewRequest(BaseModel):
    trip_id: str


# --- Mock Data ---

# Data matching list_itinerary.html (Source 2)
MOCK_TRIPS = [
    {
        "id": "trip_001",
        "title": "The London & Countryside Escape",
        "origin": "JFK",
        "destination": "LHR",
        "stops": "2 Stops",
        "duration": "3 Days",
        "hotelType": "5★ Hotel",
        "flightClass": "Business Class",
        "price": 2450,
    },
    {
        "id": "trip_002",
        "title": "Parisian Weekend Getaway",
        "origin": "JFK",
        "destination": "CDG",
        "stops": "Non-stop",
        "duration": "2 Days",
        "hotelType": "Boutique Stay",
        "flightClass": "Economy",
        "price": 1100,
    },
    {
        "id": "trip_003",
        "title": "Tokyo Cultural Immersion",
        "origin": "JFK",
        "destination": "HND",
        "stops": "1 Stop",
        "duration": "5 Days",
        "hotelType": "Ryokan",
        "flightClass": "Premium Econ",
        "price": 3200,
    },
]

# Data matching collapsible_itinerary.html (Source 3)
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
                    "time": "09:30 PM",
                    "icon": "✈️",
                    "title": "Flight Home",
                    "tagClass": "tag-flight",
                    "tagLabel": "Flight",
                    "details": "<strong>Origin:</strong> LHR - London Heathrow<br><strong>Destination:</strong> JFK - New York",
                },
            ],
        },
    ]
}

# --- Endpoints ---


@app.get("/", tags=["Health"])
async def root():
    return {"message": "API is running"}


@app.post("/trip/search")
async def search_trips(request: SearchRequest):
    """
    Returns the high-level list of itineraries.
    In a real app, you would filter MOCK_TRIPS based on request.query.
    """
    # Simply returning all trips for now regardless of the search query
    return MOCK_TRIPS


@app.post("/trip/itinerary/view")
async def view_itinerary(request: ItineraryViewRequest):
    """
    Returns the detailed, day-by-day timeline for a specific trip ID.
    """
    trip_data = MOCK_ITINERARY_DETAILS.get(request.trip_id)

    if not trip_data:
        return {"error": "Itinerary not found", "days": []}

    return {"tripId": request.trip_id, "days": trip_data}
