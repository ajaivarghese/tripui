# train_list_view.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


# --- Request Model ---
class TrainListRequest(BaseModel):
    eventId: str | None = None
    title: str | None = None


# --- Mock Data ---
# This exactly matches the data structure in your train_list_multi.html
MOCK_TRAIN_LISTS = [
    {
        "id": 1,
        "name": "Amtrak Northeast Connection",
        "number": "174 / 2150",
        "type": "Multi-Segment",
        "depTime": "09:15",
        "depStn": "WAS",
        "arrTime": "18:30",
        "arrStn": "BOS",
        "duration": "9h 15m | 1 Transfer",
        "segments": [
            {
                "depTime": "09:15",
                "depLoc": "Washington Union (WAS)",
                "arrTime": "12:45",
                "arrLoc": "New York Penn (NYP)",
                "meta": "Northeast Regional #174",
            },
            {
                "depTime": "15:00",
                "depLoc": "Moynihan Train Hall (NYP)",
                "arrTime": "18:30",
                "arrLoc": "Boston South (BOS)",
                "meta": "Acela Express #2150",
            },
        ],
        "layover": "⏳ 2h 15m Layover in New York • Transfer to Moynihan Hall (5 min walk)",
        "classes": [
            {
                "type": "Coach",
                "name": "Coach",
                "price": "$145",
                "status": "AVL 45",
                "color": "status-avl",
            },
            {
                "type": "Business",
                "name": "Business",
                "price": "$280",
                "status": "AVL 12",
                "color": "status-avl",
            },
            {
                "type": "First",
                "name": "First Class",
                "price": "$410",
                "status": "WL 2",
                "color": "status-wl",
            },
        ],
    },
    {
        "id": 2,
        "name": "Direct Acela Express",
        "number": "2104",
        "type": "High-Speed",
        "depTime": "11:00",
        "depStn": "WAS",
        "arrTime": "17:45",
        "arrStn": "BOS",
        "duration": "6h 45m | Direct",
        "segments": [
            {
                "depTime": "11:00",
                "depLoc": "Washington Union (WAS)",
                "arrTime": "17:45",
                "arrLoc": "Boston South (BOS)",
                "meta": "Acela Express #2104",
            }
        ],
        "layover": None,
        "classes": [
            {
                "type": "Business",
                "name": "Business",
                "price": "$320",
                "status": "AVL 14",
                "color": "status-avl",
            },
            {
                "type": "First",
                "name": "First Class",
                "price": "$510",
                "status": "WL 5",
                "color": "status-wl",
            },
        ],
    },
    {
        "id": 3,
        "name": "Keystone & Regional Combo",
        "number": "640 / 176",
        "type": "Multi-Segment",
        "depTime": "08:00",
        "depStn": "WAS",
        "arrTime": "19:15",
        "arrStn": "BOS",
        "duration": "11h 15m | 1 Transfer",
        "segments": [
            {
                "depTime": "08:00",
                "depLoc": "Washington Union (WAS)",
                "arrTime": "10:30",
                "arrLoc": "Philadelphia 30th St (PHL)",
                "meta": "Keystone Service #640",
            },
            {
                "depTime": "13:00",
                "depLoc": "Philadelphia 30th St (PHL)",
                "arrTime": "19:15",
                "arrLoc": "Boston South (BOS)",
                "meta": "Northeast Regional #176",
            },
        ],
        "layover": "⏳ 2h 30m Layover in Philadelphia • Stay at 30th Street Station",
        "classes": [
            {
                "type": "Coach",
                "name": "Coach",
                "price": "$95",
                "status": "AVL 120",
                "color": "status-avl",
            },
            {
                "type": "Business",
                "name": "Business",
                "price": "$180",
                "status": "AVL 30",
                "color": "status-avl",
            },
        ],
    },
]


# --- Endpoint ---
@router.post("/trip/train/lists")
async def get_train_lists(request: TrainListRequest):
    """
    Receives an eventId and returns the list of available multi-segment train options.
    """
    print(f"Fetching train list for event: {request.eventId} - {request.title}")
    return MOCK_TRAIN_LISTS
