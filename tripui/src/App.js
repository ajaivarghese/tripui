import React, { useState } from "react";
import "./App.css";

// --- SUB-COMPONENT: Search Form ---
const FlightSearch = ({ onSearch, isLoading }) => {
  const [formData, setFormData] = useState({
    departure: "",
    arrival: "",
    departureDate: "",
    returnDate: "",
    adults: 1,
    children: 0,
    travelClass: "economy",
    promoCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <div class="search-container">
      <form class="search-form" onSubmit={handleSubmit}>
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

        {/* Departure */}
        <div class="input-group">
          <input
            type="text"
            list="airport-list"
            name="departure"
            class="search-input"
            placeholder="Departure Airport (Type to search)"
            value={formData.departure}
            onChange={handleChange}
            required
          />
          {formData.departure && (
            <button type="button" class="clear-btn" onClick={() => clearField("departure")}>
              ×
            </button>
          )}
        </div>

        {/* Arrival */}
        <div class="input-group">
          <input
            type="text"
            list="airport-list"
            name="arrival"
            class="search-input"
            placeholder="Arrival Airport (Type to search)"
            value={formData.arrival}
            onChange={handleChange}
            required
          />
          {formData.arrival && (
            <button type="button" class="clear-btn" onClick={() => clearField("arrival")}>
              ×
            </button>
          )}
        </div>

        {/* Dates */}
        <div class="split-row">
          <div class="input-group">
            <input
              type="text"
              name="departureDate"
              class="search-input"
              placeholder="Departure Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value={formData.departureDate}
              onChange={handleChange}
            />
          </div>
          <div class="input-group">
            <input
              type="text"
              name="returnDate"
              class="search-input"
              placeholder="Return Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value={formData.returnDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Passengers */}
        <div class="split-row">
          <div class="input-group">
            <label htmlFor="adults" class="input-label">ADULTS</label>
            <input
              type="number"
              id="adults"
              name="adults"
              class="search-input number-input"
              min="1"
              value={formData.adults}
              onChange={handleChange}
            />
          </div>
          <div class="input-group">
            <label htmlFor="children" class="input-label">CHILDREN</label>
            <input
              type="number"
              id="children"
              name="children"
              class="search-input number-input"
              min="0"
              value={formData.children}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Class */}
        <div class="input-group">
          <select
            name="travelClass"
            class="search-input"
            value={formData.travelClass}
            onChange={handleChange}
          >
            <option value="economy">Economy</option>
            <option value="premium_economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
          <span class="clear-btn dropdown-arrow">▼</span>
        </div>

        {/* Promo */}
        <div class="input-group">
          <input
            type="text"
            name="promoCode"
            class="search-input"
            placeholder="Promo Code"
            value={formData.promoCode}
            onChange={handleChange}
          />
          {formData.promoCode && (
            <button type="button" class="clear-btn" onClick={() => clearField("promoCode")}>
              ×
            </button>
          )}
        </div>

        <button type="submit" class="submit-btn" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search Flights"}
        </button>
      </form>
    </div>
  );
};

// --- SUB-COMPONENT: Single Flight Card ---
const FlightCard = ({ flight }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div class={`flight-card ${isOpen ? "active" : ""}`}>
      <div class="card-header" onClick={() => setIsOpen(!isOpen)}>
        <div class="route-info">
          <div class="airline-name">
            {flight.airline} ({flight.airlineCode})
          </div>
          <div class="time-range">
            {flight.timeRange}
            {flight.dayOffset && <span class="day-offset"> ({flight.dayOffset})</span>}
          </div>
          <div class="duration-stops">
            {flight.totalDuration} | {flight.stopSummary}
          </div>
        </div>
        <div class="price-action">
          <span class="price">
            {flight.currency}{flight.price.toFixed(2)}
          </span>
          <span class="expand-icon">▼ Details</span>
        </div>
      </div>

      {isOpen && (
        <div class="card-details" style={{ display: "block" }}>
          {flight.segments.map((segment, index) => {
            if (segment.type === "layover") {
              return (
                <div key={index} class="layover-badge">
                  {segment.duration} Layover in {segment.location}
                </div>
              );
            }

            // Determine if this is the last segment to apply special CSS
            // The last item in the array is usually a flight, so we check if it's the last index
            const isLast = index === flight.segments.length - 1;

            return (
              <div key={index} class={`segment ${isLast ? "last-segment" : ""}`}>
                <div class="dot"></div>
                
                {/* Departure Row */}
                <div class="segment-detail-row">
                  <span class="seg-time">{segment.depTime} {segment.depCode}</span>
                  <span class="seg-code">{segment.depDesc}</span>
                </div>
                
                {/* Meta info shown in the middle of the line */}
                <div class="seg-meta">{segment.meta}</div>

                {/* Arrival Row */}
                <div class="segment-detail-row" style={{ marginTop: "15px" }}>
                  <span class="seg-time">{segment.arrTime} {segment.arrCode}</span>
                  <span class="seg-code">{segment.arrDesc}</span>
                </div>

                {isLast && <div class="dot end-dot"></div>}
              </div>
            );
          })}

          <button class="book-btn">Select Flight</button>
        </div>
      )}
    </div>
  );
};

// --- MAIN COMPONENT: App ---
function App() {
  const [view, setView] = useState("search"); // 'search' or 'results'
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://travelapi.myvnc.com/flight/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }

      const data = await response.json();
      
      // Assuming api returns { flights: [...] }
      setFlights(data.flights || []);
      setView("results");
    } catch (err) {
      console.error(err);
      setError("Unable to find flights. Please try again later.");
      // For demo purposes, we can optionally switch to view even if empty
      // setView("results"); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setView("search");
    setFlights([]);
    setError(null);
  };

  return (
    <div className="App">
      {view === "search" && (
        <>
          <FlightSearch onSearch={handleSearch} isLoading={isLoading} />
          {error && <div style={{textAlign: "center", color: "red"}}>{error}</div>}
        </>
      )}

      {view === "results" && (
        <div class="results-wrapper">
          <div class="results-container">
            <button class="back-btn" onClick={handleBack}>← Back to Search</button>
            
            {flights.length === 0 ? (
              <div style={{textAlign:"center", padding: "20px"}}>No flights found.</div>
            ) : (
              flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;