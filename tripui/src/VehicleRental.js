import React, { useState, useEffect } from 'react';
import './VehicleRental.css';

const INITIAL_VEHICLES = [
  {
    id: 1,
    name: "Toyota Camry",
    type: "Car",
    categoryClass: "type-car",
    driverType: "Self-Drive",
    image: "https://via.placeholder.com/300x160/2b6cb0/ffffff?text=Sedan",
    rating: 4.8,
    passengers: 5,
    luggage: 2,
    gear: "Automatic",
    fuel: "Petrol",
    pricePerDay: 50
  },
  {
    id: 2,
    name: "Mercedes V-Class",
    type: "Van",
    categoryClass: "type-van",
    driverType: "With Driver",
    image: "https://via.placeholder.com/300x160/d69e2e/ffffff?text=Luxury+Van",
    rating: 4.9,
    passengers: 7,
    luggage: 5,
    gear: "Automatic",
    fuel: "Diesel",
    pricePerDay: 120
  },
  {
    id: 3,
    name: "Toyota Coaster",
    type: "Bus",
    categoryClass: "type-bus",
    driverType: "With Driver",
    image: "https://via.placeholder.com/300x160/e53e3e/ffffff?text=Mini+Bus",
    rating: 4.5,
    passengers: 22,
    luggage: 15,
    gear: "Manual",
    fuel: "Diesel",
    pricePerDay: 200
  },
  {
    id: 4,
    name: "Volvo 9400",
    type: "Bus",
    categoryClass: "type-bus",
    driverType: "With Driver",
    image: "", // Empty for fallback test
    rating: 4.7,
    passengers: 45,
    luggage: 40,
    gear: "Manual",
    fuel: "Diesel",
    pricePerDay: 450
  },
  {
    id: 5,
    name: "Honda CR-V",
    type: "SUV",
    categoryClass: "type-suv",
    driverType: "Self-Drive",
    image: "https://via.placeholder.com/300x160/805ad5/ffffff?text=SUV",
    rating: 4.6,
    passengers: 5,
    luggage: 4,
    gear: "Automatic",
    fuel: "Hybrid",
    pricePerDay: 85
  },
  {
    id: 6,
    name: "Chevrolet Tahoe",
    type: "SUV",
    categoryClass: "type-suv",
    driverType: "Self-Drive",
    image: "https://via.placeholder.com/300x160/6b46c1/ffffff?text=Large+SUV",
    rating: 4.8,
    passengers: 7,
    luggage: 6,
    gear: "Automatic",
    fuel: "Petrol",
    pricePerDay: 130
  }
];

const VehicleRental = () => {
  // --- STATE ---
  const [vehicles] = useState(INITIAL_VEHICLES);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(1);
  const [loadingId, setLoadingId] = useState(null); // For loading button state

  // --- INIT DATES ---
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 3);

    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // --- CALCULATE DAYS EFFECT ---
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays > 0 ? diffDays : 1);
    }
  }, [startDate, endDate]);

  // --- FILTER LOGIC ---
  const filteredVehicles = vehicles.filter((v) => {
    const term = searchTerm.toLowerCase();
    return (
      v.name.toLowerCase().includes(term) ||
      v.type.toLowerCase().includes(term) ||
      v.driverType.toLowerCase().includes(term) ||
      v.gear.toLowerCase().includes(term)
    );
  });

  // --- BOOKING HANDLER ---
  const handleBookVehicle = async (vehicle) => {
    setLoadingId(vehicle.id);
    
    const bookingPayload = {
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        pickupDate: startDate,
        dropoffDate: endDate,
        totalDays: days,
        totalPrice: vehicle.pricePerDay * days
    };

    console.log("POST https://travelapi.myvnc.com/vehicle/book", bookingPayload);

    try {
        // Simulate API Request
        // await fetch('https://travelapi.myvnc.com/vehicle/book', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(bookingPayload)
        // });

        // Simulate network delay
        setTimeout(() => {
            alert(`Booking confirmed for ${vehicle.name}!\nDates: ${startDate} to ${endDate}\nTotal: $${bookingPayload.totalPrice}`);
            setLoadingId(null);
        }, 1000);

    } catch (error) {
        console.error("Booking Error:", error);
        alert("Booking failed. Please try again.");
        setLoadingId(null);
    }
  };

  return (
    <div className="vehicle-container">
      <h1 className="vehicle-header">Vehicle Rental</h1>

      {/* TRIP BAR (DATES) */}
      <div className="trip-bar">
        <div className="date-group">
          <label className="date-label">Pick-Up Date</label>
          <input 
            type="date" 
            className="date-input" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </div>

        <div className="date-group">
          <label className="date-label">Drop-Off Date</label>
          <input 
            type="date" 
            className="date-input" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </div>

        <div className="duration-badge">
          <span>⏱</span> <span>{days}</span> Days
        </div>
      </div>

      {/* SEARCH */}
      <div className="vehicle-search-wrapper">
        <input
          type="text"
          className="vehicle-search-input"
          placeholder="Search 'Self Drive', 'With Driver', 'SUV'..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="vehicle-search-icon">🔍</span>
      </div>

      {/* GRID */}
      <div className="vehicle-grid">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((v) => {
            const totalPrice = v.pricePerDay * days;
            const driverClass = v.driverType === "With Driver" ? "driver-yes" : "driver-no";
            const driverIcon = v.driverType === "With Driver" ? "👨‍✈️" : "🚗";

            return (
              <div key={v.id} className="vehicle-card">
                <div className="v-image-box">
                  {v.image ? (
                    <img src={v.image} alt={v.name} />
                  ) : (
                    <div className="no-image-text">
                      <span style={{ fontSize: '24px' }}>📷</span>
                      No Image Available
                    </div>
                  )}
                  <span className={`v-type-badge ${v.categoryClass}`}>{v.type}</span>
                  <span className={`driver-badge ${driverClass}`}>
                    {driverIcon} {v.driverType}
                  </span>
                </div>

                <div className="v-content">
                  <div className="v-header">
                    <div>
                      <div className="v-name">{v.name}</div>
                      <div className="v-rating">★ {v.rating} / 5.0</div>
                    </div>
                  </div>

                  <div className="specs-grid">
                    <div className="spec-item"><span className="spec-icon">👤</span> {v.passengers} Seats</div>
                    <div className="spec-item"><span className="spec-icon">🧳</span> {v.luggage} Bags</div>
                    <div className="spec-item"><span className="spec-icon">⚙️</span> {v.gear}</div>
                    <div className="spec-item"><span className="spec-icon">⛽</span> {v.fuel}</div>
                  </div>

                  <div className="pricing-box">
                    <div className="price-row">
                      <span className="daily-rate">${v.pricePerDay} / day</span>
                      <div style={{ textAlign: 'right' }}>
                        <span className="total-label">Total for {days} Days</span>
                        <div className="total-price">${totalPrice.toLocaleString()}</div>
                      </div>
                    </div>
                    <button 
                        className="book-vehicle-btn" 
                        onClick={() => handleBookVehicle(v)}
                        disabled={loadingId === v.id}
                    >
                        {loadingId === v.id ? 'Processing...' : 'Select Vehicle'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <p>No vehicles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleRental;