# local_tour_view.py
from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["Local Tour View"])


# --- Request Model ---
class LocalTourViewRequest(BaseModel):
    # tour_id: Optional[str] = None
    # title: Optional[str] = None
    eventId: Optional[str] = None
    title: Optional[str] = None


# --- Mock Data corresponding to local_tours_view.html[cite: 4] ---
MOCK_TOUR_VIEW_DATA = {
    "id": "tour_001",
    "title": "Historical Downtown Walk",
    "subtitle": "Step back in time and explore the city's oldest architectural wonders.",
    "price": "$25.00",
    "image": "https://via.placeholder.com/900x350/cbd5e0/ffffff?text=Historical+Downtown",
    "duration": "3 Hours",
    "rating": "4.8 / 5 (124 Reviews)",
    "activityLevel": "Moderate Walking",
    "guideLang": "Live Guide (English)",
    "about": "Discover the hidden gems and rich history of the downtown district. This immersive 3-hour walking tour takes you past 19th-century cathedrals, historic cobblestone streets, and the famous Old Post Office. Perfect for history buffs and architecture enthusiasts, our knowledgeable guides will share captivating stories that bring the city's past to life.",
    "reviews": [
        {
            "text": "Absolutely fantastic! The guide was incredibly knowledgeable and the pace was perfect.",
            "author": "Sarah J.",
        },
        {
            "text": "A great way to see the city. Highly recommend wearing comfortable shoes!",
            "author": "Mark T.",
        },
    ],
    "inclusions": [
        "Professional local guide",
        "Bottled water",
        "Entrance fee to the Old Post Office museum",
    ],
    "exclusions": [
        "Gratuities (optional)",
        "Hotel pickup and drop-off",
        "Food and snacks",
    ],
    "expectations": "Expect approximately 2.5 miles of walking at a leisurely pace. The route includes some uneven cobblestone streets and minor inclines. Please dress appropriately for the weather.",
    "accessibility": "This tour is mostly wheelchair accessible, though some historic buildings may have limited access or lack elevators. Service animals are permitted.",
    "additionalInfo": "Confirmation will be received at the time of booking. Children must be accompanied by an adult. Maximum of 15 travelers per tour.",
    "cancellation": "For a full refund, cancel at least 24 hours in advance of the start date of the experience. Cancellations made less than 24 hours before the start time will not be refunded.",
    "faqs": [
        {
            "q": "Where do we meet?",
            "a": "The meeting point is directly in front of City Hall.",
        },
        {
            "q": "Are restrooms available?",
            "a": "Yes, at the halfway mark (Heritage Park).",
        },
    ],
    "itineraryStops": [
        {
            "marker": "📍",
            "title": "Start: City Hall Square",
            "time": "Start Time: 10:00 AM",
            "desc": "Meet your guide by the central fountain. Brief introduction and safety overview.",
        },
        {
            "marker": "1",
            "title": "The Old Post Office",
            "time": "Duration: 45 minutes",
            "desc": "Explore the 1850s architecture and learn about the city's early communication network. Entrance fee included.",
            "link": "#",
        },
        {
            "marker": "2",
            "title": "Heritage Park & Catacombs",
            "time": "Duration: 60 minutes",
            "desc": "Walk through the oldest public park in the city and descend into the newly opened catacombs. Restrooms available here.",
            "link": "#",
        },
        {
            "marker": "🏁",
            "title": "End: Main Street Market",
            "time": "End Time: ~1:00 PM",
            "desc": "The tour concludes at the bustling market, a perfect spot to grab lunch.",
        },
    ],
    "operator": {
        "name": "City Walks Co.",
        "desc": "Operating premium walking tours since 2012. Our mission is to connect travelers with the authentic history and culture of our city through expert local guides.",
        "address": "100 Main St, Suite 4B",
        "phone": "+1 (555) 019-8832",
        "website": "citywalksco.example.com",
        "rating": "4.9 Average Operator Rating",
        "otherTours": [
            {"title": "Spooky Ghost Walk", "details": "2 Hours • Evening"},
            {"title": "Culinary Food Tasting", "details": "3.5 Hours • Afternoon"},
        ],
    },
}


# --- Endpoint ---
@router.post("/trip/local_tour/view")
async def get_local_tour_view(request: Optional[LocalTourViewRequest] = None):
    """
    Returns the JSON representation of the requested local tour's details[cite: 4].
    """
    return MOCK_TOUR_VIEW_DATA
