# tripui
Trip User Interface

### UI

npm install # after codespace is deleted
npm start

cd /workspaces/tripui/tripui
cat <<EOF > .env
VITE_API_URL=https://travelapi.myvnc.com
EOF
npm run build
npm start

uvicorn main:app --host 0.0.0.0 --port 8000

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
