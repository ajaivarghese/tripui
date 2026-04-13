import React from 'react';
import './styles.css'; // Import the CSS file created above

// The provided JSON Data
const flightData = {
  "meta": { "count": 1 },
  "data": [
    {
      "type": "flight-offer",
      "id": "1",
      "itineraries": [
        {
          "duration": "PT18H10M",
          "segments": [
            {
              "departure": { "iataCode": "JFK", "at": "2026-02-03T21:55:00", "terminal": "4" },
              "arrival": { "iataCode": "AUH", "at": "2026-02-04T19:35:00", "terminal": "A" },
              "carrierCode": "EY",
              "number": "4",
              "aircraft": { "code": "789" },
              "duration": "PT12H40M"
            },
            {
              "departure": { "iataCode": "AUH", "at": "2026-02-04T21:00:00", "terminal": "A" },
              "arrival": { "iataCode": "COK", "at": "2026-02-05T02:35:00", "terminal": "3" },
              "carrierCode": "EY",
              "operating": { "carrierCode": "QP" },
              "number": "1018",
              "aircraft": { "code": "7M8" },
              "duration": "PT4H5M"
            }
          ]
        }
      ],
      "price": {
        "currency": "USD",
        "grandTotal": "359.50"
      }
    }
  ],
  "dictionaries": {
    "locations": {
      "AUH": { "cityCode": "AUH", "countryCode": "AE" },
      "JFK": { "cityCode": "NYC", "countryCode": "US" },
      "COK": { "cityCode": "COK", "countryCode": "IN" }
    },
    "aircraft": {
      "7M8": "BOEING 737 MAX 8",
      "789": "BOEING 787-9"
    },
    "carriers": {
      "EY": "ETIHAD AIRWAYS",
      "QP": "AKASA AIR"
    }
  }
};

// Helper: Format Duration (PT18H10M -> 18h 10m)
const formatDuration = (ptString) => {
  if (!ptString) return "";
  return ptString.replace("PT", "").toLowerCase().replace("h", "h ").replace("m", "m");
};

// Helper: Format Date/Time
const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return {
    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  };
};

const FlightResult = () => {
  const offer = flightData.data[0];
  const itinerary = offer.itineraries[0];
  const dictionaries = flightData.dictionaries;

  return (
    <div className="search-container">
      
      {/* --- FLIGHT CARD --- */}
      <div className="flight-card">
        
        {/* Header: Price & Total Duration */}
        <div className="flight-header">
          <div className="flight-route-summary">
             {itinerary.segments[0].departure.iataCode} ➝ {itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}
             <span style={{ marginLeft: '10px', fontSize: '14px', opacity: 0.8 }}>
               ({formatDuration(itinerary.duration)})
             </span>
          </div>
          <div className="flight-price">
            {offer.price.currency} {offer.price.grandTotal}
          </div>
        </div>

        {/* Body: Segments */}
        <div className="flight-body">
          {itinerary.segments.map((segment, index) => {
            const dep = formatDateTime(segment.departure.at);
            const arr = formatDateTime(segment.arrival.at);
            const carrierName = dictionaries.carriers[segment.carrierCode];
            const operatingCarrier = segment.operating ? dictionaries.carriers[segment.operating.carrierCode] : null;
            const aircraft = dictionaries.aircraft[segment.aircraft.code];

            return (
              <React.Fragment key={segment.id || index}>
                
                {/* Visual Separator for Layover */}
                {index > 0 && (
                   <div className="layover-badge">
                      Change Planes at {segment.departure.iataCode}
                   </div>
                )}

                <div className="segment-row">
                  {/* Left: Time & Date */}
                  <div className="time-box">
                    <div className="time">{dep.time}</div>
                    <div className="date">{dep.date}</div>
                    <div style={{ height: '20px' }}></div> {/* Spacer */}
                    <div className="time">{arr.time}</div>
                    <div className="date">{arr.date}</div>
                  </div>

                  {/* Right: Details */}
                  <div className="segment-details">
                    <div className="duration-info">
                       Duration: {formatDuration(segment.duration)}
                    </div>
                    
                    <div>
                      <span className="airport-code">{segment.departure.iataCode}</span>
                      {' ➝ '}
                      <span className="airport-code">{segment.arrival.iataCode}</span>
                    </div>

                    <div className="airline-info">
                      <strong>{carrierName}</strong> 
                      {operatingCarrier && operatingCarrier !== carrierName && ` (Operated by ${operatingCarrier})`}
                    </div>
                    <div className="airline-info">
                       Flight {segment.carrierCode} {segment.number} • {aircraft}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlightResult;