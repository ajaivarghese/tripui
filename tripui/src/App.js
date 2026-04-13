// App.js
import React, { useState } from 'react';
import './App.css';
import ItineraryList from './ItineraryList';
import ItineraryTimeline from './ItineraryTimeline';
import FlightBooking from './FlightBooking'; 
import FlightResults from './FlightResults'; 
import FlightPricePassenger from './FlightPricePassenger'; 
import FlightSeatBooking from './FlightSeatBooking';       

function App() {
  // --- VIEW ROUTING STATE ---
  // Controls which main component is visible: 
  // 'home' | 'timeline' | 'flightBooking' | 'flightResults' | 'flightPricePassenger' | 'flightSeatBooking'
  const [currentView, setCurrentView] = useState('home');

  // --- DATA STATES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [itineraries, setItineraries] = useState([]);
  const [detailedViewData, setDetailedViewData] = useState(null); 
  
  // Flight & Booking States
  const [flightSearchConfig, setFlightSearchConfig] = useState(null); 
  const [flightResultsData, setFlightResultsData] = useState(null); 
  const [selectedFlightData, setSelectedFlightData] = useState(null); 
  const [passengerConfigData, setPassengerConfigData] = useState(null); 
  const [seatDataConfig, setSeatDataConfig] = useState(null); 
  const [passengerCount, setPassengerCount] = useState(1);
  
  // --- LOADING STATES ---
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  // 1. Fetch the High-Level List (Home View)
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setDetailedViewData(null); 

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

  // 2. Fetch the Detailed Timeline JSON (Timeline View)
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
      setCurrentView('timeline'); 
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
            setFlightResultsData(resultsData);
            setCurrentView('flightResults');
          }}
        />
      )}

      {!isDetailsLoading && currentView === 'flightResults' && (
        <FlightResults 
          flights={flightResultsData}
          onBack={() => setCurrentView('flightBooking')}
          onSelectFlight={(flight, passengerConfig) => {
             setSelectedFlightData(flight);
             setPassengerConfigData(passengerConfig);
             setCurrentView('flightPricePassenger');
          }}
        />
      )}

      {!isDetailsLoading && currentView === 'flightPricePassenger' && (
        <FlightPricePassenger 
          flight={selectedFlightData}
          passengerConfig={passengerConfigData}
          onBack={() => setCurrentView('flightResults')}
          onConfirmSeats={(seatData, pCount) => {
             setSeatDataConfig(seatData);
             setPassengerCount(pCount);
             setCurrentView('flightSeatBooking');
          }}
        />
      )}

      {!isDetailsLoading && currentView === 'flightSeatBooking' && (
        <FlightSeatBooking 
          seatData={seatDataConfig}
          maxSeats={passengerCount}
          onBack={() => setCurrentView('flightPricePassenger')}
        />
      )}

    </div>
  );
}

export default App;