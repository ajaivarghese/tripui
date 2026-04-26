import React, { useState } from 'react';
import './App.css';

// --- Itinerary Components ---
import ItineraryList from './ItineraryList';
import ItineraryTimeline from './ItineraryTimeline';

// --- Flight Components ---
import FlightBooking from './FlightBooking'; 
import FlightResults from './FlightResults'; 
import FlightPricePassenger from './FlightPricePassenger'; 
import FlightSeatBooking from './FlightSeatBooking';       
import FlightMealPreference from './FlightMealPreference';
import FlightSummary from './FlightSummary';
import FlightConfirmation from './FlightConfirmation';

// --- Surface Transport Components ---
import TrainListMulti from './TrainListMulti';
import BusListMulti from './BusListMulti'; 
import TaxiListMulti from './TaxiListMulti'; 

// --- NEW IMPORT ---
import RentalBooking from './RentalBooking'; 
import MultiTransportList from './MultiTransportList';
import AdventureList from './AdventureList';

function App() {
  // ==========================================
  // 1. STATE MANAGEMENT
  // ==========================================
  
  const [currentView, setCurrentView] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [itineraries, setItineraries] = useState([]);
  const [detailedViewData, setDetailedViewData] = useState(null); 
  
  // Flight Booking Flow Data
  const [flightSearchConfig, setFlightSearchConfig] = useState(null); 
  const [flightResultsData, setFlightResultsData] = useState(null); 
  const [selectedFlightData, setSelectedFlightData] = useState(null); 
  const [passengerConfigData, setPassengerConfigData] = useState(null); 
  const [seatDataConfig, setSeatDataConfig] = useState(null); 
  const [passengerCount, setPassengerCount] = useState(1);
  const [mealConfigData, setMealConfigData] = useState(null); 
  const [summaryData, setSummaryData] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);

  // Surface Transport Flow Data
  const [trainListData, setTrainListData] = useState(null);
  const [busListData, setBusListData] = useState(null); 
  const [taxiListData, setTaxiListData] = useState(null); 
  const [rentalListData, setRentalListData] = useState(null);
  const [multiTransportData, setMultiTransportData] = useState(null);
  const [adventureData, setAdventureData] = useState(null);

  // Loading States
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  // ==========================================
  // 2. API CALLS & HANDLERS
  // ==========================================

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
      alert("Failed to reach the search API. Please check your backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchItineraryDetails = async (tripId) => {
    setIsDetailsLoading(true);

    try {
      const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/itinerary/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trip_id: tripId }),
      });
      
      const data = await response.json();
      setDetailedViewData(data.days); 
      setCurrentView('timeline'); 
    } catch (error) {
      console.error("Failed to fetch itinerary details:", error);
      alert("Failed to load itinerary details.");
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const clearSearch = () => setSearchTerm('');
  
  const handleBackToHome = () => {
    setDetailedViewData(null);
    setCurrentView('home');
  };

  // ==========================================
  // 3. RENDER UI
  // ==========================================
  return (
    <div className="app-wrapper">
      
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
              {isLoading ? 'Searching...' : 'Search Trips'}
            </button>
          </form>
        </div>
      )}

      {isDetailsLoading && (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
            <p style={{ color: '#718096', fontWeight: 'bold' }}>Loading details...</p>
        </div>
      )}
      
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
            setFlightSearchConfig(configData);
            setCurrentView('flightBooking');
          }}
          onShowTrainList={(trainData) => {
            setTrainListData(trainData);
            setCurrentView('trainList');
          }}
          onShowBusList={(busData) => {
            setBusListData(busData);
            setCurrentView('busList');
          }}
          onShowTaxiList={(taxiData) => {
            setTaxiListData(taxiData);
            setCurrentView('taxiList');
          }}
          onShowRentalList={(rentalData) => {
            setRentalListData(rentalData);
            setCurrentView('rentalList');
          }}
          onShowMultiList={(multiData) => {
            setMultiTransportData(multiData);
            setCurrentView('multiTransportList');
          }}
          onShowAdventureList={(advData) => {
            setAdventureData(advData);
            setCurrentView('adventureList');
          }}
        />
      )}

      {/* ... Flight Components ... */}
      {!isDetailsLoading && currentView === 'flightBooking' && (
        <FlightBooking searchConfig={flightSearchConfig} onBack={() => setCurrentView('timeline')} onShowResults={(resultsData) => { setFlightResultsData(resultsData); setCurrentView('flightResults'); }} />
      )}
      {!isDetailsLoading && currentView === 'flightResults' && (
        <FlightResults flights={flightResultsData} onBack={() => setCurrentView('flightBooking')} onSelectFlight={(flight, passengerConfig) => { setSelectedFlightData(flight); setPassengerConfigData(passengerConfig); setCurrentView('flightPricePassenger'); }} />
      )}
      {!isDetailsLoading && currentView === 'flightPricePassenger' && (
        <FlightPricePassenger flight={selectedFlightData} passengerConfig={passengerConfigData} onBack={() => setCurrentView('flightResults')} onConfirmSeats={(seatData, pCount) => { setSeatDataConfig(seatData); setPassengerCount(pCount); setCurrentView('flightSeatBooking'); }} />
      )}
      {!isDetailsLoading && currentView === 'flightSeatBooking' && (
        <FlightSeatBooking seatData={seatDataConfig} maxSeats={passengerCount} onBack={() => setCurrentView('flightPricePassenger')} onConfirmSeatsFinal={(mealConfig) => { setMealConfigData(mealConfig); setCurrentView('flightMealPreference'); }} />
      )}
      {!isDetailsLoading && currentView === 'flightMealPreference' && (
        <FlightMealPreference mealConfig={mealConfigData} onBack={() => setCurrentView('flightSeatBooking')} onSavePreferences={(summaryDataPayload) => { setSummaryData(summaryDataPayload); setCurrentView('flightSummary'); }} />
      )}
      {!isDetailsLoading && currentView === 'flightSummary' && (
        <FlightSummary summaryData={summaryData} onBack={() => setCurrentView('flightMealPreference')} onPaymentSuccess={(confirmDataPayload) => { setConfirmationData(confirmDataPayload); setCurrentView('flightConfirmation'); }} />
      )}
      {!isDetailsLoading && currentView === 'flightConfirmation' && (
        <FlightConfirmation confirmationData={confirmationData} summaryData={summaryData} onHome={() => { setDetailedViewData(null); setCurrentView('home'); }} />
      )}

      {/* Surface Transport Views */}
      {!isDetailsLoading && currentView === 'trainList' && (
        <TrainListMulti trainData={trainListData} onBack={() => setCurrentView('timeline')} onSelectTrain={(train, selectedClass) => { alert(`You selected ${train.name} (${selectedClass.name}).`); }} />
      )}
      {!isDetailsLoading && currentView === 'busList' && (
        <BusListMulti busData={busListData} onBack={() => setCurrentView('timeline')} onSelectBus={(bus) => { alert(`You selected the ${bus.operator} bus.`); }} />
      )}
      {!isDetailsLoading && currentView === 'taxiList' && (
        <TaxiListMulti taxiData={taxiListData} onBack={() => setCurrentView('timeline')} onSelectTaxi={(taxi) => { alert(`You selected a ${taxi.type} from ${taxi.provider}.`); }} />
      )}

      {/* 13. Rental List View (NEW) */}
      {!isDetailsLoading && currentView === 'rentalList' && (
        <RentalBooking 
          rentalData={rentalListData}
          onBack={() => setCurrentView('timeline')}
        />
      )}

      {/* 14. Multi Transport List View (NEW) */}
      {!isDetailsLoading && currentView === 'multiTransportList' && (
        <MultiTransportList 
          transportData={multiTransportData}
          onBack={() => setCurrentView('timeline')}
        />
      )}

      {/* 15. Adventure List View (NEW) */}
      {!isDetailsLoading && currentView === 'adventureList' && (
        <AdventureList 
          htmlContent={adventureData}
          onBack={() => setCurrentView('timeline')}
        />
      )}
      
    </div>
  );
}

export default App;