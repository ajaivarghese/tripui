import React from 'react';
import './SearchBar.css'; // Uses the same CSS file

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

const FlightResult = ({ data }) => {
  if (!data || !data.data || data.data.length === 0) return null;

  const offer = data.data[0];
  const itinerary = offer.itineraries[0];
  const dictionaries = data.dictionaries;

  return (
    <div className="flight-card">
      {/* --- Header --- */}
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

      {/* --- Body --- */}
      <div className="flight-body">
        {itinerary.segments.map((segment, index) => {
          const dep = formatDateTime(segment.departure.at);
          const arr = formatDateTime(segment.arrival.at);
          const carrierName = dictionaries.carriers[segment.carrierCode];
          const operatingCarrier = segment.operating ? dictionaries.carriers[segment.operating.carrierCode] : null;
          const aircraft = dictionaries.aircraft[segment.aircraft.code];

          return (
            <React.Fragment key={segment.id || index}>
              
              {/* Layover Separator */}
              {index > 0 && (
                 <div className="layover-badge">
                    Change Planes at {segment.departure.iataCode}
                 </div>
              )}

              <div className="segment-row">
                {/* Time & Date */}
                <div className="time-box">
                  <div className="time">{dep.time}</div>
                  <div className="date">{dep.date}</div>
                  <div style={{ height: '20px' }}></div>
                  <div className="time">{arr.time}</div>
                  <div className="date">{arr.date}</div>
                </div>

                {/* Flight Details */}
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
  );
};

export default FlightResult;