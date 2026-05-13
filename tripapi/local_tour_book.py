# local_tour_book.py
from typing import Any, Dict, Optional

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["Local Tour Book"])


# --- Request Models ---
class LocalTourBookRequest(BaseModel):
    tour: Optional[Dict[str, Any]] = None


# --- Mock Data corresponding to local_tours_book.html[cite: 5] ---
MOCK_BOOKING_DATA = {
    "pageTitle": "Complete Your Booking",
    "subtitle": "Review your itinerary and enter your details to finalize.",
    "defaultTickets": 2,
    "taxRate": 0.10,
    "successMessage": "🎉 Booking Confirmed! Your itinerary and tickets have been emailed to you.",
    "cartItems": [
        {
            "id": 2,
            "title": "Skyline Zipline Adventure",
            "type": "Adventure",
            "basePrice": 45.00,
        },
        {"id": 1, "title": "City Royal Museum", "type": "Culture", "basePrice": 15.00},
    ],
}


# --- Endpoint ---
@router.post("/trip/local_tour/book")
async def get_local_tour_book(request: Optional[LocalTourBookRequest] = None):
    """
    Returns the JSON checkout configuration and cart items for finalizing a local tour booking[cite: 5].
    """
    return MOCK_BOOKING_DATA
