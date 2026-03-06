import React, { useState } from 'react';
import './ItineraryTimeline.css';

const ItineraryTimeline = ({ timelineData, onBack, onEventClick }) => {
  // State to manage which days are expanded. 
  // By default, we expand all days on initial load.
  const [expandedDays, setExpandedDays] = useState(
    timelineData ? timelineData.reduce((acc, day) => ({ ...acc, [day.dayId]: true }), {}) : {}
  );

  if (!timelineData || timelineData.length === 0) {
    return <div className="timeline-container">No details available for this trip.</div>;
  }

  // Toggle a specific day's collapsible state
  const toggleDay = (dayId) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayId]: !prev[dayId]
    }));
  };

  // Handle card clicks
  const handleEventClick = (event) => {
    if (onEventClick) {
      onEventClick(event);
    } else {
      console.log('Card clicked:', event.title);
    }
  };

  return (
    <div className="timeline-container">
      <button className="back-btn" onClick={onBack}>
        ← Back to Search Results
      </button>

      {timelineData.map((day) => (
        <div className="day-section" key={day.dayId}>
          {/* Header is now clickable for expanding/collapsing */}
          <div className="day-header" onClick={() => toggleDay(day.dayId)}>
            <span>{day.dayTitle}</span>
            <span className="collapse-icon">
              {expandedDays[day.dayId] ? '▼' : '▶'}
            </span>
          </div>
          
          {/* Conditionally render the events list based on state */}
          {expandedDays[day.dayId] && (
            <div className="events-list">
              {day.events.map((event, index) => (
                <div 
                  className="event-item" 
                  key={index} 
                  onClick={() => handleEventClick(event)}
                >
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
          )}
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;