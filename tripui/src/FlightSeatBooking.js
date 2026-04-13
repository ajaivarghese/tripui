import React, { useState, useMemo } from 'react';
import './FlightSeatBooking.css';

const FlightSeatBooking = ({ seatData, maxSeats = 1, onBack }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showLimitMsg, setShowLimitMsg] = useState(false);

  // Generate a deterministic but pseudo-random seat map for UI demonstration
  const seatMap = useMemo(() => {
    const map = {};
    for (let i = 10; i <= 30; i++) {
      ['A', 'B', 'C', 'D', 'E', 'F'].forEach(letter => {
        // Randomly assign ~30% as occupied based on a hash of the id
        const isOcc = (i * letter.charCodeAt(0)) % 10 < 3; 
        map[`${i}${letter}`] = isOcc;
      });
    }
    return map;
  }, []);

  const handleSeatClick = (seatId) => {
    if (seatMap[seatId]) return; // Occupied

    const isSelected = selectedSeats.includes(seatId);

    if (!isSelected && selectedSeats.length >= maxSeats) {
      setShowLimitMsg(true);
      return;
    } else {
      setShowLimitMsg(false);
    }

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const renderEconomyRows = () => {
    const rows = [];
    for (let i = 10; i <= 30; i++) {
      rows.push(
        <div className="seat-row" key={i}>
          <div className="row-num">{i}</div>
          {['A', 'B', 'C'].map(letter => {
            const seatId = `${i}${letter}`;
            return (
              <div 
                key={seatId}
                className={`seat-box ${seatMap[seatId] ? 'occupied' : ''} ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seatId)}
              ></div>
            );
          })}
          <div className="aisle"></div>
          {['D', 'E', 'F'].map(letter => {
            const seatId = `${i}${letter}`;
            return (
              <div 
                key={seatId}
                className={`seat-box ${seatMap[seatId] ? 'occupied' : ''} ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seatId)}
              ></div>
            );
          })}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="seat-booking-wrapper">
      <div className="seat-container">
        
        <button style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontWeight: 'bold' }} onClick={onBack}>
          ← Back to Passenger Details
        </button>

        <div className="seat-card">
          <div className="seat-title">Select Seats</div>
          <div className="seat-subtitle">Flight Assignment • {maxSeats} Passenger(s)</div>

          <div className="seat-legend">
            <div className="legend-item"><div className="legend-dot dot-avail"></div> Available</div>
            <div className="legend-item"><div class="legend-dot dot-select"></div> Selected</div>
            <div class="legend-item"><div class="legend-dot dot-occ">×</div> Occupied</div>
          </div>

          <div className="scroll-viewport">
            <div className="fuselage">
              
              <div className="cabin-label">Business Class</div>
              <div className="seat-row">
                <div className="row-num">1</div>
                <div className="seat-box business occupied"></div><div className="seat-box business"></div>
                <div className="aisle"></div>
                <div className="seat-box business"></div><div className="seat-box business occupied"></div>
              </div>
              <div className="seat-row">
                <div className="row-num">2</div>
                <div className="seat-box business"></div><div className="seat-box business"></div>
                <div className="aisle"></div>
                <div className="seat-box business occupied"></div><div className="seat-box business"></div>
              </div>

              <div className="cabin-label">Economy Class</div>
              {renderEconomyRows()}
              
              <div className="cabin-label" style={{ marginTop: '20px' }}>Rear Galley</div>
            </div>
          </div>

          <div className="seat-footer">
            {showLimitMsg && (
              <div className="limit-message">
                Maximum limit reached. You can only select {maxSeats} seat(s).
              </div>
            )}

            <div className="selected-seat-text">
              Selected: <span className="seat-code">{selectedSeats.length > 0 ? selectedSeats.join(', ') : '--'}</span>
            </div>
            
            <button 
              className="confirm-seat-btn" 
              disabled={selectedSeats.length !== maxSeats}
              onClick={() => alert(`Seats ${selectedSeats.join(', ')} Confirmed! Booking Complete.`)}
            >
              {selectedSeats.length === maxSeats 
                ? `Confirm ${selectedSeats.length} Seat(s)` 
                : `Select ${maxSeats - selectedSeats.length} more seat(s)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSeatBooking;