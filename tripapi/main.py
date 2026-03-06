# main.py
# Import the router from our new file
import itinerary_view
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Travel Itinerary API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Include the External Router ---
app.include_router(itinerary_view.router)


# --- Request Model for Search ---
class SearchRequest(BaseModel):
    query: str


# --- Mock Data (Matching list_itinerary.html) ---
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


# --- Endpoint ---
@app.post("/trip/search")
async def search_trips(request: SearchRequest):
    """
    Returns the high-level list of itineraries.
    """
    return MOCK_TRIPS
