import React, { useState, useMemo } from 'react';
import './FlightPricePassenger.css';

const FlightPricePassenger = ({ flight, passengerConfig, onBack, onConfirmSeats }) => {
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({ email: '', phone: '' });
  const [travelers, setTravelers] = useState([
    { id: 1, firstName: '', lastName: '', dob: '', gender: '', passport: '' }
  ]);

  const basePrice = passengerConfig?.basePrice || 416.50;
  const totalPrice = (basePrice * travelers.length).toFixed(2);

  const calculateAgeLabel = (dob) => {
    if (!dob) return '(Adult)';
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return age <= 11 ? '(Child)' : '(Adult)';
  };

  const handleTravelerChange = (id, field, value) => {
    setTravelers(travelers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const addTraveler = () => {
    setTravelers([...travelers, { id: Date.now(), firstName: '', lastName: '', dob: '', gender: '', passport: '' }]);
  };

  const removeTraveler = (id) => {
    if (travelers.length > 1) {
      setTravelers(travelers.filter(t => t.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      flightId: flight.id,
      contact: contact,
      travelers: travelers,
      totalPrice: totalPrice
    };

    try {
      console.log('POST to https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flights/seats', payload);
      const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flights/seats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let seatData = {};
      if (response.ok) {
        seatData = await response.json();
      } else {
        console.warn("API returned an error, using fallback seat config.");
        seatData = { message: "fallback", maxSeats: travelers.length };
      }
      
      if (onConfirmSeats) {
        onConfirmSeats(seatData, travelers.length);
      }
    } catch (error) {
      console.error("Error confirming passengers:", error);
      // Fallback for demonstration
      if (onConfirmSeats) {
        onConfirmSeats({ message: "fallback", maxSeats: travelers.length }, travelers.length);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="passenger-wrapper">
      <div className="passenger-container">
        
        <button style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontWeight: 'bold' }} onClick={onBack}>
          ← Back to Flights
        </button>

        {/* Flight Summary */}
        {flight && (
          <div className="passenger-card">
            <div className="summary-header">
              <div className="route-info">
                <div className="airline-name">{flight.airline}</div>
                <div className="time-range">{flight.timeRange}</div>
                <div className="duration-stops">{flight.durationStops}</div>
              </div>
            </div>
          </div>
        )}

        {/* Price Total */}
        <div className="passenger-card">
          <div className="price-header">
            <div className="header-left">
              <div className="price-title">Total Price</div>
            </div>
            <div className="big-total">${totalPrice}</div>
          </div>
        </div>

        {/* Forms */}
        <div className="passenger-card form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-section-title" style={{ marginTop: 0 }}>Contact Information</div>
            <div className="input-grid">
              <div className="input-group full-width">
                <label>EMAIL ADDRESS</label>
                <input type="email" className="form-input" required 
                       value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} />
              </div>
              <div className="input-group full-width">
                <label>MOBILE PHONE</label>
                <input type="tel" className="form-input" required 
                       value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} />
              </div>
            </div>

            <div className="divider"></div>

            {travelers.map((t, index) => (
              <div key={t.id} className="traveler-block">
                <div className="form-section-header">
                  <div className="form-section-title">
                    Traveler {index + 1} {calculateAgeLabel(t.dob)}
                  </div>
                  {index > 0 && (
                    <button type="button" className="remove-btn" onClick={() => removeTraveler(t.id)}>Remove</button>
                  )}
                </div>
                
                <div className="input-grid">
                  <div className="input-group">
                    <label>FIRST NAME</label>
                    <input type="text" className="form-input" required 
                           value={t.firstName} onChange={(e) => handleTravelerChange(t.id, 'firstName', e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>LAST NAME</label>
                    <input type="text" className="form-input" required 
                           value={t.lastName} onChange={(e) => handleTravelerChange(t.id, 'lastName', e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>DATE OF BIRTH</label>
                    <input type="date" className="form-input" required 
                           value={t.dob} onChange={(e) => handleTravelerChange(t.id, 'dob', e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>GENDER</label>
                    <select className="form-input" required 
                            value={t.gender} onChange={(e) => handleTravelerChange(t.id, 'gender', e.target.value)}>
                      <option value="">Select...</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                  <div className="input-group full-width">
                    <label>PASSPORT NUMBER</label>
                    <input type="text" className="form-input" required 
                           value={t.passport} onChange={(e) => handleTravelerChange(t.id, 'passport', e.target.value)} />
                  </div>
                </div>
                <div className="divider"></div>
              </div>
            ))}

            <button type="button" className="btn-outline" onClick={addTraveler}>
              + Add Another Traveler
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Processing...' : `Confirm & Pay $${totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FlightPricePassenger;