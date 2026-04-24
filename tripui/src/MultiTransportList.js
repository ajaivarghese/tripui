import React, { useState } from 'react';
import './MultiTransportList.css';

const MultiTransportList = ({ transportData, onBack }) => {
  const [openGroups, setOpenGroups] = useState({
    flights: true,
    trains: true,
    buses: true
  });

  const toggleGroup = (id) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="multi-transport-wrapper">
      <div className="multi-transport-container">
        
        <button className="back-header-btn" onClick={onBack}>
          ← Back to Timeline
        </button>

        <h1>New York ➝ Washington D.C.</h1>
        <div className="route-info">Wed, Oct 25 • 1 Traveler</div>

        {/* --- FLIGHTS SECTION --- */}
        <div className={`mode-header ${openGroups.flights ? 'active' : ''}`} onClick={() => toggleGroup('flights')}>
          <span className="mode-icon">✈️</span>
          <span className="mode-title">Flights</span>
          <span className="mode-count">2 options</span>
          <span className="toggle-arrow">▼</span>
        </div>

        <div id="flights" className={`transport-group ${openGroups.flights ? 'open' : ''}`}>
          <div className="group-inner">
            {/* Flight 1 */}
            <div className="transport-card">
              <div className="card-header">
                <div className="provider-info">
                  <div className="provider-logo" style={{ color: '#2b6cb0' }}>DL</div>
                  <span className="provider-name">Delta Airlines</span>
                </div>
                <span className="price-tag">$185</span>
              </div>
              <div className="card-body">
                <div className="time-group">
                  <span className="time-text">08:30 AM</span>
                  <span className="location-text">JFK - Terminal 4</span>
                </div>
                <div className="duration-container">
                  <span className="duration-text">1h 15m</span>
                  <div className="visual-line"></div>
                  <span className="duration-text" style={{ marginTop: '5px', fontSize: '11px', color: '#38a169' }}>Non-stop</span>
                </div>
                <div className="time-group" style={{ textAlign: 'right' }}>
                  <span className="time-text">09:45 AM</span>
                  <span className="location-text">DCA - Terminal B</span>
                </div>
              </div>
              <div className="card-footer">
                <div className="details-left">
                  <span className="detail-badge seat-type">💺 Economy</span>
                  <span className="detail-badge availability">9 seats left</span>
                </div>
                <button className="book-btn">Select</button>
              </div>
            </div>

            {/* Flight 2 */}
            <div className="transport-card">
              <div className="card-header">
                <div className="provider-info">
                  <div className="provider-logo" style={{ color: '#c53030' }}>AA</div>
                  <span className="provider-name">American Airlines</span>
                </div>
                <span className="price-tag">$240</span>
              </div>
              <div className="card-body">
                <div className="time-group">
                  <span className="time-text">02:00 PM</span>
                  <span className="location-text">LGA - Terminal C</span>
                </div>
                <div className="duration-container">
                  <span className="duration-text">1h 20m</span>
                  <div className="visual-line"></div>
                  <span className="duration-text" style={{ marginTop: '5px', fontSize: '11px', color: '#38a169' }}>Non-stop</span>
                </div>
                <div className="time-group" style={{ textAlign: 'right' }}>
                  <span className="time-text">03:20 PM</span>
                  <span className="location-text">DCA - Terminal C</span>
                </div>
              </div>
              <div className="card-footer">
                <div className="details-left">
                  <span className="detail-badge seat-type" style={{ backgroundColor: '#e9d8fd', color: '#553c9a' }}>💎 Business Class</span>
                  <span className="detail-badge availability low">Only 2 seats left</span>
                </div>
                <button className="book-btn">Select</button>
              </div>
            </div>
          </div>
        </div>

        {/* --- TRAINS SECTION --- */}
        <div className={`mode-header ${openGroups.trains ? 'active' : ''}`} onClick={() => toggleGroup('trains')}>
          <span className="mode-icon">🚆</span>
          <span className="mode-title">Trains</span>
          <span className="mode-count">2 options</span>
          <span className="toggle-arrow">▼</span>
        </div>

        <div id="trains" className={`transport-group ${openGroups.trains ? 'open' : ''}`}>
          <div className="group-inner">
            {/* Train 1 */}
            <div className="transport-card train-mode">
              <div className="card-header">
                <div className="provider-info">
                  <div className="provider-logo" style={{ color: '#2b6cb0' }}>AM</div>
                  <span className="provider-name">Amtrak Northeast Regional</span>
                </div>
                <span className="price-tag">$45</span>
              </div>
              <div className="card-body">
                <div className="time-group">
                  <span className="time-text">10:00 AM</span>
                  <span className="location-text">NYP - Moynihan Hall</span>
                </div>
                <div className="duration-container">
                  <span className="duration-text">3h 25m</span>
                  <div className="visual-line"></div>
                </div>
                <div className="time-group" style={{ textAlign: 'right' }}>
                  <span className="time-text">01:25 PM</span>
                  <span className="location-text">WAS - Union Station</span>
                </div>
              </div>
              <div className="card-footer">
                <div className="details-left">
                  <span className="detail-badge seat-type">💺 Coach Seat</span>
                  <span className="detail-badge availability">Plenty available</span>
                </div>
                <button className="book-btn">Select</button>
              </div>
            </div>

            {/* Train 2 */}
            <div className="transport-card train-mode">
              <div className="card-header">
                <div className="provider-info">
                  <div className="provider-logo" style={{ color: '#2b6cb0' }}>AC</div>
                  <span className="provider-name">Acela Express</span>
                </div>
                <span className="price-tag">$160</span>
              </div>
              <div className="card-body">
                <div className="time-group">
                  <span className="time-text">05:00 PM</span>
                  <span className="location-text">NYP - Moynihan Hall</span>
                </div>
                <div className="duration-container">
                  <span className="duration-text">2h 50m</span>
                  <div className="visual-line"></div>
                  <span className="duration-text" style={{ marginTop: '5px', fontSize: '11px', color: '#d69e2e' }}>High Speed</span>
                </div>
                <div className="time-group" style={{ textAlign: 'right' }}>
                  <span className="time-text">07:50 PM</span>
                  <span className="location-text">WAS - Union Station</span>
                </div>
              </div>
              <div className="card-footer">
                <div className="details-left">
                  <span className="detail-badge seat-type" style={{ backgroundColor: '#e9d8fd', color: '#553c9a' }}>💎 First Class</span>
                  <span className="detail-badge availability low">3 seats left</span>
                </div>
                <button className="book-btn">Select</button>
              </div>
            </div>
          </div>
        </div>

        {/* --- BUSES SECTION --- */}
        <div className={`mode-header ${openGroups.buses ? 'active' : ''}`} onClick={() => toggleGroup('buses')}>
          <span className="mode-icon">🚌</span>
          <span className="mode-title">Buses</span>
          <span className="mode-count">1 option</span>
          <span className="toggle-arrow">▼</span>
        </div>

        <div id="buses" className={`transport-group ${openGroups.buses ? 'open' : ''}`}>
          <div className="group-inner">
            {/* Bus 1 */}
            <div className="transport-card bus-mode">
              <div className="card-header">
                <div className="provider-info">
                  <div className="provider-logo" style={{ color: '#2d3748' }}>MB</div>
                  <span className="provider-name">Megabus</span>
                </div>
                <span className="price-tag">$29</span>
              </div>
              <div className="card-body">
                <div className="time-group">
                  <span className="time-text">06:00 AM</span>
                  <span className="location-text">NYC - Port Authority</span>
                </div>
                <div className="duration-container">
                  <span className="duration-text">4h 45m</span>
                  <div className="visual-line"></div>
                </div>
                <div className="time-group" style={{ textAlign: 'right' }}>
                  <span className="time-text">10:45 AM</span>
                  <span className="location-text">WAS - Union Station Deck</span>
                </div>
              </div>
              <div className="card-footer">
                <div className="details-left">
                  <span className="detail-badge seat-type">💺 Standard Recliner</span>
                  <span className="detail-badge availability">20+ seats</span>
                </div>
                <button className="book-btn">Select</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MultiTransportList;