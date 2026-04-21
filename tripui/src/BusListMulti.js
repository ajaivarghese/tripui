import React, { useState } from 'react';
import './BusListMulti.css';

const FALLBACK_BUSES = [
  {
    id: 1, operator: "Greyhound", type: "Volvo AC Seater (2+2)", rating: 4.2,
    depTime: "08:00 AM", depLoc: "South Station", arrTime: "12:30 PM", arrLoc: "Port Authority",
    duration: "4h 30m", price: "$35", seatsLeft: 12,
    amenities: ["Free WiFi", "Charging Point", "Water Bottle", "Toilet"]
  },
  {
    id: 2, operator: "Peter Pan", type: "Scania Multi-Axle", rating: 4.5,
    depTime: "10:15 AM", depLoc: "South Station", arrTime: "02:45 PM", arrLoc: "Port Authority",
    duration: "4h 30m", price: "$42", seatsLeft: 8,
    amenities: ["Free WiFi", "Leg Room", "AC"]
  },
  {
    id: 3, operator: "FlixBus", type: "Mercedes Benz Sleeper", rating: 3.9,
    depTime: "01:00 PM", depLoc: "Alewife Station", arrTime: "05:40 PM", arrLoc: "31st St",
    duration: "4h 40m", price: "$29", seatsLeft: 20,
    amenities: ["Power Outlet", "Eco Friendly"]
  }
];

const BusListMulti = ({ busData, onBack, onSelectBus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const displayBuses = busData && busData.length > 0 ? busData : FALLBACK_BUSES;

  const filteredBuses = displayBuses.filter(b => 
    b.operator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bus-list-wrapper">
      <div className="bus-container">
        
        <button style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontWeight: 'bold' }} onClick={onBack}>
          ← Back to Itinerary
        </button>

        <h1 className="header-title">Select Bus</h1>

        <div className="route-card">
          <div className="route-point">
            <span className="route-label">From</span>
            <span className="route-value">Boston (South Station)</span>
          </div>
          <div className="route-arrow">➝</div>
          <div className="route-point">
            <span className="route-label">To</span>
            <span className="route-value">New York (Port Auth)</span>
          </div>
          <div className="divider"></div>
          <div className="route-point">
            <span className="route-label">Date</span>
            <span className="route-value">📅 Oct 25</span>
          </div>
        </div>

        <div className="search-wrapper">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search Operator (e.g. Greyhound)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div>
          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => (
              <div key={bus.id} className="bus-card">
                <div className="card-header">
                  <div>
                    <div className="op-name">{bus.operator}</div>
                    <div className="bus-type">{bus.type}</div>
                  </div>
                  <div className="rating-badge">★ {bus.rating}</div>
                </div>
                
                <div className="card-body">
                  <div className="time-col">
                    <span className="time-val">{bus.depTime}</span>
                    <span className="loc-val">{bus.depLoc}</span>
                  </div>
                  <div className="duration-col">
                    <span className="dur-val">{bus.duration}</span>
                    <div className="dur-line"></div>
                  </div>
                  <div className="time-col" style={{ textAlign: 'right' }}>
                    <span className="time-val">{bus.arrTime}</span>
                    <span className="loc-val">{bus.arrLoc}</span>
                  </div>
                </div>
                
                <div className="amenity-row">
                  {bus.amenities.map((amenity, idx) => (
                    <span key={idx} className="amenity-tag">✓ {amenity}</span>
                  ))}
                </div>
                
                <div className="card-footer">
                  <div className="price-col">
                    <span className="price-val">{bus.price}</span>
                    <span className="seat-count">{bus.seatsLeft} Seats Left</span>
                  </div>
                  <button 
                    className="select-btn" 
                    onClick={() => onSelectBus && onSelectBus(bus)}
                  >
                    Select Bus
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No buses found matching your search.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BusListMulti;