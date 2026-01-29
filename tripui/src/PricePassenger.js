import React, { useState } from 'react';
import './PricePassenger.css'; // Import specific styles

const PricePassenger = ({ basePrice, onBack, onConfirm }) => {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [travelers, setTravelers] = useState([{ id: 1 }]); // Start with 1 traveler
  const [loading, setLoading] = useState(false);

  // Calculate dynamic total
  const total = (basePrice * travelers.length).toFixed(2);

  const handleAddTraveler = async () => {
    // Simulating a backend call if needed
    setLoading(true);
    setTimeout(() => {
        setTravelers([...travelers, { id: travelers.length + 1 }]);
        setLoading(false);
    }, 300);
  };

  const handleRemoveTraveler = (id) => {
    if (travelers.length > 1) {
      setTravelers(travelers.filter(t => t.id !== id));
    }
  };

  return (
    <div className="container">
      <button className="back-link" onClick={onBack}>← Back to Flights</button>
      
      {/* 1. Price Breakdown Card (Accordion) */}
      <div className={`card ${isPriceOpen ? 'expanded' : ''}`}>
        <div className={`price-header ${isPriceOpen ? 'active' : ''}`} onClick={() => setIsPriceOpen(!isPriceOpen)}>
          <div className="header-left">
            <span className="toggle-icon">▼</span>
            <div className="price-title">Price Breakdown</div>
          </div>
          <div className="big-total">${total}</div>
        </div>

        <div className="price-details-content">
          <div className="invoice-row" style={{ marginTop: '10px' }}>
            <span>Base Fare x {travelers.length}</span>
            <span>${(basePrice * travelers.length).toFixed(2)}</span>
          </div>
          <div className="invoice-row" style={{ marginTop: '10px', fontWeight: 600 }}>
            <span>Taxes & Fees</span>
            <span>Included in Base</span>
          </div>
          <hr className="invoice-divider" />
          <div className="invoice-total-row">
            <span>Total Amount Due</span>
            <span><span className="currency-code">USD</span>${total}</span>
          </div>
        </div>
      </div>

      {/* 2. Passenger Form Card */}
      <div className="card form-card">
        <form onSubmit={(e) => { e.preventDefault(); onConfirm(travelers); }}>
            <div className="form-section-title" style={{ marginTop: 0 }}>Contact Information</div>
            <div className="input-grid">
            <div className="input-group full-width"><label>EMAIL ADDRESS</label><input type="email" className="form-input" placeholder="ajai@example.com" required /></div>
            <div className="input-group full-width"><label>MOBILE PHONE</label><input type="tel" className="form-input" placeholder="+1 555 0199" required /></div>
            </div>

            <div className="divider"></div>

            <div id="travelers-container">
            {travelers.map((traveler, index) => (
                <div key={traveler.id} className="traveler-block" style={{animation: "slideDown 0.3s ease"}}>
                <div className="form-section-header">
                    <div className="form-section-title">Traveler {index + 1} {index === 0 && '(Adult)'}</div>
                    {index > 0 && <button type="button" className="remove-btn" onClick={() => handleRemoveTraveler(traveler.id)}>Remove</button>}
                </div>
                <div className="input-grid">
                    <div className="input-group"><label>FIRST NAME</label><input type="text" className="form-input" required /></div>
                    <div className="input-group"><label>LAST NAME</label><input type="text" className="form-input" required /></div>
                    <div className="input-group"><label>DOB</label><input type="date" className="form-input" required /></div>
                    <div className="input-group"><label>GENDER</label>
                    <select className="form-input" required><option value="">Select...</option><option value="M">Male</option><option value="F">Female</option></select>
                    </div>
                    <div className="input-group full-width"><label>PASSPORT NUMBER</label><input type="text" className="form-input" required /></div>
                </div>
                <div className="divider"></div>
                </div>
            ))}
            </div>

            <button type="button" className="btn-outline" onClick={handleAddTraveler}>
            {loading ? "Updating..." : "+ Add Another Traveler"}
            </button>
            <button type="submit" className="submit-btn">
            Confirm & Pay ${total}
            </button>
        </form>
      </div>
    </div>
  );
};

export default PricePassenger;