import React, { useState } from 'react';
import './AdventureActivityList.css';

const INITIAL_ACTIVITIES = [
  {
    id: 1,
    title: "White Water Rafting",
    location: "Rishikesh, India",
    image: "https://via.placeholder.com/400x250/3182ce/ffffff?text=Rafting",
    difficulty: "Moderate",
    duration: "3 Hours",
    groupSize: "4-8",
    ageLimit: "14+",
    price: "$45",
    desc: "Navigate through the thrilling rapids of the Ganges river surrounded by stunning mountain views."
  },
  {
    id: 2,
    title: "Mountain Trekking",
    location: "Swiss Alps",
    image: "https://via.placeholder.com/400x250/2f855a/ffffff?text=Trekking",
    difficulty: "Hard",
    duration: "2 Days",
    groupSize: "5-15",
    ageLimit: "18+",
    price: "$150",
    desc: "A challenging trek reaching high altitudes with overnight camping under the stars."
  },
  {
    id: 3,
    title: "Paragliding",
    location: "Pokhara, Nepal",
    image: "https://via.placeholder.com/400x250/ed8936/ffffff?text=Paragliding",
    difficulty: "Easy",
    duration: "30 Mins",
    groupSize: "1",
    ageLimit: "10+",
    price: "$85",
    desc: "Soar above the clouds and enjoy panoramic views of the lake and Himalayas."
  },
  {
    id: 4,
    title: "Scuba Diving",
    location: "Great Barrier Reef",
    image: "https://via.placeholder.com/400x250/0bc5ea/ffffff?text=Scuba",
    difficulty: "Moderate",
    duration: "1 Hour",
    groupSize: "2-4",
    ageLimit: "12+",
    price: "$120",
    desc: "Explore vibrant coral reefs and swim alongside exotic marine life in crystal clear waters."
  },
  {
    id: 5,
    title: "Zip Lining",
    location: "Costa Rica Rainforest",
    image: "https://via.placeholder.com/400x250/48bb78/ffffff?text=Zip+Line",
    difficulty: "Easy",
    duration: "45 Mins",
    groupSize: "1",
    ageLimit: "8+",
    price: "$60",
    desc: "Fly through the rainforest canopy at high speeds on one of the longest ziplines."
  },
  {
    id: 6,
    title: "Rock Climbing",
    location: "Yosemite, USA",
    image: "", // MISSING IMAGE Test
    difficulty: "Hard",
    duration: "4 Hours",
    groupSize: "2",
    ageLimit: "16+",
    price: "$95",
    desc: "Test your strength and endurance scaling vertical granite walls with expert guides."
  }
];

const AdventureActivityList = ({ onSelectActivity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingId, setLoadingId] = useState(null); // Track loading state per button

  const handleBookNow = async (activity) => {
    setLoadingId(activity.id);
    try {
      console.log(`POST to https://travelapi.myvnc.com/adventure/view for ID: ${activity.id}`);
      
      // Simulate API call to backend
      // In a real app: const res = await fetch('https://travelapi.myvnc.com/adventure/view', { method: 'POST', body: JSON.stringify({id: activity.id}) });
      // const data = await res.json();
      
      // Mocking the response with the single activity data structure requested
      const mockResponse = {
        id: activity.id,
        title: activity.title, // Use clicked title
        location: activity.location,
        images: [
          "https://via.placeholder.com/600x400/2d3748/ffffff?text=Volcano+Summit+View",
          "https://via.placeholder.com/600x400/ed8936/ffffff?text=Trekking+Path",
          "https://via.placeholder.com/600x400/48bb78/ffffff?text=Crater+Rim+Walk"
        ],
        difficulty: activity.difficulty,
        price: activity.price,
        duration: activity.duration,
        groupSize: activity.groupSize,
        altitude: "1,717m",
        ageLimit: activity.ageLimit,
        description: `Detailed description for ${activity.title}. Experience the magic of this adventure. We begin under the starlight, trekking up to reach the summit just in time to watch the sun rise above the clouds.`,
        itinerary: [
          { time: "02:00 AM", title: "Pickup", desc: "Private transfer from your hotel to the base camp." },
          { time: "04:00 AM", title: "Begin Activity", desc: "Start the adventure. The path is exciting." },
          { time: "06:00 AM", title: "Peak Moment", desc: "Reach the highlight of the trip. Enjoy the views." },
          { time: "12:00 PM", title: "Return", desc: "Drop off at your hotel." }
        ],
        essentials: [ "🥾 Good Shoes", "🧥 Warm Jacket", "🔦 Headlamp", "💧 Water Bottle" ]
      };

      // Simulate network delay
      setTimeout(() => {
        onSelectActivity(mockResponse);
        setLoadingId(null);
      }, 800);

    } catch (error) {
      console.error("Error fetching activity details:", error);
      alert("Failed to load details");
      setLoadingId(null);
    }
  };

  const filteredActivities = INITIAL_ACTIVITIES.filter(act => 
    act.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    act.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="adv-container">
      <h1 className="adv-header-title">🏔️ Explore Adventures</h1>

      <div className="search-wrapper">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search activities (e.g. Rafting, Trekking)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="activity-grid">
        {filteredActivities.length > 0 ? (
          filteredActivities.map(act => {
            let badgeClass = 'diff-easy';
            if (act.difficulty === 'Moderate') badgeClass = 'diff-mod';
            if (act.difficulty === 'Hard') badgeClass = 'diff-hard';

            return (
              <div key={act.id} className="adv-card">
                <div className="img-box">
                  {act.image ? (
                    <img src={act.image} alt={act.title} />
                  ) : (
                    <div className="no-image-text">
                      <span style={{fontSize: '24px'}}>📷</span>
                      No Image Available
                    </div>
                  )}
                  <div className={`diff-badge ${badgeClass}`}>{act.difficulty}</div>
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <div className="adv-title">{act.title}</div>
                    <div className="adv-loc">📍 {act.location}</div>
                  </div>

                  <div className="adv-desc">{act.desc}</div>

                  <div className="stats-row">
                    <div className="stat-item">
                      <span className="stat-icon">⏱</span>
                      <span className="stat-label">Time</span>
                      <span className="stat-val">{act.duration}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon">👥</span>
                      <span className="stat-label">Group</span>
                      <span className="stat-val">{act.groupSize}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon">🎂</span>
                      <span className="stat-label">Age</span>
                      <span className="stat-val">{act.ageLimit}</span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="price-box">
                      <span className="price-lbl">Starting From</span>
                      <span className="price-val">{act.price}</span>
                    </div>
                    <button 
                      className="list-book-btn" 
                      onClick={() => handleBookNow(act)}
                      disabled={loadingId === act.id}
                    >
                      {loadingId === act.id ? 'Loading...' : 'Book Now'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <p>No adventures found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdventureActivityList;