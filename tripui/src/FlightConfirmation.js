import React, { useState } from 'react';
import './FlightConfirmation.css';

const FlightConfirmation = ({ confirmationData, summaryData, onHome }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Fallbacks
  const bookingId = confirmationData?.bookingId || 'eJzTd921';
  const pnr = confirmationData?.pnr || '85JJU9';
  const amount = summaryData?.pricing?.totalAmount || '833.00';
  const flight = summaryData?.flight || {};
  const passengers = summaryData?.passengers || [];

  // Simple extraction for the route UI
  const getAirportCode = (locString) => locString ? locString.split(' ')[1] : 'JFK';

  const firstSeg = flight?.segments?.[0];
  const lastSeg = flight?.segments?.[flight.segments.length - 1];
  const depCode = firstSeg ? getAirportCode(firstSeg.depTime) : 'JFK';
  const arrCode = lastSeg ? getAirportCode(lastSeg.arrTime) : 'COK';

  // --- PDF GENERATION LOGIC ---
  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    
    // We dynamically load html2pdf from CDN to keep React bundle pure and simple
    if (!window.html2pdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = () => executePdfDownload();
      document.body.appendChild(script);
    } else {
      executePdfDownload();
    }
  };

  const executePdfDownload = () => {
    const element = document.getElementById('pdf-invoice-content');
    
    const opt = {
      margin:       0.5,
      filename:     `Flight_Invoice_${bookingId}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    window.html2pdf().set(opt).from(element).save().then(() => {
      setIsGeneratingPdf(false);
    });
  };

  return (
    <div className="conf-wrapper">
      <div className="conf-container">
        <button style={{ marginBottom: '20px', background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontWeight: 'bold' }} onClick={onHome}>
          ← Back to Dashboard
        </button>

        <div className="status-card">
          <div className="conf-card-header">
            <div className="header-icon">✓</div>
            <div className="header-text">Booking Confirmed</div>
          </div>

          <div className="invoice-body">
            <div className="success-banner">
              <h1 className="success-text">Flight Booked!</h1>
              <p className="success-sub">A confirmation email has been sent.</p>
            </div>

            <div className="action-row">
              <button className="btn-download" onClick={handleDownloadPdf} disabled={isGeneratingPdf}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                {isGeneratingPdf ? 'Generating PDF...' : 'Download Invoice (PDF)'}
              </button>
            </div>

            <div className="ref-card">
              <div className="ref-item">
                <span className="ref-label">Booking ID</span>
                <span className="ref-value">{bookingId}</span>
              </div>
              <div className="ref-divider"></div>
              <div className="ref-item">
                <span className="ref-label">PNR Reference</span>
                <span className="ref-value">{pnr}</span>
              </div>
            </div>

            <div className="conf-section-title">Itinerary</div>
            <div className="conf-flight-card">
              <div className="flight-route">
                <div className="airport-code">{depCode}</div>
                <div className="flight-line"></div>
                <div className="airport-code">{arrCode}</div>
              </div>
              <div className="flight-meta">
                <div className="meta-group">
                  <span className="meta-label">DATE</span>
                  <span className="meta-val">Oct 24, 2025</span>
                </div>
                <div className="meta-group" style={{ textAlign: 'center' }}>
                  <span className="meta-label">AIRLINE</span>
                  <span className="meta-val">{flight.airline?.split(' (')[0] || 'Airline'}</span>
                </div>
                <div className="meta-group" style={{ textAlign: 'right' }}>
                  <span className="meta-label">TIME</span>
                  <span className="meta-val">{flight.timeRange?.split(' ')[0] || '14:30'}</span>
                </div>
              </div>
            </div>

            <div className="payment-box">
              <div className="conf-section-title">Payment Breakdown</div>
              <div className="info-row">
                <span className="info-label">Payment Method</span>
                <div className="info-value payment-viz">
                  <div className="card-icon"></div>
                  <span>Visa •••• 4242</span>
                </div>
              </div>
              <div className="info-row">
                <span className="info-label">Base Fare ({passengers.length} Travelers)</span>
                <span className="info-value">${(parseFloat(amount) - 116.40).toFixed(2)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Taxes & Fees</span>
                <span className="info-value">$116.40</span>
              </div>
              <div className="info-row total">
                <span className="info-label">Total Paid</span>
                <span className="info-value">${amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- HIDDEN PDF CONTENT: Contains full summary, flight info, and services --- */}
      <div id="pdf-invoice-content" className="pdf-hidden-container">
        <h1 style={{ color: '#2b6cb0', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>Flight Booking Invoice</h1>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', marginTop: '20px' }}>
            <div>
                <strong>Booking ID:</strong> {bookingId}<br/>
                <strong>PNR:</strong> {pnr}<br/>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
            </div>
            <div style={{ textAlign: 'right' }}>
                <h2 style={{ margin: 0, color: '#2d3748' }}>Total Paid: ${amount}</h2>
                <p style={{ margin: 0, color: '#718096' }}>Visa •••• 4242</p>
            </div>
        </div>

        <h3 style={{ backgroundColor: '#edf2f7', padding: '10px', marginTop: '30px' }}>Flight Details</h3>
        <p><strong>Airline:</strong> {flight.airline}</p>
        <p><strong>Route:</strong> {depCode} to {arrCode}</p>
        <p><strong>Time:</strong> {flight.timeRange} {flight.nextDay}</p>
        <p><strong>Duration & Stops:</strong> {flight.durationStops}</p>

        <h3 style={{ backgroundColor: '#edf2f7', padding: '10px', marginTop: '30px' }}>Traveler & Services</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
                <tr style={{ borderBottom: '1px solid #cbd5e0', textAlign: 'left' }}>
                    <th style={{ padding: '8px 0' }}>Name</th>
                    <th>Type</th>
                    <th>Seat</th>
                    <th>Meal Preference</th>
                </tr>
            </thead>
            <tbody>
                {passengers.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px 0', fontWeight: 'bold' }}>{p.name}</td>
                        <td>{p.type}</td>
                        <td>{p.seat} ({p.seatType})</td>
                        <td>{p.meal}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div style={{ marginTop: '50px', fontSize: '12px', color: '#a0aec0', textAlign: 'center' }}>
            Thank you for booking with us. Have a safe flight!
        </div>
      </div>
    </div>
  );
};

export default FlightConfirmation;