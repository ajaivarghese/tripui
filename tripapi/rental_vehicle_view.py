from fastapi import APIRouter

router = APIRouter()

# Mock data directly reflecting the vehicles array from rental_booking.html[cite: 1]
MOCK_VEHICLES = [
    {
        "id": 1,
        "name": "Toyota Camry",
        "vendor": "Hertz",
        "type": "Car",
        "categoryClass": "type-car",
        "driverType": "Self-Drive",
        "image": "https://via.placeholder.com/300x160/2b6cb0/ffffff?text=Sedan",
        "rating": 4.8,
        "passengers": 5,
        "luggage": 2,
        "gear": "Automatic",
        "fuel": "Petrol",
        "pricePerDay": 50,
    },
    {
        "id": 2,
        "name": "Mercedes V-Class",
        "vendor": "Sixt",
        "type": "Van",
        "categoryClass": "type-van",
        "driverType": "With Driver",
        "image": "https://via.placeholder.com/300x160/d69e2e/ffffff?text=Luxury+Van",
        "rating": 4.9,
        "passengers": 7,
        "luggage": 5,
        "gear": "Automatic",
        "fuel": "Diesel",
        "pricePerDay": 120,
    },
    {
        "id": 3,
        "name": "Toyota Coaster",
        "vendor": "Avis",
        "type": "Bus",
        "categoryClass": "type-bus",
        "driverType": "With Driver",
        "image": "https://via.placeholder.com/300x160/e53e3e/ffffff?text=Mini+Bus",
        "rating": 4.5,
        "passengers": 22,
        "luggage": 15,
        "gear": "Manual",
        "fuel": "Diesel",
        "pricePerDay": 200,
    },
    {
        "id": 4,
        "name": "Volvo 9400",
        "vendor": "City Transport Ltd",
        "type": "Luxury Bus",
        "categoryClass": "type-luxury-bus",
        "driverType": "With Driver",
        "image": "",
        "rating": 4.7,
        "passengers": 45,
        "luggage": 40,
        "gear": "Manual",
        "fuel": "Diesel",
        "pricePerDay": 450,
    },
    {
        "id": 5,
        "name": "Honda CR-V",
        "vendor": "Budget",
        "type": "SUV",
        "categoryClass": "type-suv",
        "driverType": "Self-Drive",
        "image": "https://via.placeholder.com/300x160/805ad5/ffffff?text=SUV",
        "rating": 4.6,
        "passengers": 5,
        "luggage": 4,
        "gear": "Automatic",
        "fuel": "Hybrid",
        "pricePerDay": 85,
    },
    {
        "id": 6,
        "name": "Chevrolet Tahoe",
        "vendor": "Enterprise",
        "type": "SUV",
        "categoryClass": "type-suv",
        "driverType": "Self-Drive",
        "image": "https://via.placeholder.com/300x160/6b46c1/ffffff?text=Large+SUV",
        "rating": 4.8,
        "passengers": 7,
        "luggage": 6,
        "gear": "Automatic",
        "fuel": "Petrol",
        "pricePerDay": 130,
    },
]


@router.get("/trip/rental/vehicle/book")
async def get_rental_vehicles():
    """
    Returns the list of rental vehicles including driver options and metadata.
    """
    return MOCK_VEHICLES
