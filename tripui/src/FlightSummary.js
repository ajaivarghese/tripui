import React, { useState } from 'react';
import './FlightSummary.css';

const FlightSummary = ({ summaryData, onBack, onPaymentSuccess }) => {
  const [isFlightOpen, setIsFlightOpen] = useState(false);
  const [openPassengers, setOpenPassengers] = useState({});
  const [isPaying, setIsPaying] = useState(false);

  // Fallbacks in case data isn't loaded properly
  const flight = summaryData?.flight || {};
  const passengers = summaryData?.passengers || [];
  const pricing = summaryData?.pricing || { currency: 'USD', totalAmount: '0.00' };

  const togglePassenger = (id) => {
    setOpenPassengers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsPaying(true);

    try {
      console.log('POST to https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flight/payment');
      const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flight/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: pricing.totalAmount, reference: summaryData?.bookingReference })
      });
      
      let confirmData = {};
      if(response.ok) {
        confirmData = await response.json();
      } else {
        // Mock fallback if API is not implemented
        confirmData = { bookingId: "eJzTd921", pnr: "85JJU9", status: "success" };
      }

      if (onPaymentSuccess) {
        onPaymentSuccess(confirmData);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      // Fallback transition
      if (onPaymentSuccess) {
        onPaymentSuccess({ bookingId: "eJzTd921", pnr: "85JJU9", status: "success" });
      }
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="summary-wrapper">
      <div className="summary-container">
        <button style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontWeight: 'bold' }} onClick={onBack}>
          ← Back to Meal Preferences
        </button>

        {/* Flight Details */}
        <div className="summary-card">
          <div className="summary-card-header" onClick={() => setIsFlightOpen(!isFlightOpen)}>
            <div className="route-info">
              <div className="airline-name">{flight.airline || "Airline"}</div>
              <div className="time-range">{flight.timeRange} <span style={{fontSize:'12px', color:'#a0aec0'}}>{flight.nextDay}</span></div>
              <div className="duration-stops">{flight.durationStops}</div>
            </div>
            <div className="price-action">
              <span className={`expand-icon ${isFlightOpen ? 'active-icon' : ''}`}>▼ Details</span>
            </div>
          </div>

          {isFlightOpen && (
            <div className="summary-card-details">
              {flight.segments && flight.segments.map((seg, idx) => (
                <React.Fragment key={idx}>
                  <div className={`segment ${seg.isLast ? 'last-segment' : ''}`}>
                    <div className="dot"></div> 
                    <div className="segment-detail-row">
                      <span className="seg-time">{seg.depTime}</span>
                      <span className="seg-code">{seg.depCode}</span>
                    </div>
                    <div className="seg-meta">{seg.meta}</div>
                    <div className="segment-detail-row" style={{ marginTop: '15px' }}>
                      <span className="seg-time">{seg.arrTime}</span>
                      <span className="seg-code">{seg.arrCode}</span>
                    </div>
                    {seg.isLast && <div className="dot end-dot"></div>}
                  </div>
                  {!seg.isLast && flight.layover && <div className="layover-badge">{flight.layover}</div>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Travelers & Services */}
        <div className="summary-card card-padded">
          <div className="section-title">Travelers & Services</div>
          
          <div className="passenger-group">
            {passengers.map((p, idx) => (
              <div key={p.id || idx} className="passenger-row">
                <div className="passenger-header" onClick={() => togglePassenger(p.id)}>
                  <div className="p-info">
                    <span className="p-name">{idx + 1}. {p.name}</span>
                    <span className="p-type">{p.type}</span>
                  </div>
                  <span className={`p-toggle-icon ${openPassengers[p.id] ? 'active' : ''}`}>▼</span>
                </div>
                
                {openPassengers[p.id] && (
                  <div className="passenger-body">
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Seat</span>
                        <span className="detail-val">{p.seat || 'N/A'} <span className="detail-sub">{p.seatType}</span></span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Meal</span>
                        <span className="detail-val">{p.meal || 'STANDARD'} <span className="detail-sub">{p.mealDesc}</span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="total-row">
            <span className="total-label">Total Amount Due</span>
            <span className="total-amount">${pricing.totalAmount}</span>
          </div>
        </div>

        {/* Payment Form */}
        <div className="summary-card card-padded">
          <div className="section-title">Payment Details</div>
          
          <form onSubmit={handlePayment}>
            <div className="input-grid">
              <div className="input-group full-width cc-icon-container">
                <label>CARD NUMBER</label>
                <input type="text" className="form-input" placeholder="0000 0000 0000 0000" maxLength="19" required />
                <span className="cc-icons">💳</span>
              </div>
              <div className="input-group full-width">
                <label>CARDHOLDER NAME</label>
                <input type="text" className="form-input" placeholder="AJAI KUMAR" required />
              </div>
              <div className="input-group">
                <label>EXPIRY DATE</label>
                <input type="text" className="form-input" placeholder="MM/YY" maxLength="5" required />
              </div>
              <div className="input-group">
                <label>CVV / CVC</label>
                <input type="text" className="form-input" placeholder="123" maxLength="4" required />
              </div>
              <div className="input-group full-width">
                 <label>BILLING ZIP CODE</label>
                 <input type="text" className="form-input" placeholder="10001" required />
              </div>
            </div>

            <button type="submit" className="pay-btn" disabled={isPaying}>
              {isPaying ? 'Processing...' : `Pay $${pricing.totalAmount}`}
            </button>
            <div className="secure-badge">🔒 SSL Encrypted Transaction</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FlightSummary;