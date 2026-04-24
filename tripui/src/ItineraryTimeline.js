import React, { useState } from 'react';
import './ItineraryTimeline.css';

const ItineraryTimeline = ({ timelineData, onBack, onEventClick, onShowFlightSearch, onShowTrainList, onShowBusList, onShowTaxiList, onShowRentalList, onShowMultiList }) => {
  const [expandedDays, setExpandedDays] = useState(
    timelineData ? timelineData.reduce((acc, day) => ({ ...acc, [day.dayId]: true }), {}) : {}
  );
  const [loadingEventId, setLoadingEventId] = useState(null);

  if (!timelineData || timelineData.length === 0) {
    return <div className="timeline-container">No details available for this trip.</div>;
  }

  const toggleDay = (dayId) => {
    setExpandedDays((prev) => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  const handleEventClick = async (event) => {
    const titleLower = event.title.toLowerCase();
    const isFlight = titleLower.includes('flight') || event.icon === '✈️';
    const isTrain = titleLower.includes('train') || event.icon === '🚆';
    const isBus = titleLower.includes('bus') || event.icon === '🚌'; 
    const isTaxi = titleLower.includes('taxi') || titleLower.includes('transfer') || event.icon === '🚖';
    const isRental = titleLower.includes('rental') || titleLower.includes('car') || event.icon === '🚗';
    const isMulti = titleLower.includes('multi');

    if (isFlight) {
      // ... existing flight logic ...
      setLoadingEventId(event.id || event.title);
      try {
        const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flights/search', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventId: event.id, title: event.title })
        });
        const searchConfigData = await response.json();
        if (onShowFlightSearch) onShowFlightSearch(searchConfigData);
      } catch (error) { alert("Failed to reach flight API."); } finally { setLoadingEventId(null); }
    } else if (isTrain) {
      // ... existing train logic ...
      setLoadingEventId(event.id || event.title);
      try {
        const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/train/lists', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventId: event.id, title: event.title })
        });
        if (onShowTrainList) onShowTrainList(response.ok ? await response.json() : null);
      } catch (error) { alert("Failed to reach train API."); if (onShowTrainList) onShowTrainList(null); } finally { setLoadingEventId(null); }
    } else if (isBus) {
       // ... existing bus logic ...
      setLoadingEventId(event.id || event.title);
      try {
        const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/bus/lists', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventId: event.id, title: event.title })
        });
        if (onShowBusList) onShowBusList(response.ok ? await response.json() : null);
      } catch (error) { alert("Failed to reach bus API."); if (onShowBusList) onShowBusList(null); } finally { setLoadingEventId(null); }
    } else if (isTaxi) {
      // ... existing taxi logic ...
      setLoadingEventId(event.id || event.title);
      try {
        const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/taxi/list', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventId: event.id, title: event.title })
        });
        if (onShowTaxiList) onShowTaxiList(response.ok ? await response.json() : null);
      } catch (error) { alert("Failed to reach taxi API."); if (onShowTaxiList) onShowTaxiList(null); } finally { setLoadingEventId(null); }
    } else if (isRental) {
      // --- NEW RENTAL API CALL ---
      setLoadingEventId(event.id || event.title);
      try {
        const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/rental/vehicle/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId: event.id, title: event.title })
        });
        
        let rentalData = null;
        const contentType = response.headers.get("content-type");
        // Accommodate JSON or raw HTML string returns gracefully
        if (contentType && contentType.includes("application/json")) {
            rentalData = await response.json();
        } else {
            rentalData = await response.text();
        }

        if (onShowRentalList) onShowRentalList(rentalData);
      } catch (error) {
        console.error("Error initiating rental search:", error);
        alert("Failed to reach rental list API.");
        if (onShowRentalList) onShowRentalList(null); 
      } finally {
        setLoadingEventId(null);
      }
    } else if (isMulti) {
      // --- NEW: Multi Transport API Call ---
      setLoadingEventId(event.id || event.title);
      try {
        const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/transport/list', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId: event.id, title: event.title })
        });
        
        let multiData = null;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            multiData = await response.json();
        } else {
            multiData = await response.text();
        }

        if (onShowMultiList) onShowMultiList(multiData);
      } catch (error) {
        console.error("Error initiating multi transport search:", error);
        alert("Failed to reach multi transport list API.");
        if (onShowMultiList) onShowMultiList(null); 
      } finally {
        setLoadingEventId(null);
      }
    } else {
      if (onEventClick) onEventClick(event);
    }
  };

  return (
    <div className="timeline-container">
      <button className="back-btn" onClick={onBack}>
        ← Back to Search Results
      </button>

      {timelineData.map((day) => (
        <div className="day-section" key={day.dayId}>
          <div className="day-header" onClick={() => toggleDay(day.dayId)}>
            <span>{day.dayTitle}</span>
            <span className="collapse-icon">
              {expandedDays[day.dayId] ? '▼' : '▶'}
            </span>
          </div>
          
          {expandedDays[day.dayId] && (
            <div className="events-list">
              {day.events.map((event, index) => {
                const isLoading = loadingEventId === (event.id || event.title);
                return (
                  <div 
                    className="event-item" 
                    key={index} 
                    onClick={() => handleEventClick(event)}
                    style={{ cursor: 'pointer', opacity: isLoading ? 0.6 : 1 }}
                  >
                    <div className="event-time">{event.time}</div>
                    <div className="event-icon">{event.icon}</div>
                    
                    <div className="event-content">
                      <div className="event-title-row">
                        <span className="event-title">
                           {event.title} {isLoading && '(Loading...)'}
                        </span>
                        <span className={`event-tag ${event.tagClass}`}>
                          {event.tagLabel}
                        </span>
                      </div>
                      <div 
                        className="event-details" 
                        dangerouslySetInnerHTML={{ __html: event.details }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;