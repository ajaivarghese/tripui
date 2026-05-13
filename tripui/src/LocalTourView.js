import React, { useState } from 'react';
import './LocalTourView.css';

const LocalTourView = ({ htmlContent, onBack }) => {
  // State Management extracted from the original HTML behavior
  const [activeTab, setActiveTab] = useState('overview');
  const [isBooked, setIsBooked] = useState(false);

  // Default extracted data representing "Historical Downtown Walk"
  const tourDetails = {
    title: "Historical Downtown Walk",
    subtitle: "Step back in time and explore the city's oldest architectural wonders.",
    price: "$25.00",
    image: "https://via.placeholder.com/900x350/cbd5e0/ffffff?text=Historical+Downtown",
    duration: "3 Hours",
    rating: "4.8 / 5 (124 Reviews)",
    activityLevel: "Moderate Walking",
    guideLang: "Live Guide (English)",
    about: "Discover the hidden gems and rich history of the downtown district. This immersive 3-hour walking tour takes you past 19th-century cathedrals, historic cobblestone streets, and the famous Old Post Office. Perfect for history buffs and architecture enthusiasts, our knowledgeable guides will share captivating stories that bring the city's past to life.",
    reviews: [
      { text: "Absolutely fantastic! The guide was incredibly knowledgeable and the pace was perfect.", author: "Sarah J." },
      { text: "A great way to see the city. Highly recommend wearing comfortable shoes!", author: "Mark T." }
    ],
    inclusions: ["Professional local guide", "Bottled water", "Entrance fee to the Old Post Office museum"],
    exclusions: ["Gratuities (optional)", "Hotel pickup and drop-off", "Food and snacks"],
    expectations: "Expect approximately 2.5 miles of walking at a leisurely pace. The route includes some uneven cobblestone streets and minor inclines. Please dress appropriately for the weather.",
    accessibility: "This tour is mostly wheelchair accessible, though some historic buildings may have limited access or lack elevators. Service animals are permitted.",
    additionalInfo: "Confirmation will be received at the time of booking. Children must be accompanied by an adult. Maximum of 15 travelers per tour.",
    cancellation: "For a full refund, cancel at least 24 hours in advance of the start date of the experience. Cancellations made less than 24 hours before the start time will not be refunded.",
    faqs: [
      { q: "Where do we meet?", a: "The meeting point is directly in front of City Hall." },
      { q: "Are restrooms available?", a: "Yes, at the halfway mark (Heritage Park)." }
    ],
    itineraryStops: [
      { marker: "📍", title: "Start: City Hall Square", time: "Start Time: 10:00 AM", desc: "Meet your guide by the central fountain. Brief introduction and safety overview." },
      { marker: "1", title: "The Old Post Office", time: "Duration: 45 minutes", desc: "Explore the 1850s architecture and learn about the city's early communication network. Entrance fee included.", link: "#" },
      { marker: "2", title: "Heritage Park & Catacombs", time: "Duration: 60 minutes", desc: "Walk through the oldest public park in the city and descend into the newly opened catacombs. Restrooms available here.", link: "#" },
      { marker: "🏁", title: "End: Main Street Market", time: "End Time: ~1:00 PM", desc: "The tour concludes at the bustling market, a perfect spot to grab lunch." }
    ],
    operator: {
      name: "City Walks Co.",
      desc: "Operating premium walking tours since 2012. Our mission is to connect travelers with the authentic history and culture of our city through expert local guides.",
      address: "100 Main St, Suite 4B",
      phone: "+1 (555) 019-8832",
      website: "citywalksco.example.com",
      rating: "4.9 Average Operator Rating",
      otherTours: [
        { title: "Spooky Ghost Walk", details: "2 Hours • Evening" },
        { title: "Culinary Food Tasting", details: "3.5 Hours • Afternoon" }
      ]
    }
  };

  const handleBookNow = () => {
    setIsBooked(true);
    alert(`"${tourDetails.title}" has been successfully added to your cart!`);
  };

  return (
    <div className="tour-view-wrapper">
      <div className="tour-header-bar">
        <button className="tour-back-btn" onClick={onBack}>
          ← Back to Tours List
        </button>
      </div>

      <div className="tour-container">
        <h1>{tourDetails.title}</h1>
        <div className="tour-subtitle">{tourDetails.subtitle}</div>

        {/* Tab Controls */}
        <div className="tour-controls-wrapper">
          <div className="tour-filter-row">
            {['overview', 'details', 'itinerary', 'operator'].map((tab) => (
              <button
                key={tab}
                className={`tour-filter-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content: Overview */}
        {activeTab === 'overview' && (
          <div className="tour-tab-content active">
            <div className="tour-place-card">
              <div className="tour-img-container">
                <div className="tour-price-badge">{tourDetails.price}</div>
                <img src={tourDetails.image} alt="Tour Cover" />
              </div>
              <div className="tour-card-content">
                <div className="tour-info-grid">
                  <div className="tour-info-item"><span className="tour-info-icon">⏱️</span> {tourDetails.duration}</div>
                  <div className="tour-info-item"><span className="tour-info-icon">⭐</span> {tourDetails.rating}</div>
                  <div className="tour-info-item"><span className="tour-info-icon">🚶</span> {tourDetails.activityLevel}</div>
                  <div className="tour-info-item"><span className="tour-info-icon">🗣️</span> {tourDetails.guideLang}</div>
                </div>
                <div className="tour-place-title">About this tour</div>
                <div className="tour-place-desc">{tourDetails.about}</div>
                
                <div className="tour-detail-section">
                  <span className="tour-detail-label">Review Summary</span>
                  <div className="tour-place-desc">
                    {tourDetails.reviews.map((rev, idx) => (
                      <React.Fragment key={idx}>
                        "{rev.text}" - <em>{rev.author}</em>
                        {idx < tourDetails.reviews.length - 1 && <><br /><br /></>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Details */}
        {activeTab === 'details' && (
          <div className="tour-tab-content active">
            <div className="tour-place-card">
              <div className="tour-card-content">
                <div className="tour-detail-section">
                  <span className="tour-detail-label">✅ What's Included</span>
                  <ul className="tour-custom-list">
                    {tourDetails.inclusions.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

                <div className="tour-detail-section">
                  <span className="tour-detail-label">❌ What's Not Included</span>
                  <ul className="tour-custom-list">
                    {tourDetails.exclusions.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

                <div className="tour-detail-section">
                  <span className="tour-detail-label">👟 What to Expect</span>
                  <div className="tour-place-desc">{tourDetails.expectations}</div>
                </div>

                <div className="tour-detail-section">
                  <span className="tour-detail-label">♿ Accessibility</span>
                  <div className="tour-place-desc">{tourDetails.accessibility}</div>
                </div>

                <div className="tour-detail-section">
                  <span className="tour-detail-label">ℹ️ Additional Information</span>
                  <div className="tour-place-desc">{tourDetails.additionalInfo}</div>
                </div>

                <div className="tour-detail-section">
                  <span className="tour-detail-label">📅 Cancellation Policy</span>
                  <div className="tour-place-desc">{tourDetails.cancellation}</div>
                </div>

                <div className="tour-detail-section">
                  <span className="tour-detail-label">❓ FAQ & Help</span>
                  <ul className="tour-custom-list">
                    {tourDetails.faqs.map((faq, i) => (
                      <li key={i}><strong>{faq.q}</strong> {faq.a}</li>
                    ))}
                    <li><strong>Need Help?</strong> Contact our support team at <a href="mailto:support@example.com" className="tour-map-link">support@example.com</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Itinerary & Map */}
        {activeTab === 'itinerary' && (
          <div className="tour-tab-content active">
            <div className="tour-place-card">
              <div className="tour-card-content">
                <div className="tour-place-title" style={{ marginBottom: '20px' }}>Tour Stops</div>

                {tourDetails.itineraryStops.map((stop, index) => (
                  <div className="tour-itinerary-stop" key={index}>
                    <div className="tour-stop-marker">{stop.marker}</div>
                    <div className="tour-stop-details">
                      <div className="tour-stop-title">{stop.title}</div>
                      <div className="tour-stop-duration">{stop.time}</div>
                      <div className="tour-place-desc" style={{ marginBottom: stop.link ? '10px' : '0' }}>
                        {stop.desc}
                      </div>
                      {stop.link && <a href={stop.link} className="tour-map-link">View Stop Details ↗</a>}
                    </div>
                  </div>
                ))}

                <div className="tour-detail-section" style={{ marginTop: '30px', borderTop: '1px dashed #e2e8f0', paddingTop: '20px' }}>
                  <span className="tour-detail-label">Interactive Map (OpenStreetMap)</span>
                  <div className="tour-map-container">
                    <iframe 
                      title="Tour Route Map"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-74.01594161987306%2C40.7042312678688%2C-73.99268150329591%2C40.71831804246062&amp;layer=mapnik" 
                      scrolling="no"
                    />
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '5px' }}>
                    <a href="https://www.openstreetmap.org" target="_blank" rel="noreferrer" className="tour-map-link">View Larger Map</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Operator */}
        {activeTab === 'operator' && (
          <div className="tour-tab-content active">
            <div className="tour-place-card">
              <div className="tour-card-content">
                <div className="tour-place-title">{tourDetails.operator.name}</div>
                <div className="tour-place-desc">{tourDetails.operator.desc}</div>
                
                <div className="tour-info-grid">
                  <div className="tour-info-item"><span className="tour-info-icon">📍</span> {tourDetails.operator.address}</div>
                  <div className="tour-info-item"><span className="tour-info-icon">📞</span> {tourDetails.operator.phone}</div>
                  <div className="tour-info-item"><span className="tour-info-icon">🌐</span> <span className="tour-map-link" style={{ margin: 0 }}>{tourDetails.operator.website}</span></div>
                  <div className="tour-info-item"><span className="tour-info-icon">⭐</span> {tourDetails.operator.rating}</div>
                </div>

                <div className="tour-detail-section">
                  <span className="tour-detail-label">Other Tours by this Operator</span>
                  <div className="tour-operator-grid">
                    {tourDetails.operator.otherTours.map((t, idx) => (
                      <div className="tour-operator-card" key={idx}>
                        <div className="tour-operator-title">{t.title}</div>
                        <div className="tour-operator-meta">{t.details}</div>
                        <a href="#" className="tour-map-link">View Tour ↗</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="tour-bottom-action-bar">
        <div className="tour-bottom-action-inner">
          <div className="tour-bottom-price">{tourDetails.price} <span>/ person</span></div>
          <button 
            className="tour-book-btn" 
            onClick={handleBookNow}
            disabled={isBooked}
            style={{ backgroundColor: isBooked ? '#cbd5e0' : '#3182ce' }}
          >
            {isBooked ? "Added to Cart" : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalTourView;