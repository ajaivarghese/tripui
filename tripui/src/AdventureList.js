import React, { useState, useEffect } from 'react';
import './AdventureList.css';

const AdventureList = ({ htmlData, onBack }) => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');

  useEffect(() => {
    // In a real scenario, you'd parse the HTML or have the API return JSON.
    // For this implementation, we replicate the "database" from the HTML.
    const activityData = [
      { id: 1, title: "White Water Rafting", location: "Rishikesh, India", category: "Water Sports", difficulty: "Moderate", duration: "3 Hours", groupSize: "4-8", ageLimit: "14+", price: "$45", desc: "Navigate through the thrilling rapids of the Ganges river..." },
      { id: 2, title: "Mountain Trekking", location: "Swiss Alps", category: "Trekking", difficulty: "Hard", duration: "2 Days", groupSize: "5-15", ageLimit: "18+", price: "$150", desc: "A challenging trek reaching high altitudes with overnight camping..." },
      { id: 3, title: "Paragliding", location: "Pokhara, Nepal", category: "Air Sports", difficulty: "Easy", duration: "30 Mins", groupSize: "1", ageLimit: "10+", price: "$85", desc: "Soar above the clouds and enjoy panoramic views..." },
      { id: 4, title: "Scuba Diving", location: "Great Barrier Reef", category: "Water Sports", difficulty: "Moderate", duration: "1 Hour", groupSize: "2-4", ageLimit: "12+", price: "$120", desc: "Explore vibrant coral reefs and swim alongside exotic marine life..." },
      { id: 5, title: "Zip Lining", location: "Costa Rica Rainforest", category: "Zip Line", difficulty: "Easy", duration: "45 Mins", groupSize: "1", ageLimit: "8+", price: "$60", desc: "Fly through the rainforest canopy at high speeds..." },
      { id: 6, title: "Rock Climbing", location: "Yosemite, USA", category: "Climbing", difficulty: "Hard", duration: "4 Hours", groupSize: "2", ageLimit: "16+", price: "$95", desc: "Test your strength and endurance scaling vertical granite walls..." }
    ];
    setActivities(activityData);
    setFilteredActivities(activityData);
  }, []);

  useEffect(() => {
    const filtered = activities.filter(a => {
      const textMatch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        a.location.toLowerCase().includes(searchTerm.toLowerCase());
      const catMatch = (currentCategory === 'All') || (a.category === currentCategory);
      return textMatch && catMatch;
    });
    setFilteredActivities(filtered);
  }, [searchTerm, currentCategory, activities]);

  return (
    <div className="adventure-container">
      <button className="back-btn" onClick={onBack}>← Back to Timeline</button>
      <h1>🏔️ Explore Adventures</h1>

      <div className="controls-wrapper">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search activities..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filter-row">
          {['All', 'Water Sports', 'Trekking', 'Air Sports', 'Zip Line', 'Climbing'].map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${currentCategory === cat ? 'active' : ''}`}
              onClick={() => setCurrentCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="activity-grid">
        {filteredActivities.map(act => (
          <div className="adv-card" key={act.id}>
            <div className="img-box">
               <div className={`diff-badge diff-${act.difficulty.toLowerCase().substring(0,3)}`}>{act.difficulty}</div>
               <div className="cat-badge">{act.category}</div>
               <span style={{fontSize: '48px'}}>🏔️</span>
            </div>
            <div className="card-content">
              <div className="adv-title">{act.title}</div>
              <div className="adv-loc">📍 {act.location}</div>
              <p className="adv-desc">{act.desc}</p>
              <div className="stats-row">
                <div className="stat-item"><span>⏱</span><small>TIME</small><b>{act.duration}</b></div>
                <div className="stat-item"><span>👥</span><small>GROUP</small><b>{act.groupSize}</b></div>
                <div className="stat-item"><span>🎂</span><small>AGE</small><b>{act.ageLimit}</b></div>
              </div>
              <div className="card-footer">
                <div className="price-box"><small>Starting From</small><span className="price-val">{act.price}</span></div>
                <button className="book-btn" onClick={() => alert(`Booking ${act.title}`)}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdventureList;