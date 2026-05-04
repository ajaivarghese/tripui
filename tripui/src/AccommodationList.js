import React, { useState } from 'react';
import './AccommodationList.css';

const MOCK_STAYS = [
  {
    id: 1, name: "The Grand Horizon", type: "Hotel", rating: 4.9,
    image: "https://via.placeholder.com/150/2d3748/ffffff?text=Grand+Hotel",
    location: "Downtown District", review: "Impeccable service and stunning city views. The rooftop pool is a highlight.",
    amenities: ["Pool", "Gym", "Parking", "Bar", "Concierge"],
    website: "https://example.com", map: "https://www.openstreetmap.org/search?query=Downtown+District+Hotel",
    rooms: [
      { id: "r1a", name: "Deluxe King", price: "$250", features: "King Bed, City View, Bathtub" },
      { id: "r1b", name: "Twin Suite", price: "$320", features: "2 Queen Beds, Living Area, Balcony" }
    ]
  },
  {
    id: 2, name: "Backpacker's Nest", type: "Hostel", rating: 4.3,
    image: "https://via.placeholder.com/150/ed8936/ffffff?text=Hostel",
    location: "Old Town", review: "Great social vibe and very clean facilities. Perfect for meeting fellow travelers.",
    amenities: ["Lockers", "Shared Kitchen", "Game Room", "Free WiFi", "Laundry"],
    website: "https://example.com", map: "https://www.openstreetmap.org/search?query=Old+Town+Hostel",
    rooms: [
      { id: "r2a", name: "8-Bed Dorm", price: "$25", features: "Bunk Bed, Shared Bath, Reading Light" },
      { id: "r2b", name: "Private Double", price: "$60", features: "Double Bed, Shared Bath, Desk" }
    ]
  },
  {
    id: 3, name: "Riverview Cottage", type: "Homestay", rating: 4.7,
    image: "https://via.placeholder.com/150/48bb78/ffffff?text=Homestay",
    location: "Riverside Village", review: "A home away from home. The host, Maria, cooks the best local breakfast.",
    amenities: ["Breakfast Incl.", "Garden", "Pet Friendly", "Fireplace", "Library"],
    website: "https://example.com", map: "https://www.openstreetmap.org/search?query=Riverside+Village",
    rooms: [
      { id: "r3a", name: "Garden Room", price: "$85", features: "Queen Bed, En-suite, Garden Access" },
      { id: "r3b", name: "Attic Loft", price: "$75", features: "Double Bed, Skylight, Cozy" }
    ]
  },
  {
    id: 4, name: "Urban Pods", type: "Hostel", rating: 4.5,
    image: "https://via.placeholder.com/150/63b3ed/ffffff?text=Pod+Hotel",
    location: "Tech Park", review: "Futuristic and private sleeping pods. Very quiet and modern.",
    amenities: ["Quiet Zone", "Coffee Bar", "Co-working Space", "Rain Showers", "Free WiFi"],
    website: "https://example.com", map: "https://www.openstreetmap.org/search?query=Tech+Park",
    rooms: [
      { id: "r4a", name: "Single Pod", price: "$40", features: "Privacy Blind, USB Charging, Vent" }
    ]
  }
];

const AccommodationList = ({ htmlContent, onBack }) => {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCards, setExpandedCards] = useState({});
  const [selections, setSelections] = useState({});

  const toggleCard = (stayId) => {
    setExpandedCards(prev => ({ ...prev, [stayId]: !prev[stayId] }));
  };

  const handleSelectRoom = (stayId, roomId) => {
    setSelections(prev => ({ ...prev, [stayId]: roomId }));
  };

  const handleBookStay = (stayId, stayName) => {
    const roomId = selections[stayId];
    if (!roomId) {
      alert("Please select a room type first!");
      return;
    }
    const room = MOCK_STAYS.find(s => s.id === stayId).rooms.find(r => r.id === roomId);
    alert(`Booking Confirmed!\n\nHotel: ${stayName}\nRoom: ${room.name}\nPrice: ${room.price}`);
  };

  const filteredStays = MOCK_STAYS.filter(stay => {
    const input = searchTerm.toLowerCase();
    return stay.name.toLowerCase().includes(input) || 
           stay.type.toLowerCase().includes(input) || 
           stay.amenities.some(a => a.toLowerCase().includes(input));
  });

  return (
    <div className="accommodation-container">
      <button className="back-btn" onClick={onBack}>← Back to Timeline</button>
      
      <h1>Accommodations</h1>

      <div className="summary-card">
        <div className="summary-item">
          <span class="sum-label">Check-In</span>
          <span class="sum-value"><span class="sum-icon">📅</span> Oct 25</span>
        </div>
        <div className="divider"></div>
        <div className="summary-item">
          <span class="sum-label">Check-Out</span>
          <span class="sum-value"><span class="sum-icon">📅</span> Oct 28</span>
        </div>
        <div className="divider"></div>
        <div className="summary-item">
          <span class="sum-label">Passengers / Guests</span>
          <span class="sum-value"><span class="sum-icon">👥</span> 2 Adults, 1 Room</span>
        </div>
      </div>

      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>📄 List View</button>
        <button className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>🗺️ Map View</button>
      </div>

      {activeTab === 'list' ? (
        <div className="tab-content active">
          <div className="search-wrapper">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search hotels, hostels, amenities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="stay-list">
            {filteredStays.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#a0aec0', marginTop: '40px' }}>
                <div style={{ fontSize: '40px' }}>🕵️</div>
                <p>No stays found matching your search.</p>
              </div>
            ) : (
              filteredStays.map(stay => {
                const roomPrices = stay.rooms.map(room => parseInt(room.price.replace(/\D/g, '')));
                const priceDisplay = Math.min(...roomPrices) === Math.max(...roomPrices) 
                  ? `$${Math.min(...roomPrices)}` 
                  : `$${Math.min(...roomPrices)} - $${Math.max(...roomPrices)}`;

                const typeClass = stay.type.includes('Hostel') ? 'type-hostel' : stay.type.includes('Homestay') ? 'type-homestay' : 'type-hotel';

                return (
                  <div className={`stay-card ${expandedCards[stay.id] ? 'open' : ''}`} key={stay.id}>
                    <div className="card-header" onClick={() => toggleCard(stay.id)}>
                      <div className="header-image"><img src={stay.image} alt={stay.name} /></div>
                      <div className="header-content">
                        <div className="badge-row"><span className={`stay-type ${typeClass}`}>{stay.type}</span></div>
                        <div className="stay-title">{stay.name}</div>
                        <div className="stay-location">📍 {stay.location}</div>
                        <div className="rating">★ {stay.rating}</div>
                      </div>
                      <div className="header-right">
                        <span className="price-badge">{priceDisplay}</span>
                        <span className="chevron">▼</span>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="body-inner">
                        <span className="section-title">Review Summary</span>
                        <div className="review-summary">"{stay.review}"</div>

                        <span className="section-title">Property Amenities</span>
                        <div className="amenities-grid">
                          {stay.amenities.map((a, i) => <span key={i} className="amenity-tag">{a}</span>)}
                        </div>

                        <span className="section-title">Select Room Type</span>
                        <div className="rooms-container">
                          {stay.rooms.map(room => (
                            <div 
                              className={`room-row ${selections[stay.id] === room.id ? 'selected' : ''}`} 
                              onClick={() => handleSelectRoom(stay.id, room.id)}
                              key={room.id}
                            >
                              <div className="room-left">
                                <div className="room-radio"></div>
                                <div className="room-info">
                                  <h4>{room.name}</h4>
                                  <span className="room-features">{room.features}</span>
                                </div>
                              </div>
                              <div className="room-price">{room.price}</div>
                            </div>
                          ))}
                        </div>

                        <div className="action-footer">
                          <a href={stay.website} target="_blank" rel="noreferrer" className="btn btn-web">🌐 Website</a>
                          <a href={stay.map} target="_blank" rel="noreferrer" className="btn btn-map">🗺️ Map</a>
                          <button className="btn btn-book" onClick={() => handleBookStay(stay.id, stay.name)}>📅 Book Now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <div className="tab-content active">
          <div className="map-wrapper">
            <iframe 
              title="stay-map" width="100%" height="100%" frameBorder="0" scrolling="no" 
              src="https://www.openstreetmap.org/export/embed.html?bbox=-73.5300%2C40.7400%2C-73.4300%2C40.8200&amp;layer=mapnik">
            </iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccommodationList;