import React, { useState, useMemo } from 'react';
import './LocalToursList.css'; // Make sure to adapt ActivityList.css styles to this file

// Mocked data replacing the raw HTML fetch. 
// If your API returns JSON, you can swap this back to a fetch() call inside a useEffect.
const toursData = [
  {
    id: 1,
    title: "Downtown Historic Walking Tour",
    type: "Walking",
    badge: "Bestseller",
    price: "$25",
    image: "https://via.placeholder.com/400x250/2b6cb0/ffffff?text=Walking+Tour",
    desc: "Explore the rich history and architecture of the downtown district with an expert local guide.",
    duration: "2 Hours",
    meetingPoint: "City Hall Plaza",
    inclusions: "Guided tour, Bottled water, Commemorative map",
    safety: "Wear comfortable walking shoes.",
    mapLink: "https://maps.google.com/?q=City+Hall+Plaza"
  },
  {
    id: 2,
    title: "Sunset Harbor Cruise",
    type: "Boat",
    badge: "Scenic",
    price: "$45",
    image: "https://via.placeholder.com/400x250/ed8936/ffffff?text=Harbor+Cruise",
    desc: "Relax on a stunning evening cruise along the harbor with live music and breathtaking skyline views.",
    duration: "1.5 Hours",
    meetingPoint: "Pier 4",
    inclusions: "Boat entry, Live entertainment, 1 Complimentary drink",
    safety: "Arrive 15 minutes early for boarding.",
    mapLink: "https://maps.google.com/?q=Pier+4"
  },
  {
    id: 3,
    title: "Culinary Tasting Adventure",
    type: "Food",
    badge: "Foodie",
    price: "$65",
    image: "https://via.placeholder.com/400x250/ecc94b/ffffff?text=Food+Tour",
    desc: "Taste your way through the city's most iconic eateries, hidden cafes, and local markets.",
    duration: "3 Hours",
    meetingPoint: "Central Market Main Entrance",
    inclusions: "5 Food tastings, Local guide, Recipe booklet",
    safety: "Please inform us of any food allergies in advance.",
    mapLink: "https://maps.google.com/?q=Central+Market"
  }
];

const LocalToursList = ({ tourData, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [expandedDetails, setExpandedDetails] = useState({});
  const [bookedTours, setBookedTours] = useState({});

  // Filtering Logic based on ActivityList.js
  const filteredTours = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return toursData.filter(tour => {
      const textMatch = tour.title.toLowerCase().includes(term) || tour.badge.toLowerCase().includes(term);
      const catMatch = currentCategory === 'All' || tour.type === currentCategory;
      return textMatch && catMatch;
    });
  }, [searchTerm, currentCategory]);

  const toggleDetails = (id) => {
    setExpandedDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBookTour = (id, title) => {
    setBookedTours(prev => ({ ...prev, [id]: true }));
    alert(`"${title}" has been added to your itinerary!`);
  };

  return (
    <div className="activity-wrapper">
      <div className="activity-header-bar">
        <button className="activity-back-btn" onClick={onClose}>
          ← Back to Main Menu
        </button>
      </div>

      <div className="activity-container">
        <h1>🎟️ Local Tours {tourData?.title ? `in ${tourData.title}` : ''}</h1>
        <div className="activity-subtitle">Discover and book the best local experiences and guided tours.</div>

        <div className="activity-controls-wrapper">
          <input 
            type="text" 
            className="activity-search-input" 
            placeholder="Search 'Walking', 'Cruise', 'Food'..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="activity-filter-row">
            {['All', 'Walking', 'Boat', 'Food'].map(category => (
              <button 
                key={category}
                className={`activity-filter-btn ${currentCategory === category ? 'active' : ''}`} 
                onClick={() => setCurrentCategory(category)}
              >
                {category === 'Walking' ? 'Walking Tours' : 
                 category === 'Boat' ? 'Boat & Water' : 
                 category === 'Food' ? 'Food & Drink' : 'All'}
              </button>
            ))}
          </div>
        </div>

        <div className="activity-grid">
          {filteredTours.length === 0 ? (
            <div className="activity-no-results">
              <p>No tours found matching your criteria.</p>
            </div>
          ) : (
            filteredTours.map(tour => {
              const isExpanded = !!expandedDetails[tour.id];
              const isBooked = !!bookedTours[tour.id];

              return (
                <div className="activity-place-card" key={tour.id}>
                  <div className="activity-img-container">
                    {tour.image ? (
                      <img src={tour.image} alt={tour.title} className="activity-place-img" />
                    ) : (
                      <div className="activity-no-image-placeholder">
                        <span className="activity-camera-icon">📷</span>
                        <span>No Image Available</span>
                      </div>
                    )}
                    <div className="activity-free-badge" style={{ backgroundColor: '#2f855a' }}>
                      {tour.price}
                    </div>
                    <div className="activity-type-badge">{tour.badge}</div>
                  </div>
                  
                  <div className="activity-card-content">
                    <div className="activity-place-title">{tour.title}</div>
                    <div className="activity-place-desc">{tour.desc}</div>

                    <div className="activity-info-grid">
                      <div className="activity-info-item">
                        <span className="activity-info-icon">⏱️</span> {tour.duration}
                      </div>
                      <div className="activity-info-item">
                        <span className="activity-info-icon">📍</span> {tour.meetingPoint}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="activity-details-container">
                        <div className="activity-details-inner">
                          <div className="activity-detail-row">
                            <span className="activity-detail-label">📍 Map:</span>
                            <a href={tour.mapLink} target="_blank" rel="noreferrer" className="activity-map-link">
                              🗺️ View Meeting Point ↗
                            </a>
                          </div>
                          <div className="activity-detail-row">
                            <span className="activity-detail-label">✅ Inclusions:</span> {tour.inclusions}
                          </div>
                          <div className="activity-detail-row">
                            <span className="activity-detail-label">🛡️ Note:</span>
                            <span className="activity-safety-alert">{tour.safety}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="activity-card-footer">
                      <button 
                        className="activity-expand-btn" 
                        onClick={() => toggleDetails(tour.id)}
                        style={{ backgroundColor: isExpanded ? "#f7fafc" : "transparent" }}
                      >
                        {isExpanded ? "Hide Details ▲" : "Show Details ▼"}
                      </button>
                      <button 
                        className="activity-add-btn" 
                        disabled={isBooked}
                        onClick={() => handleBookTour(tour.id, tour.title)}
                        style={{ backgroundColor: isBooked ? "#a0aec0" : "#3182ce" }}
                      >
                        {isBooked ? "Booked" : "Book Tour"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalToursList;