import React, { useState } from 'react';
import './TaxiListMulti.css';

const FALLBACK_TAXIS = [
  { id: 1, provider: "UberX", type: "Standard Sedan", seats: 4, luggage: 2, duration: "45 min trip", rating: 4.8, price: "$65.00" },
  { id: 2, provider: "Lyft XL", type: "Large SUV", seats: 6, luggage: 4, duration: "45 min trip", rating: 4.9, price: "$95.50" },
  { id: 3, provider: "Yellow Cab", type: "City Taxi", seats: 4, luggage: 2, duration: "50 min trip", rating: 4.5, price: "$55.00" },
  { id: 4, provider: "Uber Black", type: "Luxury Sedan", seats: 4, luggage: 3, duration: "45 min trip", rating: 5.0, price: "$120.00" },
  { id: 5, provider: "Shuttle Van", type: "Shared Van", seats: 12, luggage: 10, duration: "1h 10m trip", rating: 4.2, price: "$25.00" }
];

const TaxiListMulti = ({ taxiData, onBack, onSelectTaxi }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const displayTaxis = taxiData && taxiData.length > 0 ? taxiData : FALLBACK_TAXIS;

  const filteredTaxis = displayTaxis.filter(ride => 
    ride.provider.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ride.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="taxi-list-wrapper">
      <div className="taxi-container">
        
        <button style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontWeight: 'bold' }} onClick={onBack}>
          ← Back to Itinerary
        </button>

        <h1 className="header-title">Select Your Ride</h1>

        <div className="route-card">
          <div className="route-section">
            <div className="route-point">
              <span className="route-label">Pickup Point</span>
              <span className="route-value">📍 JFK Airport</span>
            </div>
            <div className="route-arrow">➝</div>
            <div className="route-point">
              <span className="route-label">Drop Point</span>
              <span className="route-value">📍 Times Square</span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="route-point">
            <span className="route-label">Est. Pickup</span>
            <span className="route-value time-value">🕒 10:45 AM</span>
          </div>
        </div>

        <div className="search-wrapper">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Filter by vehicle type (SUV, Sedan) or Provider..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="taxi-list">
          {filteredTaxis.length > 0 ? (
            filteredTaxis.map((ride) => (
              <div key={ride.id} className="taxi-card">
                <div className="taxi-info">
                  <div className="provider-row">
                    <span className="provider-name">{ride.provider}</span>
                    <span className="rating-badge">★ {ride.rating}</span>
                  </div>
                  <div className="vehicle-details">{ride.type}</div>
                  
                  <div className="capacity-row">
                    <span className="cap-badge">👤 {ride.seats} Seats</span>
                    <span className="cap-badge">🧳 {ride.luggage} Bags</span>
                  </div>
                </div>

                <div className="taxi-time">
                  <span className="duration-lbl">{ride.duration}</span>
                </div>

                <div className="taxi-action">
                  <span className="price">{ride.price}</span>
                  <button 
                    className="book-btn" 
                    onClick={() => onSelectTaxi && onSelectTaxi(ride)}
                  >
                    Book
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No vehicles found matching your criteria.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TaxiListMulti;