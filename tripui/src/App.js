// App.js
import React, { useState } from 'react';
import './App.css';
import ItineraryList from './ItineraryList';
import ItineraryTimeline from './ItineraryTimeline'; // <-- Import new component

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [itineraries, setItineraries] = useState([]);
  
  // New state to hold the detailed day-by-day JSON
  const [detailedViewData, setDetailedViewData] = useState(null); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  // 1. Fetch the High-Level List
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setDetailedViewData(null); // Reset details view on new search

    try {
      const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm }),
      });
      const data = await response.json();
      setItineraries(data); 
    } catch (error) {
      console.error("Failed to fetch itineraries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Fetch the Detailed Timeline JSON
  const fetchItineraryDetails = async (tripId) => {
    setIsDetailsLoading(true);

    try {
      const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/itinerary/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trip_id: tripId }),
      });
      
      const data = await response.json();
      setDetailedViewData(data.days); // Pass the "days" array to the timeline
    } catch (error) {
      console.error("Failed to fetch itinerary details:", error);
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleBackToList = () => {
    setDetailedViewData(null);
  };

  return (
    <div>
      {/* Hide the search bar if we are looking at the detailed view */}
      {!detailedViewData && (
        <div className="search-container">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="input-group">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search destinations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                required 
              />
              {searchTerm && (
                <button type="button" className="clear-btn" onClick={clearSearch}>×</button>
              )}
            </div>
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
      )}

      {/* Conditional Rendering Logic */}
      {isDetailsLoading && <p style={{textAlign: 'center', marginTop: '40px'}}>Loading details...</p>}

      {!isDetailsLoading && detailedViewData ? (
        // Show Detailed Timeline View
        <ItineraryTimeline 
          timelineData={detailedViewData} 
          onBack={handleBackToList} 
        />
      ) : (
        // Show List View
        itineraries.length > 0 && !isDetailsLoading && (
          <ItineraryList 
            itineraries={itineraries} 
            onViewDetails={fetchItineraryDetails} 
          />
        )
      )}
    </div>
  );
}

export default App;