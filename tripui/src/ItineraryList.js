// ItineraryList.js
import React from 'react';
import './ItineraryList.css';

const ItineraryList = ({ itineraries, onViewDetails }) => {
  return (
    <div className="list-container">
      <h1>Available Itineraries</h1>

      {itineraries.map((trip, index) => (
        <div className="trip-card" key={index}>
          <div className="trip-info">
            <span className="trip-title">{trip.title || "Unnamed Trip"}</span>
            <div className="trip-route">
              <span>✈️ {trip.origin} ➝ {trip.destination}</span>
              <span style={{ color: '#cbd5e0' }}>•</span>
              <span>{trip.stops}</span>
            </div>
            <div className="tag-container">
              <span className="tag duration">{trip.duration}</span>
              <span className="tag hotel">{trip.hotelType}</span>
              <span className="tag flight">{trip.flightClass}</span>
            </div>
          </div>
          <div className="trip-action">
            <span className="price">${trip.price}</span>
            <span className="per-person">per person</span>
            <button 
              className="view-btn" 
              onClick={() => onViewDetails(trip.id)} /* <-- Trigger the API call */
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryList;