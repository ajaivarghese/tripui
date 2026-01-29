import React, { useState } from 'react';
import './AdventureActivitySingle.css';

const AdventureActivitySingle = ({ activityData, onBack }) => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isBooking, setIsBooking] = useState(false);

  const hasImages = activityData.images && activityData.images.length > 0;

  // Carousel Logic
  const changeSlide = (direction) => {
    const len = activityData.images.length;
    setCurrentSlideIdx((prev) => (prev + direction + len) % len);
  };

  // Badge Logic
  let badgeClass = 'diff-easy';
  if (activityData.difficulty === 'Moderate') badgeClass = 'diff-mod';
  if (activityData.difficulty === 'Hard') badgeClass = 'diff-hard';

  // Booking Logic
  const handleBookActivity = async () => {
    setIsBooking(true);
    try {
        console.log(`POST to https://travelapi.myvnc.com/adventure/book for ID: ${activityData.id}`);
        // Simulate API call
        // await fetch('https://travelapi.myvnc.com/adventure/book', { method: 'POST', body: JSON.stringify({id: activityData.id}) });
        
        setTimeout(() => {
            alert('Booking confirmed! Get ready for your adventure.');
            setIsBooking(false);
        }, 1000);
    } catch (error) {
        console.error("Booking failed", error);
        alert("Booking failed. Please try again.");
        setIsBooking(false);
    }
  };

  return (
    <>
    <div className="single-container">
      {/* Back Button */}
      <div className="back-btn-wrapper">
        <button className="back-btn" onClick={onBack}>← Back</button>
      </div>

      {/* HERO SECTION */}
      <div className="hero">
        {hasImages ? (
          <>
            <div className="carousel-container">
              {activityData.images.map((imgUrl, index) => (
                <div 
                  key={index} 
                  className={`carousel-slide ${index === currentSlideIdx ? 'active' : ''}`}
                >
                  <img src={imgUrl} className="hero-img" alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </div>
            
            {activityData.images.length > 1 && (
              <>
                <button className="carousel-btn prev-btn" onClick={() => changeSlide(-1)}>&#10094;</button>
                <button className="carousel-btn next-btn" onClick={() => changeSlide(1)}>&#10095;</button>
              </>
            )}
          </>
        ) : (
          <div className="no-image-hero">
            <span style={{ fontSize: '40px' }}>📷</span>
            <span style={{ fontWeight: 600, marginTop: '10px' }}>No Image Available</span>
          </div>
        )}

        <div className="hero-overlay">
          <h1 className="activity-title">{activityData.title}</h1>
          <div className="activity-loc">📍 {activityData.location}</div>
        </div>
        <div className={`single-diff-badge ${badgeClass}`}>{activityData.difficulty}</div>
      </div>

      {/* STATS BAR */}
      <div className="single-stats-bar">
        <div className="single-stat-box">
            <span className="single-stat-icon">⏱</span>
            <span className="single-stat-label">Duration</span>
            <div className="single-stat-val">{activityData.duration}</div>
        </div>
        <div className="single-stat-box">
            <span className="single-stat-icon">👥</span>
            <span className="single-stat-label">Group</span>
            <div className="single-stat-val">{activityData.groupSize}</div>
        </div>
        <div className="single-stat-box">
            <span className="single-stat-icon">⛰</span>
            <span className="single-stat-label">Altitude</span>
            <div className="single-stat-val">{activityData.altitude || 'N/A'}</div>
        </div>
        <div className="single-stat-box">
            <span className="single-stat-icon">🎂</span>
            <span className="single-stat-label">Min Age</span>
            <div className="single-stat-val">{activityData.ageLimit}</div>
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="content-pad">
        <div className="section-title">Overview</div>
        <p className="desc-text">{activityData.description}</p>

        <div className="section-title">Itinerary</div>
        <div className="timeline">
          {activityData.itinerary && activityData.itinerary.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="time-stamp">{item.time}</span>
              <div className="step-title">{item.title}</div>
              <div className="step-desc">{item.desc}</div>
            </div>
          ))}
        </div>

        <br />
        <div className="section-title">What to Bring</div>
        <div className="essentials-grid">
          {activityData.essentials && activityData.essentials.map((item, idx) => (
            <div key={idx} className="essential-item">{item}</div>
          ))}
        </div>
      </div>
    </div>

    {/* STICKY FOOTER */}
    <div className="sticky-footer">
      <div className="footer-price-display">
        <span className="footer-price-lbl">Total Price</span>
        <span className="footer-price-val">{activityData.price}</span>
      </div>
      <button className="single-book-btn" onClick={handleBookActivity} disabled={isBooking}>
        {isBooking ? 'Processing...' : 'Book Activity'}
      </button>
    </div>
    </>
  );
};

export default AdventureActivitySingle;

/*  Add to App.js
import React, { useState } from 'react';
import AdventureActivityList from './AdventureActivityList';
import AdventureActivitySingle from './AdventureActivitySingle';

function App() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedActivityData, setSelectedActivityData] = useState(null);

  // Called when user clicks "Book Now" in the list view
  const handleSelectActivity = (data) => {
    setSelectedActivityData(data);
    setCurrentView('single');
    // Scroll to top when switching views
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentView('list');
    setSelectedActivityData(null);
  };

  return (
    <div className="App">
      {currentView === 'list' && (
        <AdventureActivityList onSelectActivity={handleSelectActivity} />
      )}
      
      {currentView === 'single' && selectedActivityData && (
        <AdventureActivitySingle 
          activityData={selectedActivityData} 
          onBack={handleBack} 
        />
      )}
    </div>
  );
}

export default App;
*/