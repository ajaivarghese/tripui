# tripui
Trip User Interface

### UI

npm start

### Fast API 

/bookings

{
  "origin": "JFK",
  "destination": "LHR",
  "date": "2025-12-25",
  "passenger": {
    "first_name": "Ajai",
    "last_name": "Varghese",
    "email": "Ajai@example.com"
  },
  "seat_class": "business"
}

uvicorn main:app --reload 
