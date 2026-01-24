import React, { useState } from 'react';
import FlightResult from './FlightResult'; // Import the new component
import './SearchBar.css';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [flightData, setFlightData] = useState(null); // State to store results

  const handleInputChange = (event) => {
    setTerm(event.target.value);
  };

  const handleClear = () => {
    setTerm('');
    setFlightData(null); // Hide results when search is cleared
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (!term) return;

    setIsLoading(true);
    setFlightData(null); // Reset previous results before new search

    try {
      // POST request to your FastAPI backend
      const response = await fetch('http://localhost:8000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Note: You are currently sending hardcoded data. 
        // Ideally, you should use 'term' to set the destination dynamically.
        body: JSON.stringify({
          "origin": "JFK",
          "destination": "LHR", 
          "date": "2025-12-25",
          "passenger": {
            "first_name": "Ajai",
            "last_name": "Varghese",
            "email": "Ajai@example.com"
          },
          "seat_class": "business"
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('FastAPI Response:', data);
      
      // THIS IS THE TRIGGER: Saving data to state shows the result
      setFlightData(data); 
      
    } catch (error) {
      console.error('Error submitting search:', error);
      alert("Failed to fetch flights. Please check the backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={onFormSubmit} className="search-form">
        
        {/* Row 1: Input and Clear Button */}
        <div className="input-group">
          <input
            type="text"
            className="search-input"
            value={term}
            onChange={handleInputChange}
            placeholder="Search destination..."
            disabled={isLoading}
          />
          
          {term && (
            <button 
              type="button" 
              className="clear-btn" 
              onClick={handleClear}
              title="Clear search"
            >
              &#x2715;
            </button>
          )}
        </div>

        {/* Row 2: Submit Button */}
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        
      </form>

      {/* --- FLIGHT RESULTS SECTION --- */}
      {/* This component only renders when flightData is not null */}
      {flightData && <FlightResult data={flightData} />}
      
    </div>
  );
};

export default SearchBar;