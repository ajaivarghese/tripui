// App.js
import React, { useState } from 'react';
import './App.css';
import ItineraryList from './ItineraryList';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [itineraries, setItineraries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchTerm }),
      });
      
      const data = await response.json();
      
      // Assuming the API returns an array of itineraries. 
      // If it returns an object like { results: [...] }, change to data.results
      setItineraries(data); 
    } catch (error) {
      console.error("Failed to fetch itineraries:", error);
      // Optional: Handle error state here
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div>
      <div className="search-container">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="input-group">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required 
            />
            {searchTerm && (
              <button type="button" className="clear-btn" onClick={clearSearch}>
                ×
              </button>
            )}
          </div>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Only show the list if we have results */}
      {itineraries.length > 0 && <ItineraryList itineraries={itineraries} />}
    </div>
  );
}

export default App;