from fastapi import APIRouter

router = APIRouter()

# Mock data extracted directly from adventure_activity_list.html
MOCK_ADVENTURES = [
    {
        "id": 1,
        "title": "White Water Rafting",
        "location": "Rishikesh, India",
        "category": "Water Sports",
        "image": "https://via.placeholder.com/400x250/3182ce/ffffff?text=Rafting",
        "difficulty": "Moderate",
        "duration": "3 Hours",
        "groupSize": "4-8",
        "ageLimit": "14+",
        "price": "$45",
        "desc": "Navigate through the thrilling rapids of the Ganges river surrounded by stunning mountain views.",
    },
    {
        "id": 2,
        "title": "Mountain Trekking",
        "location": "Swiss Alps",
        "category": "Trekking",
        "image": "https://via.placeholder.com/400x250/2f855a/ffffff?text=Trekking",
        "difficulty": "Hard",
        "duration": "2 Days",
        "groupSize": "5-15",
        "ageLimit": "18+",
        "price": "$150",
        "desc": "A challenging trek reaching high altitudes with overnight camping under the stars.",
    },
    {
        "id": 3,
        "title": "Paragliding",
        "location": "Pokhara, Nepal",
        "category": "Air Sports",
        "image": "https://via.placeholder.com/400x250/ed8936/ffffff?text=Paragliding",
        "difficulty": "Easy",
        "duration": "30 Mins",
        "groupSize": "1",
        "ageLimit": "10+",
        "price": "$85",
        "desc": "Soar above the clouds and enjoy panoramic views of the lake and Himalayas.",
    },
    {
        "id": 4,
        "title": "Scuba Diving",
        "location": "Great Barrier Reef",
        "category": "Water Sports",
        "image": "https://via.placeholder.com/400x250/0bc5ea/ffffff?text=Scuba",
        "difficulty": "Moderate",
        "duration": "1 Hour",
        "groupSize": "2-4",
        "ageLimit": "12+",
        "price": "$120",
        "desc": "Explore vibrant coral reefs and swim alongside exotic marine life in crystal clear waters.",
    },
    {
        "id": 5,
        "title": "Zip Lining",
        "location": "Costa Rica Rainforest",
        "category": "Zip Line",
        "image": "https://via.placeholder.com/400x250/48bb78/ffffff?text=Zip+Line",
        "difficulty": "Easy",
        "duration": "45 Mins",
        "groupSize": "1",
        "ageLimit": "8+",
        "price": "$60",
        "desc": "Fly through the rainforest canopy at high speeds on one of the longest ziplines.",
    },
    {
        "id": 6,
        "title": "Rock Climbing",
        "location": "Yosemite, USA",
        "category": "Climbing",
        "image": "",
        "difficulty": "Hard",
        "duration": "4 Hours",
        "groupSize": "2",
        "ageLimit": "16+",
        "price": "$95",
        "desc": "Test your strength and endurance scaling vertical granite walls with expert guides.",
    },
]


@router.post("/trip/adventure/lists")
async def get_adventure_lists():
    """
    Returns the list of available adventure activities.
    """
    return MOCK_ADVENTURES
