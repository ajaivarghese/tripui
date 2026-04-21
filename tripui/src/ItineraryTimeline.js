// ItineraryTimeline.js
import React, { useState } from 'react';
import './ItineraryTimeline.css';

const ItineraryTimeline = ({ timelineData, onBack, onEventClick, onShowFlightSearch, onShowTrainList, onShowBusList, onShowTaxiList }) => {
  const [expandedDays, setExpandedDays] = useState(
    timelineData ? timelineData.reduce((acc, day) => ({ ...acc, [day.dayId]: true }), {}) : {}
  );
  const [loadingEventId, setLoadingEventId] = useState(null);

  if (!timelineData || timelineData.length === 0) {
    return <div className="timeline-container">No details available for this trip.</div>;
  }

  const toggleDay = (dayId) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayId]: !prev[dayId]
    }));
  };

  const handleEventClick = async (event) => {
    const titleLower = event.title.toLowerCase();
    const isFlight = titleLower.includes('flight') || event.icon === '✈️';
    const isTrain = titleLower.includes('train') || event.icon === '🚆';
    const isBus = titleLower.includes('bus') || event.icon === '🚌'; 
    const isTaxi = titleLower.includes('taxi') || titleLower.includes('transfer') || event.icon === '🚖'; // --- NEW TAXI LOGIC ---

    if (isFlight) {
      setLoadingEventId(event.id || event.title);
      try {
        console.log('POST to https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flights/search');
        const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flights/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId: event.id, title: event.title })
        });
        const searchConfigData = await response.json();
        if (onShowFlightSearch) onShowFlightSearch(searchConfigData);
      } catch (error) {
        console.error("Error initiating flight search:", error);
        alert("Failed to reach flight search API.");
      } finally {
        setLoadingEventId(null);
      }
    } else if (isTrain) {
      setLoadingEventId(event.id || event.title);
      try {
        console.log('POST to https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/train/lists');
        const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/train/lists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId: event.id, title: event.title })
        });
        
        let trainListData = null;
        if(response.ok) {
           trainListData = await response.json();
        }
        
        if (onShowTrainList) onShowTrainList(trainListData);

      } catch (error) {
        console.error("Error initiating train search:", error);
        alert("Failed to reach train list API. Loading default data.");
        if (onShowTrainList) onShowTrainList(null); 
      } finally {
        setLoadingEventId(null);
      }
    } else if (isBus) {
      setLoadingEventId(event.id || event.title);
      try {
        console.log('POST to https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/bus/lists');
        const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/bus/lists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId: event.id, title: event.title })
        });
        
        let busListData = null;
        if(response.ok) {
           busListData = await response.json();
        }
        
        if (onShowBusList) onShowBusList(busListData);

      } catch (error) {
        console.error("Error initiating bus search:", error);
        alert("Failed to reach bus list API. Loading default data.");
        if (onShowBusList) onShowBusList(null); 
      } finally {
        setLoadingEventId(null);
      }
    } else if (isTaxi) {
      // --- NEW TAXI API CALL ---
      setLoadingEventId(event.id || event.title);
      try {
        console.log('POST to https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/taxi/list');
        const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/taxi/list', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId: event.id, title: event.title })
        });
        
        let taxiListData = null;
        if(response.ok) {
           taxiListData = await response.json();
        }
        
        if (onShowTaxiList) onShowTaxiList(taxiListData);

      } catch (error) {
        console.error("Error initiating taxi search:", error);
        alert("Failed to reach taxi list API. Loading default data.");
        if (onShowTaxiList) onShowTaxiList(null); 
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