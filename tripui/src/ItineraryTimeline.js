// ItineraryTimeline.js
import React from 'react';
import './ItineraryTimeline.css';

const ItineraryTimeline = ({ timelineData, onBack }) => {
  if (!timelineData || timelineData.length === 0) {
    return <div className="timeline-container">No details available for this trip.</div>;
  }

  return (
    <div className="timeline-container">
      <button className="back-btn" onClick={onBack}>
        ← Back to Search Results
      </button>

      {timelineData.map((day) => (
        <div className="day-section" key={day.dayId}>
          <div className="day-header">{day.dayTitle}</div>
          
          <div className="events-list">
            {day.events.map((event, index) => (
              <div className="event-item" key={index}>
                <div className="event-time">{event.time}</div>
                <div className="event-icon">{event.icon}</div>
                
                <div className="event-content">
                  <div className="event-title-row">
                    <span className="event-title">{event.title}</span>
                    <span className={`event-tag ${event.tagClass}`}>
                      {event.tagLabel}
                    </span>
                  </div>
                  {/* Safely inject HTML details from the JSON */}
                  <div 
                    className="event-details" 
                    dangerouslySetInnerHTML={{ __html: event.details }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;