import React, { useState } from 'react';
import './AttractionsList.css';

const initialActivities = [
  {
    id: 1,
    title: "City Royal Museum",
    type: "Culture",
    badge: "Museum",
    price: "$15.00",
    image: "https://via.placeholder.com/400x250/718096/ffffff?text=Museum",
    desc: "Explore ancient artifacts and modern art in the heart of the city.",
    duration: "2-3 Hours",
    rating: "★ 4.8",
    address: "12 Museum Mile, Arts District, City Center",
    hours: "Mon-Sun: 9:00 AM - 5:00 PM",
    phone: "+1 555-0199",
    website: "https://example.com/museum",
    mapLink: "http://googleusercontent.com/maps.google.com/museum",
    numericPrice: 15.00
  },
  {
    id: 2,
    title: "Skyline Zipline Adventure",
    type: "Adventure",
    badge: "Thrill",
    price: "$45.00",
    image: "https://via.placeholder.com/400x250/e53e3e/ffffff?text=Zipline",
    desc: "An adrenaline-pumping ride across the river canyon. Gear included.",
    duration: "1 Hour",
    rating: "★ 4.9",
    address: "Base Camp 4, Mountain Road, Outskirts",
    hours: "Tue-Sun: 10:00 AM - 6:00 PM",
    phone: "+1 555-0122",
    website: "https://example.com/zip",
    mapLink: "http://googleusercontent.com/maps.google.com/zip",
    numericPrice: 45.00
  },
  {
    id: 3,
    title: "Central Botanical Gardens",
    type: "Relaxation",
    badge: "Garden",
    price: "Free",
    image: "https://via.placeholder.com/400x250/48bb78/ffffff?text=Gardens",
    desc: "A peaceful escape featuring exotic plants, a koi pond, and walking paths.",
    duration: "1-2 Hours",
    rating: "★ 4.7",
    address: "88 Green Way, Parkside District",
    hours: "Daily: 6:00 AM - 8:00 PM",
    phone: "",
    website: "https://example.com/gardens",
    mapLink: "http://googleusercontent.com/maps.google.com/gardens",
    numericPrice: 0.00
  },
  {
    id: 4,
    title: "Harbor Boat Tour",
    type: "Relaxation",
    badge: "Tour",
    price: "$25.00",
    image: "https://via.placeholder.com/400x250/2b6cb0/ffffff?text=Boat+Tour",
    desc: "A relaxing 60-minute cruise seeing the famous landmarks from the water.",
    duration: "1 Hour",
    rating: "★ 4.5",
    address: "Pier 4, Harbor Front Walk",
    hours: "Departs every hour, 10 AM - 4 PM",
    phone: "+1 555-0888",
    website: "",
    mapLink: "http://googleusercontent.com/maps.google.com/boat",
    numericPrice: 25.00
  },
  {
    id: 5,
    title: "Historic Opera House",
    type: "Culture",
    badge: "Sightseeing",
    price: "$10.00",
    image: "https://via.placeholder.com/400x250/d69e2e/ffffff?text=Opera+House",
    desc: "Guided tours of the 19th-century architecture and backstage areas.",
    duration: "45 Mins",
    rating: "★ 4.6",
    address: "1 Grand Avenue, Old Town",
    hours: "Mon-Fri: 11:00 AM - 3:00 PM",
    phone: "+1 555-0333",
    website: "https://example.com/opera",
    mapLink: "http://googleusercontent.com/maps.google.com/opera",
    numericPrice: 10.00
  }
];

const AttractionsList = ({ htmlContent, onBack, onBookAttraction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [expandedIds, setExpandedIds] = useState({});
  const [addedIds, setAddedIds] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredActivities = initialActivities.filter(act => {
    const textMatch = act.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      act.badge.toLowerCase().includes(searchTerm.toLowerCase());
    const catMatch = currentCategory === 'All' || act.type === currentCategory;
    return textMatch && catMatch;
  });

  const toggleDetails = (id) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddClick = async (targetItem) => {
    setAddedIds(prev => ({ ...prev, [targetItem.id]: true }));
    setIsProcessing(true);

    try {
      const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/attractions/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: targetItem.id, title: targetItem.title })
      });
      
      const rawHtmlPayload = await response.text();
      
      if (onBookAttraction) {
        onBookAttraction(rawHtmlPayload, targetItem);
      }
    } catch (error) {
      console.error("Booking verification request failed:", error);
      alert("Failed to initialize booking flow. Please check backend configuration.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="attractions-page-container">
      <div className="attractions-nav-header">
        <button className="attractions-back-btn" onClick={onBack}>
          ← Back to Itinerary Timeline
        </button>
      </div>

      {htmlContent && htmlContent.includes('<html') ? (
        <iframe 
          title="Attractions Dynamic List" 
          srcDoc={htmlContent} 
          className="attractions-iframe-layer"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      ) : (
        <div className="attractions-native-container">
          <h1>Things To Do</h1>
          <div className="attractions-subtitle">
            Explore top attractions, museums, and adventures in the city.
          </div>

          <div className="attractions-controls-wrapper">
            <input 
              type="text" 
              className="attractions-search-input" 
              placeholder="Search 'Museum', 'Park', 'Tickets'..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="attractions-filter-row">
              {['All', 'Culture', 'Adventure', 'Relaxation'].map(cat => (
                <button 
                  key={cat}
                  className={`attractions-filter-btn ${currentCategory === cat ? 'active' : ''}`}
                  onClick={() => setCurrentCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="attractions-grid">
            {filteredActivities.map(act => {
              const isFree = act.price.toLowerCase() === 'free';
              const isExpanded = !!expandedIds[act.id];
              const isAdded = !!addedIds[act.id];

              return (
                <div className="attractions-card" key={act.id}>
                  <div className="attractions-img-container">
                    {act.image && act.image.trim() !== "" ? (
                      <img src={act.image} alt={act.title} className="attractions-place-img" />
                    ) : (
                      <div className="attractions-no-img-placeholder">
                        <span className="camera-icon">📷</span>
                        <span>No Image Available</span>
                      </div>
                    )}
                    <div className={`attractions-price-badge ${isFree ? 'price-free' : 'price-paid'}`}>
                      {act.price}
                    </div>
                    <div className="attractions-type-badge">{act.badge}</div>
                  </div>
                  
                  <div className="attractions-card-content">
                    <div className="attractions-place-title">{act.title}</div>
                    <div className="attractions-place-desc">{act.desc}</div>

                    <div className="attractions-info-grid">
                      <div className="attractions-info-item"><span>⏱️</span> {act.duration}</div>
                      <div className="attractions-info-item"><span>⭐</span> {act.rating}</div>
                    </div>

                    {isExpanded && (
                      <div className="attractions-details-container">
                        <div className="attractions-details-inner">
                          <div className="attractions-detail-row">
                            <span className="detail-label">📍 Physical Address:</span>
                            {act.address}
                          </div>

                          <div className="attractions-detail-row">
                            <a href={act.mapLink} target="_blank" rel="noopener noreferrer" className="attractions-map-link">
                              🗺️ View on Google Maps ↗
                            </a>
                          </div>

                          <div className="attractions-detail-row-inline">
                            <span className="detail-label">🕒 Open Hours:</span>
                            <span className="detail-value">{act.hours}</span>
                          </div>

                          <div className="attractions-detail-row-inline">
                            <span className="detail-label">📞 Contact:</span>
                            <span className="detail-value">
                              {act.website && <a href={act.website} target="_blank" rel="noopener noreferrer" className="attractions-contact-link">🌐 Website</a>}
                              {act.phone && <a href={`tel:${act.phone}`} className="attractions-contact-link">📞 Call</a>}
                              {!act.website && !act.phone && <span style={{color: '#718096', fontStyle: 'italic'}}>No contact info</span>}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="attractions-card-footer">
                      <button 
                        className="attractions-expand-btn" 
                        onClick={() => toggleDetails(act.id)}
                        style={{ backgroundColor: isExpanded ? '#f7fafc' : 'transparent' }}
                      >
                        {isExpanded ? 'Hide Details ▲' : 'Show Details ▼'}
                      </button>
                      <button 
                        className="attractions-add-btn" 
                        disabled={isAdded || isProcessing}
                        onClick={() => handleAddClick(act)}
                      >
                        {isProcessing ? 'Processing...' : isAdded ? 'Added' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttractionsList;