import React, { useState } from 'react';
import './App.css';
import PricePassenger from './PricePassenger';
import MealPreference from './MealPreference';

// --- MOCK API SERVICE ---
// Simulates the backend interactions described in your requirements
const mockBackend = {
  // 1. Initial Trip Search
  fetchTrips: async () => {
    return new Promise((resolve) => setTimeout(() => {
      resolve([
        { 
          id: 101, 
          title: "The London & Countryside Escape", 
          route: "✈️ JFK ➝ LHR", 
          stops: "2 Stops", 
          duration: "3 Days", 
          hotel: "5★ Hotel", 
          flight: "Business Class", 
          price: "$2,450" 
        },
        { 
          id: 102, 
          title: "Parisian Weekend Getaway", 
          route: "✈️ JFK ➝ CDG", 
          stops: "Non-stop", 
          duration: "2 Days", 
          hotel: "Boutique Stay", 
          flight: "Economy", 
          price: "$1,100" 
        },
        { 
          id: 103, 
          title: "Tokyo Cultural Immersion", 
          route: "✈️ JFK ➝ HND", 
          stops: "1 Stop", 
          duration: "5 Days", 
          hotel: "Ryokan", 
          flight: "Premium Econ", 
          price: "$3,200" 
        }
      ]);
    }, 800));
  },

  // 2. Fetch Specific Itinerary
  fetchItinerary: async (tripId) => {
    return new Promise((resolve) => setTimeout(() => {
      resolve([
        {
          day: "Day 1: Arrival & Exploration",
          id: "day1",
          events: [
            { time: "08:00 AM", icon: "✈️", title: "Flight Departure", desc: "Origin: JFK - New York<br>Destination: LHR - London Heathrow" },
            { time: "04:00 PM", icon: "🚖", title: "Transfer to Hotel", desc: "Pickup from Terminal 5 to City Center Hotel." },
            { time: "05:30 PM", icon: "📸", title: "City Tour (3 Stops)", isList: true, items: ["Walk through the Royal Botanical Gardens", "Photo op at the Palace Gates", "Evening tea at the Historic Square"] },
            { time: "08:00 PM", icon: "🏨", title: "Check-in & Rest", desc: "Back to <em>The Grand Plaza Hotel</em> for the night." }
          ]
        },
        {
          day: "Day 2: Countryside & Return",
          id: "day2",
          events: [
            { time: "09:00 AM", icon: "🚖", title: "Taxi to Countryside", desc: "Drive to the Wine Region (approx. 2 hours)." },
            { time: "12:00 PM", icon: "🍇", title: "Local Experience", isList: true, items: ["Vineyard tour and tasting", "Lunch at a rustic farmhouse", "Visit the ancient village church"] },
            { time: "09:30 PM", icon: "✈️", title: "Flight Home", desc: "Origin: LHR - London Heathrow<br>Destination: JFK - New York" }
          ]
        }
      ]);
    }, 800));
  },

  // 3. Initiate Booking (POST to backend)
  initiateBooking: async (tripId) => {
    console.log(`POST to https://travelapi.myvpn.com/trips/${tripId}/book`);
    return new Promise((resolve) => setTimeout(() => {
      resolve({ success: true, message: "Booking Initialized" });
    }, 600));
  },
  
  // 4. Search Specific Flights (POST to https://travelapi.myvnc.com/flights/search)
  searchFlights: async (searchParams) => {
    console.log("POST https://travelapi.myvnc.com/flights/search", searchParams);
    return new Promise((resolve) => {
      setTimeout(() => {
        // JSON structure matching list_multi_flights.html
        resolve([
          {
            id: "f1",
            airline: "Etihad Airways",
            code: "EY",
            price: "$416.50",
            timeRange: "21:55 - 02:35",
            nextDay: "(+2d)",
            duration: "18h 10m",
            stops: "1 Stop (AUH)",
            segments: [
              {
                depTime: "21:55 JFK", depLoc: "New York T4",
                arrTime: "19:35 AUH", arrLoc: "Abu Dhabi TA",
                meta: "Boeing 787-9 | 12h 40m",
                layover: "1h 25m Layover in Abu Dhabi"
              },
              {
                depTime: "21:00 AUH", depLoc: "Abu Dhabi TA",
                arrTime: "02:35 COK", arrLoc: "Kochi T3",
                meta: "Boeing 737 Max 8 | Operated by Akasa Air",
                isLast: true
              }
            ]
          },
          {
            id: "f2",
            airline: "Kuwait Airways",
            code: "KU",
            price: "$424.00",
            timeRange: "16:55 - 00:35",
            nextDay: "(+2d)",
            duration: "21h 10m",
            stops: "1 Stop (KWI)",
            segments: [
              {
                depTime: "16:55 JFK", depLoc: "New York T7",
                arrTime: "13:05 KWI", arrLoc: "Kuwait T4",
                meta: "Boeing 777-300ER | 12h 10m",
                layover: "3h 55m Layover in Kuwait"
              },
              {
                depTime: "17:00 KWI", depLoc: "Kuwait T4",
                arrTime: "00:35 COK", arrLoc: "Kochi T3",
                meta: "Airbus A320neo | 5h 05m",
                isLast: true
              }
            ]
          },
          {
            id: "f3",
            airline: "Air India",
            code: "AI",
            price: "$468.20",
            timeRange: "12:35 - 19:15",
            nextDay: "(+1d)",
            duration: "20h 10m",
            stops: "1 Stop (BOM)",
            segments: [
              {
                depTime: "12:35 JFK", depLoc: "New York T4",
                arrTime: "13:35 BOM", arrLoc: "Mumbai T2",
                meta: "Boeing 777-300ER | 14h 30m",
                layover: "3h 45m Layover in Mumbai"
              },
              {
                depTime: "17:20 BOM", depLoc: "Mumbai T2",
                arrTime: "19:15 COK", arrLoc: "Kochi T1",
                meta: "Airbus A321 | 1h 55m",
                isLast: true
              }
            ]
          }
        ]);
      }, 1500); // Simulated network delay
    });
  },
  // NEW: Get Passenger/Price info (POST to https://travelapi.myvnc.com/flights/passengers)
  fetchPassengerPriceInfo: async (flightId) => {
    console.log(`POST https://travelapi.myvnc.com/flights/passengers with flightId: ${flightId}`);
    return new Promise((resolve) => setTimeout(() => {
      // Return JSON matching the price_passenger.html needs
      resolve({ 
        basePrice: 416.50,
        currency: "USD",
        flightId: flightId
      });
    }, 800));
  },
  // NEW: POST to https://travelapi.myvnc.com/payments/confirm
  confirmPayment: async (paymentData) => {
    console.log("POST https://travelapi.myvnc.com/payments/confirm", paymentData);
    return new Promise((resolve) => setTimeout(() => {
      resolve({ success: true, bookingRef: "XYZ-123" });
    }, 1000));
  }
};

// --- COMPONENT 1: SearchBasic ---
// The starting point of the app
const SearchBasic = ({ onSearch }) => {
  return (
    <div className="container">
      <h1>Find Your Trip</h1>
      <div className="search-container">
        <form className="search-form" onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
          <div className="input-group">
            <input type="text" className="search-input" placeholder="Search destination (e.g. London)" required />
            <button type="button" className="clear-btn" onClick={(e) => e.target.previousElementSibling.value=''}>×</button>
          </div>
          <button type="submit" className="submit-btn">Find Trips</button>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENT 2: ListItinerary ---
// Displays the available vacation packages
const ListItinerary = ({ results, onViewDetails, onBack }) => {
  return (
    <div className="container">
      <button className="back-link" onClick={onBack}>← Back to Search</button>
      <h1>Available Itineraries</h1>
      
      {results.map((trip) => (
        <div key={trip.id} className="trip-card" onClick={() => onViewDetails(trip.id)}>
          <div className="trip-info">
            <span className="trip-title">{trip.title}</span>
            <div className="trip-route">
              <span>{trip.route}</span>
              <span style={{color:'#cbd5e0'}}>•</span>
              <span>{trip.stops}</span>
            </div>
            <div className="tag-container">
              <span className="tag duration">{trip.duration}</span>
              <span className="tag hotel">{trip.hotel}</span>
              <span className="tag flight">{trip.flight}</span>
            </div>
          </div>
          <div className="trip-action">
            <span className="price">{trip.price}</span>
            <span className="per-person">per person</span>
            <button className="view-btn">View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- COMPONENT 3: ItineraryListTime ---
// Detailed timeline view with "Proceed to Booking" button
const ItineraryListTime = ({ itinerary, onBack, onProceed }) => {
  const [expandedDays, setExpandedDays] = useState(['day1', 'day2']);

  const toggleDay = (dayId) => {
    setExpandedDays(prev => 
      prev.includes(dayId) ? prev.filter(id => id !== dayId) : [...prev, dayId]
    );
  };

  return (
    <div className="container">
      <button className="back-link" onClick={onBack}>← Back to List</button>
      
      {itinerary.map((dayData) => {
        const isOpen = expandedDays.includes(dayData.id);
        return (
          <React.Fragment key={dayData.id}>
            <div className={`day-badge ${isOpen ? 'active' : ''}`} onClick={() => toggleDay(dayData.id)}>
              <span>{dayData.day}</span>
              <span className="toggle-icon">▼</span>
            </div>

            <div className={`timeline-group ${isOpen ? 'show' : ''}`}>
              {dayData.events.map((event, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="time-col">{event.time}</div>
                  <div className="icon-col">
                    <div className="time-icon">{event.icon}</div>
                    <div className="line"></div>
                  </div>
                  <div className="itinerary-card">
                    <span className="card-title">{event.title}</span>
                    <span className="card-detail">
                      {event.isList ? 
                        <ul className="activity-list">{event.items.map((item, i) => <li key={i}>{item}</li>)}</ul> : 
                        <div dangerouslySetInnerHTML={{ __html: event.desc }} />
                      }
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        );
      })}

      <div className="action-footer">
        <button className="btn-proceed" onClick={onProceed}>
          Proceed to Booking
        </button>
      </div>

    </div>
  );
};

// --- COMPONENT 4: FlightBooking ---
// The form shown after clicking "Proceed to Booking"
const FlightBooking = ({ onBack, onSearchFlights }) => {
  return (
    <div className="container">
       <button className="back-link" onClick={onBack}>← Cancel Booking</button>
       <h1>Flight Search</h1>
      
      <div className="search-container">
        <form className="search-form" onSubmit={(e) => { e.preventDefault(); onSearchFlights(); }}>
          
          <datalist id="airport-list">
            <option value="JFK - New York John F. Kennedy" />
            <option value="LHR - London Heathrow" />
            <option value="DXB - Dubai International" />
            <option value="SIN - Singapore Changi" />
            <option value="HND - Tokyo Haneda" />
            <option value="CDG - Paris Charles de Gaulle" />
            <option value="AMS - Amsterdam Schiphol" />
            <option value="FRA - Frankfurt Airport" />
            <option value="SYD - Sydney Kingsford Smith" />
            <option value="DEL - Indira Gandhi International" />
          </datalist>

          <div className="input-group">
            <input type="text" list="airport-list" className="search-input" placeholder="Departure Airport (Type to search)" required />
            <button type="button" className="clear-btn" onClick={(e) => e.target.previousElementSibling.value=''}>×</button>
          </div>

          <div className="input-group">
            <input type="text" list="airport-list" className="search-input" placeholder="Arrival Airport (Type to search)" required />
            <button type="button" className="clear-btn" onClick={(e) => e.target.previousElementSibling.value=''}>×</button>
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
              <input type="number" className="search-input" defaultValue="1" min="1" />
            </div>
            <div className="input-group">
              <label className="floating-label">CHILDREN</label>
              <input type="number" className="search-input" defaultValue="0" min="0" />
            </div>
          </div>

          <div className="input-group">
            <select className="search-input">
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
            <span className="clear-btn" style={{pointerEvents: 'none'}}>▼</span>
          </div>

          <div className="input-group">
            <input type="text" className="search-input" placeholder="Promo Code" />
            <button type="button" className="clear-btn" onClick={(e) => e.target.previousElementSibling.value=''}>×</button>
          </div>

          <button type="submit" className="submit-btn">Search Flights</button>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENT 5: FlightResults ---
// Displays results after searching flights in booking view
const FlightResults = ({ flights, onBack, onSelectFlight }) => {
  const [activeCardId, setActiveCardId] = useState(null);

  const toggleCard = (id) => {
    setActiveCardId(activeCardId === id ? null : id);
  };

  return (
    <div className="container">
      <button className="back-link" onClick={onBack}>← Back to Search</button>
      <h1>Flight Search Results</h1>
      
      <div className="results-container">
        {flights.map((flight) => (
          <div 
            key={flight.id} 
            className={`flight-card ${activeCardId === flight.id ? 'active' : ''}`}
            onClick={() => toggleCard(flight.id)}
          >
            {/* Header */}
            <div className="card-header">
              <div className="route-info">
                <div className="airline-name">{flight.airline} ({flight.code})</div>
                <div className="time-range">{flight.timeRange} <span style={{fontSize:'12px', color:'#a0aec0'}}>{flight.nextDay}</span></div>
                <div className="duration-stops">{flight.duration} | {flight.stops}</div>
              </div>
              <div className="price-action">
                <span className="price">{flight.price}</span>
                <span className="expand-icon">▼ Details</span>
              </div>
            </div>

            {/* Expanded Details */}
            <div className="card-details" onClick={(e) => e.stopPropagation()}>
              {flight.segments.map((seg, index) => (
                <React.Fragment key={index}>
                  <div className={`segment ${seg.isLast ? 'last-segment' : ''}`}>
                    <div className="dot"></div>
                    <div className="segment-detail-row">
                      <span className="seg-time">{seg.depTime}</span>
                      <span className="seg-code">{seg.depLoc}</span>
                    </div>
                    <div className="seg-meta">{seg.meta}</div>
                    
                    <div className="segment-detail-row" style={{marginTop:'15px'}}>
                      <span className="seg-time">{seg.arrTime}</span>
                      <span className="seg-code">{seg.arrLoc}</span>
                    </div>
                    {seg.isLast && <div className="dot end-dot"></div>}
                  </div>
                  
                  {/* Layover Badge */}
                  {seg.layover && (
                    <div className="layover-badge">{seg.layover}</div>
                  )}
                </React.Fragment>
              ))}

              
              <button className="book-btn" onClick={() => onSelectFlight(flight.id)}>Select Flight</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN CONTROLLER ---
function App() {
  // Views: 'search' | 'list' | 'details' | 'booking' | 'flightResults'
  const [view, setView] = useState('search'); 
  const [loading, setLoading] = useState(false);
  const [currentBasePrice, setCurrentBasePrice] = useState(0);
  const [confirmedTravelers, setConfirmedTravelers] = useState([]); // State to store travelers

  // Data Store
  const [tripResults, setTripResults] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState([]);
  const [flightResults, setFlightResults] = useState([]);

  // 1. Home -> List
  const handleSearch = async () => {
    setLoading(true);
    const data = await mockBackend.fetchTrips();
    setTripResults(data);
    setView('list');
    setLoading(false);
  };

  // 2. List -> Details
  const handleViewDetails = async (tripId) => {
    setLoading(true);
    const data = await mockBackend.fetchItinerary(tripId);
    setSelectedItinerary(data);
    setView('details');
    setLoading(false);
  };

  // 3. Details -> Booking Form
  const handleProceedToBooking = async () => {
    setLoading(true);
    // Logic: Perhaps lock the trip ID here
    await mockBackend.initiateBooking(101);
    setView('booking');
    setLoading(false);
  };

  // 4. Booking Form -> Flight Results
  const handleFlightSearch = async () => {
    setLoading(true);
    const data = await mockBackend.searchFlights({ from: 'JFK', to: 'COK' });
    setFlightResults(data);
    setView('flightResults');
    setLoading(false);
  };

  // 5. Flight Results -> Price/Passenger
  const handleSelectFlight = async (flightId) => {
    setLoading(true);
    // 1. Call the new backend method to get pricing for this specific flight
    // (Ensure your mockBackend has fetchPassengerPriceInfo as shown in the previous step)
    const data = await mockBackend.fetchPassengerPriceInfo(flightId);
    // 2. Update state with the returned base price
    setCurrentBasePrice(data.basePrice);
    // 3. Switch the view to 'price' to render PricePassenger.js
    setView('price');
    setLoading(false);
  };

  const handleConfirmPay = async (travelers) => {
    setLoading(true);
    // 1. Call Backend to process payment
    await mockBackend.confirmPayment({ travelers, total: 1000 }); // Mock total
    // 2. Save travelers to state so we can list them in the Meal view
    setConfirmedTravelers(travelers);
    // 3. Switch view
    setView('meal');
    setLoading(false);
  };

  // NEW HANDLER: Save Meals (Final Step)
  const handleSaveMeals = () => {
    alert("Preferences Saved! Booking Complete.");
    // Optionally redirect to home or a success page
    setView('search'); 
  };


  return (
    <div className="app-wrapper">
      {/* Loading Overlay */}
      {loading && (
        <div className="container" style={{justifyContent:'center', height:'80vh'}}>
          <div className="spinner" style={{
            width:'40px', height:'40px', 
            border:'4px solid #f3f3f3', borderTop:'4px solid #718096', 
            borderRadius:'50%', animation:'spin 1s linear infinite'
          }}></div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      
      {/* View Routing */}
      {!loading && view === 'search' && (
        <SearchBasic onSearch={handleSearch} />
      )}
      
      {!loading && view === 'list' && (
        <ListItinerary 
          results={tripResults} 
          onViewDetails={handleViewDetails}
          onBack={() => setView('search')}
        />
      )}

      {!loading && view === 'details' && (
        <ItineraryListTime 
          itinerary={selectedItinerary} 
          onBack={() => setView('list')}
          onProceed={handleProceedToBooking}
        />
      )}

      {!loading && view === 'booking' && (
        <FlightBooking 
          onBack={() => setView('details')}
          onSearchFlights={handleFlightSearch}
        />
      )}

      {/* UPDATE FLIGHT RESULTS to use the new handler */}
       {!loading && view === 'flightResults' && (
        <FlightResults 
          flights={flightResults} 
          onBack={() => setView('booking')}
          onSelectFlight={handleSelectFlight} // <--- Connect here
        />
      )}

      {/* ADD THE NEW COMPONENT VIEW */}
      {!loading && view === 'price' && (
        <PricePassenger 
          basePrice={currentBasePrice}
          onBack={() => setView('flightResults')}
          onConfirm={handleConfirmPay}
        />
      )}

      {/* Render the new MealPreference View */}
        {!loading && view === 'meal' && (
          <MealPreference 
            passengers={confirmedTravelers} 
            onSave={handleSaveMeals}
          />
      )}
    </div>
  );
}

export default App;