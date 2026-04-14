import React, { useState, useMemo } from 'react';
import './FlightSeatBooking.css';

const FlightSeatBooking = ({ seatData, maxSeats = 1, onBack, onConfirmSeatsFinal }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showLimitMsg, setShowLimitMsg] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleConfirmClick = async () => {
    setLoading(true);
    try {
      console.log('POST to https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flight/meals');
      const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flight/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          seats: selectedSeats,
          // Include any other relevant data from seatData
        })
      });

      let mealConfig = {};
      if (response.ok) {
        mealConfig = await response.json();
      } else {
        console.warn("API returned an error, using fallback meal config.");
        // Fallback matching HTML structure: create an entry for each selected seat/passenger
        const fallbackPassengers = selectedSeats.map((seat, index) => ({
          id: `p${index + 1}`,
          name: `Traveler ${index + 1} (${index === 0 ? 'Adult' : 'Child'})`
        }));
        mealConfig = { passengers: fallbackPassengers };
      }

      if (onConfirmSeatsFinal) {
        onConfirmSeatsFinal(mealConfig);
      }
    } catch (error) {
      console.error("Error confirming seats:", error);
      // Fallback
      const fallbackPassengers = selectedSeats.map((seat, index) => ({
        id: `p${index + 1}`,
        name: `Traveler ${index + 1}`
      }));
      if (onConfirmSeatsFinal) {
        onConfirmSeatsFinal({ passengers: fallbackPassengers });
      }
    } finally {
      setLoading(false);
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
            <div className="legend-item"><div className="legend-dot dot-select"></div> Selected</div>
            <div className="legend-item"><div className="legend-dot dot-occ">×</div> Occupied</div>
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
              disabled={selectedSeats.length !== maxSeats || loading}
              onClick={handleConfirmClick}
            >
              {loading 
                ? 'Processing...' 
                : (selectedSeats.length === maxSeats 
                  ? `Confirm ${selectedSeats.length} Seat(s)` 
                  : `Select ${maxSeats - selectedSeats.length} more seat(s)`)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSeatBooking;