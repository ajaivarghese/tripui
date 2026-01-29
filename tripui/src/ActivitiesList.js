import React, { useState } from 'react';
import './ActivitiesList.css';

// --- DATA FROM HTML ---
const INITIAL_ACTIVITIES = [
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
    image: "", // MISSING IMAGE FOR TEST
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

const ActivitiesList = () => {
  const [activities] = useState(INITIAL_ACTIVITIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedIds, setExpandedIds] = useState([]);
  const [addingIds, setAddingIds] = useState([]); // Track which items are currently being added (loading state)

  // --- FILTER LOGIC ---
  const filteredActivities = activities.filter((act) => {
    const textMatch = 
      act.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      act.badge.toLowerCase().includes(searchTerm.toLowerCase());
    
    const catMatch = activeCategory === 'All' || act.type === activeCategory;
    
    return textMatch && catMatch;
  });

  // --- TOGGLE DETAILS ---
  const toggleDetails = (id) => {
    setExpandedIds((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // --- HANDLE ADD (POST REQUEST) ---
  const handleAdd = async (activity) => {
    setAddingIds(prev => [...prev, activity.id]); // Show loading state

    try {
      const response = await fetch('https://travelapi.myvnc.com/activities/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      });

      if (response.ok) {
        alert(`Successfully added "${activity.title}" to your list!`);
      } else {
        alert('Failed to add activity. Please try again.');
      }
    } catch (error) {
      console.error('Error adding activity:', error);
      alert('Error connecting to server.');
    } finally {
      setAddingIds(prev => prev.filter(id => id !== activity.id)); // Remove loading state
    }
  };

  return (
    <div className="activities-container">
      <h1 className="activities-title">🍃 Free to Explore</h1>
      <div className="activities-subtitle">
        Discover attractions that don't cost a dime. No booking needed.
      </div>

      {/* SEARCH & FILTER */}
      <div className="controls-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search 'Waterfall', 'Beach', 'Viewpoint'..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="filter-row">
          {['All', 'Nature', 'Water', 'Landmark'].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'All' ? 'All' : 
               cat === 'Nature' ? 'Nature Walks' : 
               cat === 'Water' ? 'Waterfalls & Beaches' : 
               'Monuments & Views'}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVITY LIST */}
      <div className="activity-grid">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((act) => {
            const isExpanded = expandedIds.includes(act.id);
            const isAdding = addingIds.includes(act.id);

            return (
              <div key={act.id} className="place-card">
                {/* IMAGE AREA */}
                <div className="img-container">
                  {act.image ? (
                    <img src={act.image} alt={act.title} className="place-img" />
                  ) : (
                    <div className="no-image-placeholder">
                      <span className="camera-icon">📷</span>
                      <span>No Image Available</span>
                    </div>
                  )}
                  <div className="free-badge">Free Entry</div>
                  <div className="type-badge">{act.badge}</div>
                </div>

                {/* CONTENT AREA */}
                <div className="card-content">
                  <div className="place-title">{act.title}</div>
                  <div className="place-desc">{act.desc}</div>

                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-icon">🚌</span> {act.transport.split('(')[0]}
                    </div>
                    <div className="info-item">
                      <span className="info-icon">🚻</span> {act.facilities[0] || 'N/A'}
                    </div>
                  </div>

                  {/* DETAILS ACCORDION */}
                  <div
                    className="details-container"
                    style={{ maxHeight: isExpanded ? '500px' : '0px' }} // Approximate max-height for animation
                  >
                    <div className="details-inner">
                      <div className="detail-row">
                        <span className="detail-label">📍 Location:</span>
                        <a href={act.mapLink} target="_blank" rel="noreferrer" className="map-link">
                          🗺️ View on Google Maps ↗
                        </a>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">🚶 How to Reach:</span>
                        {act.reach}
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">🚌 Public Transport:</span>
                        {act.transport}
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">🏪 Amenities Nearby:</span>
                        {act.amenities}
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">🛡️ Safety & Notes:</span>
                        <span className="safety-alert">{act.safety}</span>
                      </div>
                    </div>
                  </div>

                  {/* FOOTER ACTIONS */}
                  <div className="card-footer">
                    <button 
                      className="add-btn" 
                      onClick={() => handleAdd(act)}
                      disabled={isAdding}
                    >
                      {isAdding ? 'Adding...' : '➕ Add to Itinerary'}
                    </button>
                    
                    <button
                      className={`expand-btn ${isExpanded ? 'active' : ''}`}
                      onClick={() => toggleDetails(act.id)}
                    >
                      {isExpanded ? 'Hide Details ▲' : 'Show Details ▼'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <p>No activities found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesList;