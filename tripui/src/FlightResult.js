import React, { useState } from 'react';
import './FlightResults.css';

// Fallback data in case the API call fails or returns empty
const FALLBACK_FLIGHTS = [
  {
    id: "f1",
    airline: "Etihad Airways (EY)",
    timeRange: "21:55 - 02:35",
    nextDay: "(+2d)",
    durationStops: "18h 10m | 1 Stop (AUH)",
    price: "$416.50",
    segments: [
      { depTime: "21:55 JFK", depCode: "New York T4", meta: "Boeing 787-9 | 12h 40m", arrTime: "19:35 AUH", arrCode: "Abu Dhabi TA" },
      { depTime: "21:00 AUH", depCode: "Abu Dhabi TA", meta: "Boeing 737 Max 8", arrTime: "02:35 COK", arrCode: "Kochi T3", isLast: true }
    ],
    layover: "1h 25m Layover in Abu Dhabi"
  }
];

const FlightResults = ({ flights = FALLBACK_FLIGHTS, onBack, onSelectFlight }) => {
  const [activeCardId, setActiveCardId] = useState(null);

  const toggleCard = (id) => {
    setActiveCardId(activeCardId === id ? null : id);
  };

  const displayFlights = flights && flights.length > 0 ? flights : FALLBACK_FLIGHTS;

  return (
    <div className="flight-results-wrapper">
      <div className="results-container">
        
        <button 
          style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontWeight: 'bold' }} 
          onClick={onBack}
        >
          ← Back to Search
        </button>

        {displayFlights.map((flight, idx) => (
          <div 
            key={flight.id || idx} 
            className={`flight-card ${activeCardId === (flight.id || idx) ? 'active' : ''}`}
            onClick={() => toggleCard(flight.id || idx)}
          >
            <div className="card-header">
              <div className="route-info">
                <div className="airline-name">{flight.airline}</div>
                <div className="time-range">
                  {flight.timeRange} <span style={{ fontSize: '12px', color: '#a0aec0' }}>{flight.nextDay}</span>
                </div>
                <div className="duration-stops">{flight.durationStops}</div>
              </div>
              <div className="price-action">
                <span className="price">{flight.price}</span>
                <span className="expand-icon">▼ Details</span>
              </div>
            </div>

            <div className="card-details" onClick={(e) => e.stopPropagation()}>
              {flight.segments && flight.segments.map((seg, sIdx) => (
                <React.Fragment key={sIdx}>
                  <div className={`segment ${seg.isLast ? 'last-segment' : ''}`}>
                    <div className="dot"></div> 
                    <div className="segment-detail-row">
                      <span className="seg-time">{seg.depTime}</span>
                      <span className="seg-code">{seg.depCode}</span>
                    </div>
                    <div className="seg-meta">{seg.meta}</div>
                    
                    <div className="segment-detail-row" style={{ marginTop: '15px' }}>
                      <span className="seg-time">{seg.arrTime}</span>
                      <span className="seg-code">{seg.arrCode}</span>
                    </div>
                    {seg.isLast && <div className="dot end-dot"></div>}
                  </div>
                  
                  {!seg.isLast && flight.layover && (
                    <div className="layover-badge">{flight.layover}</div>
                  )}
                </React.Fragment>
              ))}

              <button className="book-btn" onClick={() => onSelectFlight && onSelectFlight(flight)}>
                Select Flight
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default FlightResults;