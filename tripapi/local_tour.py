from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel

# Initialize the router
router = APIRouter()


# Define the expected incoming JSON payload
class TourRequest(BaseModel):
    tourId: Optional[int] = None


@router.get("/trip/local_tour/lists")
async def get_local_tours(request: TourRequest):
    # Mock JSON data representing the contents of local_tours_list.html
    mock_data = {
        "status": "success",
        "requested_tour_id": request.tourId,
        "tours": [
            {
                "id": 1,
                "title": "Old Bethpage Village Restoration Tour",
                "type": "History",
                "badge": "Living History",
                "price": "$15.00",
                "image": "https://images.unsplash.com/photo-1558285549-2a06fddb3b14?auto=format&fit=crop&w=400&q=80",
                "desc": "Step back in time to the 19th century. Guided tours of historic homes, farms, and craft demonstrations.",
                "duration": "⏱️ 2.5 Hours",
                "groupSize": "👥 Up to 15 people",
                "meetingPoint": "Main Visitor Center Entrance",
                "includes": "Admission ticket, Live guide, Craft demo.",
                "safety": "Wear comfortable walking shoes. Mostly dirt paths.",
                "operator": "Heritage Society Walks",
            },
            {
                "id": 2,
                "title": "Gold Coast Mansions & Gardens",
                "type": "History",
                "badge": "Architecture",
                "price": "$35.00",
                "image": "https://images.unsplash.com/photo-1577041285317-062e76f571b0?auto=format&fit=crop&w=400&q=80",
                "desc": "Explore the opulent 'Gatsby-era' estates. Includes interior tours of an historic mansion and its formal gardens.",
                "duration": "⏱️ 3 Hours",
                "groupSize": "👥 Up to 20 people",
                "meetingPoint": "Estate Front Gates",
                "includes": "Mansion entry, Garden access, Historical booklet.",
                "safety": "Photography restricted in certain interior rooms.",
                "operator": "Gold Coast Tours Inc.",
            },
            {
                "id": 3,
                "title": "North Fork Wine Tasting Excursion",
                "type": "Food",
                "badge": "Winery",
                "price": "$125.00",
                "image": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=400&q=80",
                "desc": "A premium day trip visiting three top-rated local vineyards with guided tastings and a gourmet lunch.",
                "duration": "⏱️ 6 Hours",
                "groupSize": "👥 Up to 12 people",
                "meetingPoint": "Central Park & Ride Lot",
                "includes": "Round-trip transport, 3 tastings, Lunch.",
                "safety": "Must be 21+ with valid ID.",
                "operator": "Vineyard Express",
            },
            {
                "id": 4,
                "title": "Planting Fields Arboretum Walk",
                "type": "Nature",
                "badge": "Botanical",
                "price": "$12.00",
                "image": "https://images.unsplash.com/photo-1588628566587-f823f668e1ab?auto=format&fit=crop&w=400&q=80",
                "desc": "A guided walk through lush greenhouses, formal gardens, and historic tree collections with a master botanist.",
                "duration": "⏱️ 1.5 Hours",
                "groupSize": "👥 Up to 25 people",
                "meetingPoint": "Main Greenhouse Entrance",
                "includes": "Park entry fee, Expert botanical guide.",
                "safety": "Wheelchair accessible. Service animals only.",
                "operator": "Arboretum Society",
            },
            {
                "id": 5,
                "title": "Bethpage State Park Trail Hike",
                "type": "Nature",
                "badge": "Active",
                "price": "$10.00",
                "image": "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=400&q=80",
                "desc": "Explore the scenic, wooded trails bordering the famous golf courses. Great for bird watching and active hikers.",
                "duration": "⏱️ 2 Hours",
                "groupSize": "👥 Up to 10 people",
                "meetingPoint": "Picnic Area Pavilion 1",
                "includes": "Trail map, Guided hike, Water bottle.",
                "safety": "Moderate inclines. Watch for mountain bikers on cross-trails.",
                "operator": "Local Hikers Coalition",
            },
        ],
    }

    return mock_data
