from typing import Any, Dict, List, Optional

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class AttractionBookRequest(BaseModel):
    item_id: Optional[int] = None
    title: Optional[str] = None


# --- Mock Data matching attractions_book.html[cite: 4] ---
MOCK_CART_ITEMS: List[Dict[str, Any]] = [
    {
        "id": 2,
        "title": "Skyline Zipline Adventure",
        "type": "Adventure",
        "basePrice": 45.00,
    },
    {
        "id": 1,
        "title": "City Royal Museum",
        "type": "Culture",
        "basePrice": 15.00,
    },
]


@router.post("/trip/attractions/book")
async def process_attraction_booking(request: AttractionBookRequest):
    """
    Returns the default mock cart dataset required for the attraction booking checkout screen.
    """
    # Returns the payload structure corresponding to the template's cart items
    return {
        "status": "success",
        "requested_item": {"id": request.item_id, "title": request.title}
        if request.item_id
        else None,
        "cartItems": MOCK_CART_ITEMS,
    }
