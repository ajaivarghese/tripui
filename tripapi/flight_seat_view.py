# flight_seat_view.py
from typing import List

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


# --- Request Models for Nested JSON ---
class ContactInfo(BaseModel):
    email: str
    phone: str


class TravelerInfo(BaseModel):
    id: int | str
    firstName: str
    lastName: str
    dob: str
    gender: str
    passport: str


class SeatBookingRequest(BaseModel):
    flightId: str | None = None
    contact: ContactInfo
    travelers: List[TravelerInfo]
    totalPrice: str | float | None = None


# --- Endpoint ---
@router.post("/trip/flights/seats")
async def submit_passengers_get_seats(request: SeatBookingRequest):
    """
    Receives passenger details (email, phone, names, passports) and returns
    the seat map configuration (e.g., maximum seats the user is allowed to pick).
    """
    # Determine how many seats the user is allowed to pick based on the payload
    num_travelers = len(request.travelers) if request.travelers else 1

    # You can also process/save the passenger data here to a database
    print(
        f"Received booking for {num_travelers} passenger(s). Contact: {request.contact.email}"
    )

    return {
        "message": "success",
        "maxSeats": num_travelers,
        "flightId": request.flightId,
        "bookingReference": "PENDING-SEATS",
        "receivedTravelerCount": num_travelers,
    }
