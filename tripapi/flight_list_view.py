# flight_list_view.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class FlightListRequest(BaseModel):
    # Add fields here as needed (e.g., origin, destination, date)
    # Using 'action' based on your React fetch call
    action: str | None = None

# Mock data matching the exact structure of list_multi_flights.html
MOCK_FLIGHT_LISTS = [
    {
        "id": "f1",
        "airline": "Etihad Airways (EY)",
        "timeRange": "21:55 - 02:35",
        "nextDay": "(+2d)",
        "durationStops": "18h 10m | 1 Stop (AUH)",
        "price": "$416.50",
        "layover": "1h 25m Layover in Abu Dhabi",
        "segments": [
            {
                "depTime": "21:55 JFK",
                "depCode": "New York T4",
                "meta": "Boeing 787-9 | 12h 40m",
                "arrTime": "19:35 AUH",
                "arrCode": "Abu Dhabi TA",
                "isLast": False
            },
            {
                "depTime": "21:00 AUH",
                "depCode": "Abu Dhabi TA",
                "meta": "Boeing 737 Max 8 | Operated by Akasa Air",
                "arrTime": "02:35 COK",
                "arrCode": "Kochi T3",
                "isLast": True
            }
        ]
    },
    {
        "id": "f2",
        "airline": "Kuwait Airways (KU)",
        "timeRange": "16:55 - 00:35",
        "nextDay": "(+2d)",
        "durationStops": "21h 10m | 1 Stop (KWI)",
        "price": "$424.00",
        "layover": "3h 55m Layover in Kuwait",
        "segments": [
            {
                "depTime": "16:55 JFK",
                "depCode": "New York T7",
                "meta": "Boeing 777-300ER | 12h 10m",
                "arrTime": "13:05 KWI",
                "arrCode": "Kuwait T4",
                "isLast": False
            },
            {
                "depTime": "17:00 KWI",
                "depCode": "Kuwait T4",
                "meta": "Airbus A320neo | 5h 05m",
                "arrTime": "00:35 COK",
                "arrCode": "Kochi T3",
                "isLast": True
            }
        ]
    },
    {
        "id": "f3",
        "airline": "Air India (AI)",
        "timeRange": "12:35 - 19:15",
        "nextDay": "(+1d)",
        "durationStops": "20h 10m | 1 Stop (BOM)",
        "price": "$468.20",
        "layover": "3h 45m Layover in Mumbai",
        "segments": [
            {
                "depTime": "12:35 JFK",
                "depCode": "New York T4",
                "meta": "Boeing 777-300ER | 14h 30m",
                "arrTime": "13:35 BOM",
                "arrCode": "Mumbai T2",
                "isLast": False
            },
            {
                "depTime": "17:20 BOM",
                "depCode": "Mumbai T2",
                "meta": "Airbus A321 | 1h 55m",
                "arrTime": "19:15 COK",
                "arrCode": "Kochi T1",
                "isLast": True
            }
        ]
    }
]

@router.post("/trip/flights/lists")
async def get_flight_lists(request: FlightListRequest):
    """
    Returns the complex, multi-segment flight results.
    """
    return MOCK_FLIGHT_LISTS