// App.js
import React, { useState } from 'react';
import './App.css';
import ItineraryList from './ItineraryList';
import ItineraryTimeline from './ItineraryTimeline';
import FlightBooking from './FlightBooking'; // <-- Import new component
import FlightResults from './FlightResult'; // <-- Import new component

function App() {
  // --- VIEW ROUTING STATE ---
  // Controls which main component is visible: 'home' | 'timeline' | 'flightBooking' | 'flightResults'
  const [currentView, setCurrentView] = useState('home');

  // --- DATA STATES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [itineraries, setItineraries] = useState([]);
  const [detailedViewData, setDetailedViewData] = useState(null); 
  const [flightSearchConfig, setFlightSearchConfig] = useState(null); // Data for flight booking form
  const [flightResultsData, setFlightResultsData] = useState(null); // Data for flight results list
  
  // --- LOADING STATES ---
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  // 1. Fetch the High-Level List
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setDetailedViewData(null); // Reset details 

    try {
      const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm }),
      });
      const data = await response.json();
      setItineraries(data); 
      setCurrentView('home');
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
      setCurrentView('timeline'); // Switch view
    } catch (error) {
      console.error("Failed to fetch itinerary details:", error);
    } finally {
      setIsDetailsLoading(false);
    }
  };

  // --- NAVIGATION HANDLERS ---
  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleBackToHome = () => {
    setDetailedViewData(null);
    setCurrentView('home');
  };

  return (
    <div>
      {/* Hide the search bar if we are not on the home view */}
      {currentView === 'home' && (
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

      {/* Global Loading Indicator for Details */}
      {isDetailsLoading && <p style={{textAlign: 'center', marginTop: '40px'}}>Loading details...</p>}

      {/* VIEW RENDERING LOGIC */}
      
      {!isDetailsLoading && currentView === 'home' && itineraries.length > 0 && (
        <ItineraryList 
          itineraries={itineraries} 
          onViewDetails={fetchItineraryDetails} 
        />
      )}

      {!isDetailsLoading && currentView === 'timeline' && detailedViewData && (
        <ItineraryTimeline 
          timelineData={detailedViewData} 
          onBack={handleBackToHome} 
          onShowFlightSearch={(configData) => {
            // Triggered when a flight card is clicked in ItineraryTimeline.js
            setFlightSearchConfig(configData);
            setCurrentView('flightBooking');
          }}
        />
      )}

      {!isDetailsLoading && currentView === 'flightBooking' && (
        <FlightBooking 
          searchConfig={flightSearchConfig}
          onBack={() => setCurrentView('timeline')}
          onShowResults={(resultsData) => {
            // Triggered when "Search Flights" is clicked in FlightBooking.js
            setFlightResultsData(resultsData);
            setCurrentView('flightResults');
          }}
        />
      )}

      {!isDetailsLoading && currentView === 'flightResults' && (
        <FlightResults 
          flights={flightResultsData}
          onBack={() => setCurrentView('flightBooking')}
          onSelectFlight={(flight) => {
             // Handle what happens when they select a specific flight
             console.log('Flight Selected:', flight);
             alert(`You selected ${flight.airline}. Proceeding to Next Step...`);
          }}
        />
      )}

    </div>
  );
}

export default App;