import React, { useState } from 'react';
import './TrainListMulti.css';

const FALLBACK_TRAINS = [
  {
    id: 1,
    name: "Amtrak Northeast Connection",
    number: "174 / 2150",
    type: "Multi-Segment",
    depTime: "09:15", depStn: "WAS",
    arrTime: "18:30", arrStn: "BOS",
    duration: "9h 15m | 1 Transfer",
    segments: [
      { depTime: "09:15", depLoc: "Washington Union (WAS)", arrTime: "12:45", arrLoc: "New York Penn (NYP)", meta: "Northeast Regional #174" },
      { depTime: "15:00", depLoc: "Moynihan Train Hall (NYP)", arrTime: "18:30", arrLoc: "Boston South (BOS)", meta: "Acela Express #2150" }
    ],
    layover: "⏳ 2h 15m Layover in New York • Transfer to Moynihan Hall (5 min walk)",
    classes: [
      { type: "Coach", name: "Coach", price: "$145", status: "AVL 45", color: "status-avl" },
      { type: "Business", name: "Business", price: "$280", status: "AVL 12", color: "status-avl" },
      { type: "First", name: "First Class", price: "$410", status: "WL 2", color: "status-wl" }
    ]
  },
  {
    id: 2,
    name: "Direct Acela Express",
    number: "2104",
    type: "High-Speed",
    depTime: "11:00", depStn: "WAS",
    arrTime: "17:45", arrStn: "BOS",
    duration: "6h 45m | Direct",
    segments: [
      { depTime: "11:00", depLoc: "Washington Union (WAS)", arrTime: "17:45", arrLoc: "Boston South (BOS)", meta: "Acela Express #2104" }
    ],
    layover: null,
    classes: [
      { type: "Business", name: "Business", price: "$320", status: "AVL 14", color: "status-avl" },
      { type: "First", name: "First Class", price: "$510", status: "WL 5", color: "status-wl" }
    ]
  },
  {
    id: 3,
    name: "Keystone & Regional Combo",
    number: "640 / 176",
    type: "Multi-Segment",
    depTime: "08:00", depStn: "WAS",
    arrTime: "19:15", arrStn: "BOS",
    duration: "11h 15m | 1 Transfer",
    segments: [
      { depTime: "08:00", depLoc: "Washington Union (WAS)", arrTime: "10:30", arrLoc: "Philadelphia 30th St (PHL)", meta: "Keystone Service #640" },
      { depTime: "13:00", depLoc: "Philadelphia 30th St (PHL)", arrTime: "19:15", arrLoc: "Boston South (BOS)", meta: "Northeast Regional #176" }
    ],
    layover: "⏳ 2h 30m Layover in Philadelphia • Stay at 30th Street Station",
    classes: [
      { type: "Coach", name: "Coach", price: "$95", status: "AVL 120", color: "status-avl" },
      { type: "Business", name: "Business", price: "$180", status: "AVL 30", color: "status-avl" }
    ]
  }
];

const TrainListMulti = ({ trainData, onBack, onSelectTrain }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCardId, setActiveCardId] = useState(null);
  
  // Store selected class index for each train. Default to 0.
  const [selectedClasses, setSelectedClasses] = useState({});

  const toggleCard = (id) => {
    setActiveCardId(activeCardId === id ? null : id);
  };

  const handleClassSelect = (trainId, classIdx, e) => {
    e.stopPropagation();
    setSelectedClasses(prev => ({ ...prev, [trainId]: classIdx }));
  };

  const displayTrains = trainData && trainData.length > 0 ? trainData : FALLBACK_TRAINS;

  const filteredTrains = displayTrains.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.number.includes(searchTerm)
  );

  return (
    <div className="train-list-wrapper">
      <div className="train-container">
        
        <button style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontWeight: 'bold' }} onClick={onBack}>
          ← Back to Itinerary
        </button>

        <h1 className="header-title">Train Booking</h1>

        <div className="route-card">
          <div className="route-point">
            <span className="route-label">From</span>
            <span className="route-value">Washington (WAS)</span>
          </div>
          <div className="route-arrow">➝</div>
          <div className="route-point">
            <span className="route-label">To</span>
            <span className="route-value">Boston (BOS)</span>
          </div>
          <div className="divider"></div>
          <div className="route-point">
            <span className="route-label">Date</span>
            <span className="route-value date-value">📅 Oct 25</span>
          </div>
        </div>

        <div className="search-wrapper">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search by Train Name or Number..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        {filteredTrains.length > 0 ? (
          filteredTrains.map((train) => {
            const isActive = activeCardId === train.id;
            const selectedClassIdx = selectedClasses[train.id] || 0;
            const currentPrice = train.classes[selectedClassIdx].price;

            return (
              <div key={train.id} className={`train-card ${isActive ? 'active' : ''}`}>
                
                <div className="card-top" onClick={() => toggleCard(train.id)}>
                  <div className="train-name-group">
                    <div className="train-icon">🚆</div>
                    <div className="train-info-stack">
                      <div className="train-name">{train.name}</div>
                      <div className="train-number">#{train.number}</div>
                    </div>
                  </div>
                  <div className="train-type">{train.type}</div>
                </div>

                <div className="card-schedule" onClick={() => toggleCard(train.id)}>
                  <div className="time-col">
                    <span className="t-time">{train.depTime}</span>
                    <span className="t-stn">{train.depStn}</span>
                  </div>
                  <div className="duration-col">
                    <span className="dur-val">{train.duration}</span>
                    <div className="dur-line"></div>
                  </div>
                  <div className="time-col" style={{ textAlign: 'right' }}>
                    <span className="t-time">{train.arrTime}</span>
                    <span className="t-stn">{train.arrStn}</span>
                  </div>
                </div>
                
                <span className="expand-icon" onClick={() => toggleCard(train.id)}>▼ View Full Route Details</span>

                {/* Multi-Segment Dropdown */}
                <div className="card-details">
                  {train.segments.map((seg, idx) => {
                    const isLast = idx === train.segments.length - 1;
                    return (
                      <React.Fragment key={idx}>
                        <div className={`segment ${isLast ? 'last-segment' : ''}`}>
                          <div className="dot"></div>
                          <div className="segment-detail-row">
                            <span className="seg-time">{seg.depTime}</span>
                            <span className="seg-loc">{seg.depLoc}</span>
                          </div>
                          <div className="seg-meta">{seg.meta}</div>
                          <div className="segment-detail-row" style={{ marginTop: '15px' }}>
                            <span className="seg-time">{seg.arrTime}</span>
                            <span className="seg-loc">{seg.arrLoc}</span>
                          </div>
                          {isLast && <div className="dot end-dot"></div>}
                        </div>
                        {!isLast && train.layover && (
                          <div className="layover-badge">{train.layover}</div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* --- UPDATED CLASS SECTION --- */}
                <div className="class-section">
                  <div className="class-label">Select Class</div>
                  <div className="class-options">
                    {train.classes.map((cls, idx) => (
                      <div 
                        key={idx} 
                        className={`class-btn ${selectedClassIdx === idx ? 'selected' : ''}`}
                        onClick={(e) => handleClassSelect(train.id, idx, e)}
                      >
                        <span className="cls-name">{cls.type}</span>
                        <div className="class-bottom-row">
                           <span className={`cls-status ${cls.color}`}>{cls.status}</span>
                           <span className="cls-price">• {cls.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-footer">
                  <div className="price-display">
                    <span className="final-price">{currentPrice}</span>
                    <span className="price-sub">per passenger</span>
                  </div>
                  <button 
                    className="book-btn" 
                    onClick={() => {
                        const selectedClassDetails = train.classes[selectedClassIdx];
                        if (onSelectTrain) onSelectTrain(train, selectedClassDetails);
                    }}
                  >
                    Book Ticket
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <p>No trains found matching your search.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrainListMulti;