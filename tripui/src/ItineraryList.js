// ItineraryList.js
import React from 'react';
import './ItineraryList.css';

const ItineraryList = ({ itineraries }) => {
  return (
    <div className="list-container">
      <h1>Available Itineraries</h1>

      {itineraries.map((trip, index) => (
        <div className="trip-card" key={index}>
          <div className="trip-info">
            {/* Fallbacks used here in case the API JSON keys differ from these names */}
            <span className="trip-title">{trip.title || "Unnamed Trip"}</span>
            <div className="trip-route">
              <span>✈️ {trip.origin || "JFK"} ➝ {trip.destination || "LHR"}</span>
              <span style={{ color: '#cbd5e0' }}>•</span>
              <span>{trip.stops || "Non-stop"}</span>
            </div>
            <div className="tag-container">
              <span className="tag duration">{trip.duration || "N/A Days"}</span>
              <span className="tag hotel">{trip.hotelType || "Standard Stay"}</span>
              <span className="tag flight">{trip.flightClass || "Economy"}</span>
            </div>
          </div>
          <div className="trip-action">
            <span className="price">${trip.price || "0"}</span>
            <span className="per-person">per person</span>
            <button className="view-btn">View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryList;