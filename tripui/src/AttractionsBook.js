import React, { useState } from 'react';
import './AttractionsBook.css';

const AttractionsBook = ({ htmlContent, targetItem, onBack }) => {
  const [ticketCount, setTicketCount] = useState(2);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [isSuccess, setIsSuccess] = useState(false);

  // Base state array initialization mapping directly from source JS logic
  const cartItems = targetItem ? [
    { 
      id: targetItem.id, 
      title: targetItem.title, 
      type: targetItem.type || "Attraction", 
      basePrice: targetItem.numericPrice !== undefined 
        ? targetItem.numericPrice 
        : parseFloat(targetItem.price?.replace(/[^0-9.]/g, '')) || 25.00 
    }
  ] : [
    { id: 2, title: "Skyline Zipline Adventure", type: "Adventure", basePrice: 45.00 },
    { id: 1, title: "City Royal Museum", type: "Culture", basePrice: 15.00 }
  ];

  // Core checkout calculations extracted from calculateTotal() logic
  const subtotalBase = cartItems.reduce((acc, item) => acc + item.basePrice, 0);
  const subtotalTotal = subtotalBase * ticketCount;
  const taxesFees = subtotalTotal * 0.10;
  const grandTotal = subtotalTotal + taxesFees;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !emailAddress.trim()) {
      alert("Please fill out your Name and Email before booking.");
      return;
    }
    
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="attraction-book-wrapper">
      {/* Dynamic string bypass fallback check */}
      {htmlContent && htmlContent.includes('<html') ? (
        <iframe 
          title="Dynamic Attraction Booking Screen" 
          srcDoc={htmlContent} 
          className="attraction-book-iframe"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      ) : (
        <div className="container">
          
          <button className="book-back-link" onClick={onBack}>
            ← Back to Activities
          </button>
          
          <h1>Complete Your Booking</h1>
          <div className="subtitle">
            Review your itinerary and enter your details to finalize.
          </div>

          {/* Success Overlay matching source output verbatim */}
          {isSuccess && (
            <div id="success-message" style={{ display: 'block' }}>
              🎉 Booking Confirmed! Your itinerary and tickets have been emailed to you.
            </div>
          )}

          {!isSuccess && (
            <form onSubmit={handleBookingSubmit} className="checkout-flow">
              
              {/* 1. Trip Details */}
              <div className="panel">
                <div className="panel-title">1. Trip Details</div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="tour-date">Select Date</label>
                    <input 
                      type="date" 
                      id="tour-date" 
                      required 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ticket-count">Number of Tickets</label>
                    <input 
                      type="number" 
                      id="ticket-count" 
                      min="1" 
                      max="10" 
                      required 
                      value={ticketCount}
                      onChange={(e) => setTicketCount(parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Lead Traveler Information */}
              <div className="panel">
                <div className="panel-title">2. Lead Traveler Information</div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input 
                      type="text" 
                      id="fname" 
                      placeholder="Jane" 
                      required 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input 
                      type="text" 
                      id="lname" 
                      placeholder="Doe" 
                      required 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="jane.doe@example.com" 
                    required 
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="text" 
                    id="phone" 
                    placeholder="+1 (555) 000-0000" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* 3. Order details (Mapped exactly sequentially below Lead Traveler) */}
              <div className="panel">
                <div className="panel-title">3. Order details</div>
                
                <div id="cart-items">
                  {cartItems.map((item, idx) => (
                    <div className="cart-item" key={idx}>
                      <div className="item-details">
                        <span className="item-title">{item.title}</span>
                        <span className="item-type">{item.type}</span>
                      </div>
                      <span className="item-price">${item.basePrice.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '20px' }}>
                  <div className="totals-row">
                    <span>Subtotal</span>
                    <span>${subtotalTotal.toFixed(2)}</span>
                  </div>
                  <div className="totals-row">
                    <span>Taxes & Fees (10%)</span>
                    <span>${taxesFees.toFixed(2)}</span>
                  </div>
                  <div className="totals-row grand-total">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button type="submit" className="book-btn">
                  Confirm & Pay
                </button>
              </div>

            </form>
          )}

        </div>
      )}
    </div>
  );
};

export default AttractionsBook;