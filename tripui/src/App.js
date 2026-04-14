import React, { useState } from 'react';
import './App.css';
import ItineraryList from './ItineraryList';
import ItineraryTimeline from './ItineraryTimeline';
import FlightBooking from './FlightBooking'; 
import FlightResults from './FlightResults'; 
import FlightPricePassenger from './FlightPricePassenger'; 
import FlightSeatBooking from './FlightSeatBooking';       
import FlightMealPreference from './FlightMealPreference'; 

function App() {
  // --- VIEW ROUTING STATE ---
  // Controls which main component is visible: 
  // 'home' | 'timeline' | 'flightBooking' | 'flightResults' | 'flightPricePassenger' | 'flightSeatBooking' | 'flightMealPreference'
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
  const [mealConfigData, setMealConfigData] = useState(null); 

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
      alert("Failed to reach the search API. Please ensure the backend is running.");
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
      alert("Failed to load itinerary details.");
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
    <div className="app-wrapper">
      {/* Search Bar - Only visible on the home view */}
      {currentView === 'home' && (
        <div className="search-container">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="input-group">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search destinations (e.g., London, Tokyo)..." 
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
      {isDetailsLoading && (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
            <p style={{ color: '#718096', fontWeight: 'bold' }}>Loading details...</p>
        </div>
      )}

      {/* --- VIEW RENDERING LOGIC --- */}
      
      {/* 1. Trip List */}
      {!isDetailsLoading && currentView === 'home' && itineraries.length > 0 && (
        <ItineraryList 
          itineraries={itineraries} 
          onViewDetails={fetchItineraryDetails} 
        />
      )}

      {/* 2. Trip Timeline */}
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

      {/* 3. Flight Search Form */}
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

      {/* 4. Flight Multi-List Results */}
      {!isDetailsLoading && currentView === 'flightResults' && (
        <FlightResults 
          flights={flightResultsData}
          onBack={() => setCurrentView('flightBooking')}
          onSelectFlight={(flight, passengerConfig) => {
             // Triggered when "Select Flight" is clicked
             setSelectedFlightData(flight);
             setPassengerConfigData(passengerConfig);
             setCurrentView('flightPricePassenger');
          }}
        />
      )}

      {/* 5. Passenger Details & Price Checkout */}
      {!isDetailsLoading && currentView === 'flightPricePassenger' && (
        <FlightPricePassenger 
          flight={selectedFlightData}
          passengerConfig={passengerConfigData}
          onBack={() => setCurrentView('flightResults')}
          onConfirmSeats={(seatData, pCount) => {
             // Transitions to Seat Booking when "Confirm & Pay" is clicked
             setSeatDataConfig(seatData);
             setPassengerCount(pCount);
             setCurrentView('flightSeatBooking');
          }}
        />
      )}

      {/* 6. Seat Selection */}
      {!isDetailsLoading && currentView === 'flightSeatBooking' && (
        <FlightSeatBooking 
          seatData={seatDataConfig}
          maxSeats={passengerCount}
          onBack={() => setCurrentView('flightPricePassenger')}
          onConfirmSeatsFinal={(mealConfig) => {
            // Transitions to Meal Preference when "Confirm Seat(s)" is clicked
            setMealConfigData(mealConfig);
            setCurrentView('flightMealPreference');
          }}
        />
      )}

      {/* 7. Meal Preferences */}
      {!isDetailsLoading && currentView === 'flightMealPreference' && (
        <FlightMealPreference 
          mealConfig={mealConfigData}
          onBack={() => setCurrentView('flightSeatBooking')}
          onSavePreferences={(summaryData) => {
             // Final action - show a success message and go back to the itinerary timeline
             alert("Booking Complete! Your preferences have been saved.");
             setCurrentView('timeline');
          }}
        />
      )}

    </div>
  );
}

export default App;