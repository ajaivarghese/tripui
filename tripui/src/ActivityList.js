import React, { useState, useMemo } from 'react';
import './ActivityList.css';

// Extracted data from activities_free_list.html[cite: 3]
const activitiesData = [
  {
    id: 1,
    title: "Crystal Cascade Falls",
    type: "Water",
    badge: "Waterfall",
    image: "https://via.placeholder.com/400x250/2b6cb0/ffffff?text=Waterfall",
    desc: "A hidden gem located 30 mins from the city. Perfect for a refreshing dip.",
    facilities: ["🚻 Public Toilet", "🅿️ Free Parking"],
    transport: "Bus #402 (Stop: Green Valley)",
    reach: "Follow the marked trail for 15 mins from the bus stop. The path is well-paved.",
    safety: "Rocks are slippery. No lifeguard on duty.",
    amenities: "Small snack shack at the entrance.",
    mapLink: "https://maps.google.com/?q=Crystal+Cascade+Falls"
  },
  {
    id: 2,
    title: "Sunset Peak Lookout",
    type: "Landmark",
    badge: "Viewpoint",
    image: "https://via.placeholder.com/400x250/ed8936/ffffff?text=Viewpoint",
    desc: "The highest point in the district offering 360-degree panoramic city views.",
    facilities: ["🔭 Free Telescope", "🪑 Seating Area"],
    transport: "Metro Line A (Station: Hilltop)",
    reach: "Walk 10 mins uphill from Hilltop Station. Wheelchair accessible ramp available.",
    safety: "High winds possible. Railings are secure.",
    amenities: "Cafe and souvenir shop nearby.",
    mapLink: "https://maps.google.com/?q=Sunset+Peak+Lookout"
  },
  {
    id: 3,
    title: "Golden Sands Beach",
    type: "Water",
    badge: "Beach",
    image: "https://via.placeholder.com/400x250/ecc94b/ffffff?text=Beach",
    desc: "A wide stretch of sandy beach ideal for picnics, volleyball, and swimming.",
    facilities: ["🚿 Outdoor Showers", "🚻 Changing Rooms"],
    transport: "Bus #101 or #105",
    reach: "Direct access from the Coastal Road bus stop.",
    safety: "⚠️ Swim only in flagged areas. Strong currents.",
    amenities: "BBQ pits available (First come first serve).",
    mapLink: "https://maps.google.com/?q=Golden+Sands+Beach"
  },
  {
    id: 4,
    title: "Ancient Fort Ruins",
    type: "Landmark",
    badge: "Monument",
    image: "", 
    desc: "Historical ruins from the 18th century. Great for photography and history buffs.",
    facilities: ["ℹ️ Info Plaques", "🗑️ Dustbins"],
    transport: "Train (Station: Old Town)",
    reach: "5 min walk from Old Town station. Look for the brown heritage signs.",
    safety: "Uneven ground. Do not climb on walls.",
    amenities: "Water fountain near the main gate.",
    mapLink: "https://maps.google.com/?q=Ancient+Fort+Ruins"
  },
  {
    id: 5,
    title: "Whispering Woods Trail",
    type: "Nature",
    badge: "Nature Walk",
    image: "https://via.placeholder.com/400x250/48bb78/ffffff?text=Forest+Path",
    desc: "A gentle 5km loop through dense pine forests. Quiet and serene.",
    facilities: ["🗺️ Map Boards", "🪑 Benches"],
    transport: "Car/Taxi recommended",
    reach: "Park at the North Gate. Trailhead starts behind the ranger station.",
    safety: "Stay on path. Wildlife may be present.",
    amenities: "None inside. Bring your own water.",
    mapLink: "https://maps.google.com/?q=Whispering+Woods+Trail"
  }
];

const ActivityList = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [expandedDetails, setExpandedDetails] = useState({});
  const [addedActivities, setAddedActivities] = useState({});

  // Filtering Logic[cite: 3]
  const filteredActivities = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return activitiesData.filter(act => {
      const textMatch = act.title.toLowerCase().includes(term) || act.badge.toLowerCase().includes(term);
      const catMatch = currentCategory === 'All' || act.type === currentCategory;
      return textMatch && catMatch;
    });
  }, [searchTerm, currentCategory]);

  const toggleDetails = (id) => {
    setExpandedDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddActivity = (id, title) => {
    setAddedActivities(prev => ({ ...prev, [id]: true }));
    alert(`"${title}" has been added to your plan!`);
  };

  return (
    <div className="activity-wrapper">
      {/* Structural layout modeled after AdventureList.js[cite: 4] */}
      <div className="activity-header-bar">
        <button className="activity-back-btn" onClick={onBack}>
          ← Back to Timeline
        </button>
      </div>

      <div className="activity-container">
        <h1>🍃 Free to Explore</h1>
        <div className="activity-subtitle">Discover attractions that don't cost a dime. No booking needed.</div>

        <div className="activity-controls-wrapper">
          <input 
            type="text" 
            className="activity-search-input" 
            placeholder="Search 'Waterfall', 'Beach', 'Viewpoint'..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="activity-filter-row">
            {['All', 'Nature', 'Water', 'Landmark'].map(category => (
              <button 
                key={category}
                className={`activity-filter-btn ${currentCategory === category ? 'active' : ''}`} 
                onClick={() => setCurrentCategory(category)}
              >
                {category === 'Nature' ? 'Nature Walks' : 
                 category === 'Water' ? 'Waterfalls & Beaches' : 
                 category === 'Landmark' ? 'Monuments & Views' : 'All'}
              </button>
            ))}
          </div>
        </div>

        <div className="activity-grid">
          {filteredActivities.length === 0 ? (
            <div className="activity-no-results">
              <p>No activities found matching your criteria.</p>
            </div>
          ) : (
            filteredActivities.map(act => {
              const isExpanded = !!expandedDetails[act.id];
              const isAdded = !!addedActivities[act.id];

              return (
                <div className="activity-place-card" key={act.id}>
                  <div className="activity-img-container">
                    {act.image ? (
                      <img src={act.image} alt={act.title} className="activity-place-img" />
                    ) : (
                      <div className="activity-no-image-placeholder">
                        <span className="activity-camera-icon">📷</span>
                        <span>No Image Available</span>
                      </div>
                    )}
                    <div className="activity-free-badge">Free Entry</div>
                    <div className="activity-type-badge">{act.badge}</div>
                  </div>
                  
                  <div className="activity-card-content">
                    <div className="activity-place-title">{act.title}</div>
                    <div className="activity-place-desc">{act.desc}</div>

                    <div className="activity-info-grid">
                      <div className="activity-info-item">
                        <span className="activity-info-icon">🚌</span> {act.transport.split('(')[0]}
                      </div>
                      <div className="activity-info-item">
                        <span className="activity-info-icon">🚻</span> {act.facilities[0] || 'N/A'}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="activity-details-container">
                        <div className="activity-details-inner">
                          <div className="activity-detail-row">
                            <span className="activity-detail-label">📍 Location:</span>
                            <a href={act.mapLink} target="_blank" rel="noreferrer" className="activity-map-link">
                              🗺️ View on Google Maps ↗
                            </a>
                          </div>
                          <div className="activity-detail-row">
                            <span className="activity-detail-label">🚶 How to Reach:</span> {act.reach}
                          </div>
                          <div className="activity-detail-row">
                            <span className="activity-detail-label">🚌 Public Transport:</span> {act.transport}
                          </div>
                          <div className="activity-detail-row">
                            <span className="activity-detail-label">🏪 Amenities Nearby:</span> {act.amenities}
                          </div>
                          <div className="activity-detail-row">
                            <span className="activity-detail-label">🛡️ Safety & Notes:</span>
                            <span className="activity-safety-alert">{act.safety}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="activity-card-footer">
                      <button 
                        className="activity-expand-btn" 
                        onClick={() => toggleDetails(act.id)}
                        style={{ backgroundColor: isExpanded ? "#f7fafc" : "transparent" }}
                      >
                        {isExpanded ? "Hide Details ▲" : "Show Details ▼"}
                      </button>
                      <button 
                        className="activity-add-btn" 
                        disabled={isAdded}
                        onClick={() => handleAddActivity(act.id, act.title)}
                      >
                        {isAdded ? "Added" : "Add"}
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

export default ActivityList;