import React, { useState } from 'react';
import './FlightBooking.css';

const FlightBooking = ({ searchConfig, onShowResults, onBack }) => {
  const [loading, setLoading] = useState(false);

  // You can tie these to state variables to actually pass them in the body
  const handleSearchFlights = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('POST to https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flights/lists');
      
      const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flights/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "search_flights" }) 
      });

      const flightResults = await response.json();
      
      if (onShowResults) {
        onShowResults(flightResults);
      }
    } catch (error) {
      console.error("Error searching flights:", error);
      alert("Failed to reach flight lists API.");
    } finally {
      setLoading(false);
    }
  };

  const clearInput = (e) => {
    e.target.previousElementSibling.value = '';
  };

  return (
    <div className="flight-booking-wrapper">
      <button 
        style={{ margin: '20px', background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontWeight: 'bold' }} 
        onClick={onBack}
      >
        ← Back to Itinerary
      </button>

      <div className="search-container">
        <form className="search-form" onSubmit={handleSearchFlights}>
          
          <datalist id="airport-list">
            <option value="JFK - New York John F. Kennedy" />
            <option value="LHR - London Heathrow" />
            <option value="DXB - Dubai International" />
            <option value="CDG - Paris Charles de Gaulle" />
          </datalist>

          <div className="input-group">
            <input type="text" list="airport-list" className="search-input" placeholder="Departure Airport (Type to search)" required />
            <button type="button" className="clear-btn" onClick={clearInput}>×</button>
          </div>

          <div className="input-group">
            <input type="text" list="airport-list" className="search-input" placeholder="Arrival Airport (Type to search)" required />
            <button type="button" className="clear-btn" onClick={clearInput}>×</button>
          </div>

          <div className="split-row">
            <div className="input-group">
              <input type="text" className="search-input" placeholder="Departure Date" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} />
            </div>
            <div className="input-group">
              <input type="text" className="search-input" placeholder="Return Date" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} />
            </div>
          </div>

          <div className="split-row">
            <div className="input-group">
              <label className="floating-label">ADULTS</label>
              <input type="number" className="search-input" defaultValue="1" min="1" style={{ paddingTop: '20px', paddingBottom: '10px' }} />
            </div>
            <div className="input-group">
              <label className="floating-label">CHILDREN</label>
              <input type="number" className="search-input" defaultValue="0" min="0" style={{ paddingTop: '20px', paddingBottom: '10px' }} />
            </div>
          </div>

          <div className="input-group">
            <select className="search-input">
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
            <span className="clear-btn" style={{ pointerEvents: 'none' }}>▼</span>
          </div>

          <div className="input-group">
            <input type="text" className="search-input" placeholder="Promo Code" />
            <button type="button" className="clear-btn" onClick={clearInput}>×</button>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlightBooking;