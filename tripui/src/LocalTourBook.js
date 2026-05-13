import React, { useState, useMemo } from 'react';
import './LocalTourBook.css';

const LocalTourBook = ({ htmlContent, onBack }) => {
  // --- STATE MANAGEMENT ---
  // Default values matching the extraction from local_tours_book.html
  const [tourDate, setTourDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [ticketCount, setTicketCount] = useState(2);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Controls transition between form and success banner
  const [isConfirmed, setIsConfirmed] = useState(false);

  // --- EXTRACTED CART DATA ---
  // Static dataset embedded in the original source script
  const cartItems = useMemo(() => [
    { id: 2, title: "Skyline Zipline Adventure", type: "Adventure", basePrice: 45.00 },
    { id: 1, title: "City Royal Museum", type: "Culture", basePrice: 15.00 }
  ], []);

  // Ensure ticket count stays at 1 or above to prevent invalid mathematical results
  const validTicketCount = ticketCount > 0 ? Number(ticketCount) : 1;

  // --- DYNAMIC CALCULATIONS ---
  // Mirrors updateCartDisplay() logic from source HTML
  const { subtotal, tax, total } = useMemo(() => {
    let currentSubtotal = 0;
    cartItems.forEach(item => {
      currentSubtotal += item.basePrice * validTicketCount;
    });
    
    const calculatedTax = currentSubtotal * 0.10; // 10% taxes & fees calculation
    return {
      subtotal: currentSubtotal,
      tax: calculatedTax,
      total: currentSubtotal + calculatedTax
    };
  }, [cartItems, validTicketCount]);

  // --- FORM SUBMISSION HANDLER ---
  const handleSubmitBooking = (e) => {
    e.preventDefault();
    
    // Core validation check extracted from submitBooking()
    if (!firstName || !email) {
      alert("Please fill out your Name and Email before booking.");
      return;
    }

    // Toggle completion view and scroll up naturally
    setIsConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="tour-book-wrapper">
      <div className="tour-book-container">
        {/* Navigation Link */}
        <button type="button" className="tour-book-back-link" onClick={onBack}>
          &larr; Back to Activities
        </button>
        
        <h1>Complete Your Booking</h1>
        <div className="tour-book-subtitle">
          Review your itinerary and enter your details to finalize.
        </div>

        {/* Success Alert Banner */}
        {isConfirmed && (
          <div className="tour-book-success-message">
            🎉 Booking Confirmed! Your itinerary and tickets have been emailed to you.
          </div>
        )}

        {/* Dynamic Form Content */}
        {!isConfirmed && (
          <form className="tour-book-checkout-grid" onSubmit={handleSubmitBooking}>
            
            {/* Input Columns */}
            <div className="tour-book-main-column">
              
              {/* Panel 1: Trip Details */}
              <div className="tour-book-panel">
                <div className="tour-book-panel-title">1. Trip Details</div>
                <div className="tour-book-form-row">
                  <div className="tour-book-form-group">
                    <label htmlFor="tour-date">Select Date</label>
                    <input 
                      type="date" 
                      id="tour-date" 
                      value={tourDate}
                      onChange={(e) => setTourDate(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="tour-book-form-group">
                    <label htmlFor="ticket-count">Number of Tickets</label>
                    <input 
                      type="number" 
                      id="ticket-count" 
                      value={ticketCount}
                      min="1" 
                      max="10"
                      onChange={(e) => setTicketCount(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Panel 2: Lead Traveler Information */}
              <div className="tour-book-panel">
                <div className="tour-book-panel-title">2. Lead Traveler Information</div>
                <div className="tour-book-form-row">
                  <div className="tour-book-form-group">
                    <label htmlFor="fname">First Name</label>
                    <input 
                      type="text" 
                      id="fname" 
                      placeholder="Jane" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="tour-book-form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input 
                      type="text" 
                      id="lname" 
                      placeholder="Doe" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="tour-book-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="jane.doe@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="tour-book-form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="text" 
                    id="phone" 
                    placeholder="+1 (555) 000-0000" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

            </div>

            {/* Sidebar Summary Column */}
            <div className="tour-book-side-column">
              <div className="tour-book-panel">
                <div className="tour-book-panel-title">Itinerary Summary</div>
                
                {/* Dynamically Populated Cart Items */}
                <div className="tour-book-cart-items">
                  {cartItems.map((item) => {
                    const itemTotal = item.basePrice * validTicketCount;
                    return (
                      <div className="tour-book-cart-item" key={item.id}>
                        <div className="tour-book-item-details">
                          <span className="tour-book-item-title">{item.title}</span>
                          <span className="tour-book-item-type">
                            {item.type} 
                            <span className="tour-book-attendee-badge">
                              👥 {validTicketCount} Attendee(s)
                            </span>
                          </span>
                        </div>
                        <span className="tour-book-item-price">
                          ${itemTotal.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Financial Breakdowns */}
                <div className="tour-book-totals-container">
                  <div className="tour-book-totals-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="tour-book-totals-row">
                    <span>Taxes & Fees (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="tour-book-totals-row tour-book-grand-total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button type="submit" className="tour-book-submit-btn">
                  Confirm & Pay
                </button>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default LocalTourBook;