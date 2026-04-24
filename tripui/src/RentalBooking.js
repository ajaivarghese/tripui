import React, { useState, useEffect } from 'react';
import './RentalBooking.css';

// Default mock data transferred from original HTML script
const defaultVehicles = [
  { id: 1, name: "Toyota Camry", vendor: "Hertz", type: "Car", categoryClass: "type-car", driverType: "Self-Drive", image: "https://via.placeholder.com/300x160/2b6cb0/ffffff?text=Sedan", rating: 4.8, passengers: 5, luggage: 2, gear: "Automatic", fuel: "Petrol", pricePerDay: 50 },
  { id: 2, name: "Mercedes V-Class", vendor: "Sixt", type: "Van", categoryClass: "type-van", driverType: "With Driver", image: "https://via.placeholder.com/300x160/d69e2e/ffffff?text=Luxury+Van", rating: 4.9, passengers: 7, luggage: 5, gear: "Automatic", fuel: "Diesel", pricePerDay: 120 },
  { id: 3, name: "Toyota Coaster", vendor: "Avis", type: "Bus", categoryClass: "type-bus", driverType: "With Driver", image: "https://via.placeholder.com/300x160/e53e3e/ffffff?text=Mini+Bus", rating: 4.5, passengers: 22, luggage: 15, gear: "Manual", fuel: "Diesel", pricePerDay: 200 },
  { id: 4, name: "Volvo 9400", vendor: "City Transport Ltd", type: "Luxury Bus", categoryClass: "type-luxury-bus", driverType: "With Driver", image: "", rating: 4.7, passengers: 45, luggage: 40, gear: "Manual", fuel: "Diesel", pricePerDay: 450 },
  { id: 5, name: "Honda CR-V", vendor: "Budget", type: "SUV", categoryClass: "type-suv", driverType: "Self-Drive", image: "https://via.placeholder.com/300x160/805ad5/ffffff?text=SUV", rating: 4.6, passengers: 5, luggage: 4, gear: "Automatic", fuel: "Hybrid", pricePerDay: 85 },
  { id: 6, name: "Chevrolet Tahoe", vendor: "Enterprise", type: "SUV", categoryClass: "type-suv", driverType: "Self-Drive", image: "https://via.placeholder.com/300x160/6b46c1/ffffff?text=Large+SUV", rating: 4.8, passengers: 7, luggage: 6, gear: "Automatic", fuel: "Petrol", pricePerDay: 130 }
];

const RentalBooking = ({ rentalData, onBack }) => {
  // If the backend returned a raw HTML string instead of JSON, we can render it safely in an iframe.
  if (typeof rentalData === 'string' && rentalData.trim().startsWith('<!DOCTYPE html>')) {
    return (
      <div className="rental-html-wrapper">
        <button className="rental-back-btn" onClick={onBack}>← Back to Timeline</button>
        <iframe title="Rental Booking HTML" srcDoc={rentalData} style={{ width: '100%', height: '800px', border: 'none' }} />
      </div>
    );
  }

  // Otherwise, use React flow using passed JSON data or fallback
  const vehicles = Array.isArray(rentalData) && rentalData.length > 0 ? rentalData : defaultVehicles;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDays, setCurrentDays] = useState(3);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 3);
    
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      setCurrentDays(diffDays);
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (e) => {
    const newStart = e.target.value;
    setStartDate(newStart);
    if (endDate < newStart) setEndDate(newStart);
  };

  const filteredVehicles = vehicles.filter(v => {
    const searchLower = searchTerm.toLowerCase().trim();
    return (
      v.name.toLowerCase().includes(searchLower) || 
      v.vendor.toLowerCase().includes(searchLower) ||
      v.type.toLowerCase().includes(searchLower) ||
      v.driverType.toLowerCase().includes(searchLower) ||
      v.gear.toLowerCase().includes(searchLower)
    );
  });

  const handleBook = (name) => {
    alert(`Booking ${name}\nFrom: ${startDate}\nTo: ${endDate}\nTotal Days: ${currentDays}`);
  };

  return (
    <div className="rental-container">
      <button className="rental-back-btn" onClick={onBack}>← Back to Timeline</button>
      
      <h1 className="rental-title">Vehicle Rental</h1>

      <div className="rental-trip-bar">
        <div className="rental-date-group">
          <label className="rental-date-label">Pick-Up Date</label>
          <input 
            type="date" 
            className="rental-date-input" 
            value={startDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={handleStartDateChange} 
          />
        </div>

        <div className="rental-date-group">
          <label className="rental-date-label">Drop-Off Date</label>
          <input 
            type="date" 
            className="rental-date-input" 
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </div>

        <div className="rental-duration-badge">
          <span>⏱</span> <span>{currentDays}</span> Days
        </div>
      </div>

      <div className="rental-search-wrapper">
        <input 
          type="text" 
          className="rental-search-input" 
          placeholder="Search by name, driver, etc..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="rental-search-icon">🔍</span>
      </div>

      <div className="rental-vehicle-list">
        {filteredVehicles.length === 0 ? (
          <div className="rental-no-results">
            <p>No vehicles found matching your criteria.</p>
          </div>
        ) : (
          filteredVehicles.map(v => {
            const totalPrice = v.pricePerDay * currentDays;
            const driverClass = v.driverType === "With Driver" ? "rental-driver-yes" : "rental-driver-no";
            const driverIcon = v.driverType === "With Driver" ? "👨‍✈️" : "🚗";

            return (
              <div className="rental-vehicle-card" key={v.id}>
                <div className="rental-v-image-box">
                  {v.image ? (
                    <img src={v.image} alt={v.name} />
                  ) : (
                    <div className="rental-no-image-text">
                      <span style={{ fontSize: '24px' }}>📷</span>
                      No Image Available
                    </div>
                  )}
                  <span className={`rental-v-type-badge ${v.categoryClass}`}>{v.type}</span>
                  <span className={`rental-driver-badge ${driverClass}`}>{driverIcon} {v.driverType}</span>
                </div>
                
                <div className="rental-v-content">
                  <div className="rental-v-header">
                    <div className="rental-v-name">{v.name}</div>
                    <div className="rental-v-meta-row">
                      <span className="rental-v-meta-tag">🏢 {v.vendor}</span>
                      <span className="rental-v-meta-tag">★ {v.rating} / 5.0</span>
                    </div>
                  </div>

                  <div className="rental-specs-grid">
                    <div className="rental-spec-item"><span className="rental-spec-icon">👤</span> {v.passengers} Seats</div>
                    <div className="rental-spec-item"><span className="rental-spec-icon">🧳</span> {v.luggage} Bags</div>
                    <div className="rental-spec-item"><span className="rental-spec-icon">⚙️</span> {v.gear}</div>
                    <div className="rental-spec-item"><span className="rental-spec-icon">⛽</span> {v.fuel}</div>
                  </div>

                  <div className="rental-pricing-box">
                    <div className="rental-price-row">
                      <span className="rental-daily-rate">${v.pricePerDay} / day</span>
                      <div style={{ textAlign: 'right' }}>
                         <span className="rental-total-label">Total for {currentDays} Days</span>
                         <div className="rental-total-price">${totalPrice.toLocaleString()}</div>
                      </div>
                    </div>
                    <button className="rental-book-btn" onClick={() => handleBook(v.name)}>Select Vehicle</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RentalBooking;