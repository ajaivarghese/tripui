import React, { useState, useEffect } from 'react';
import './FlightMealPreference.css';

const FlightMealPreference = ({ mealConfig, onBack, onSavePreferences }) => {
  const [loading, setLoading] = useState(false);
  const [currentPassengerId, setCurrentPassengerId] = useState(null);
  
  // Initialize state based on passed config. 
  // Expecting mealConfig.passengers to be an array: [{ id: 'p1', name: 'John' }, ...]
  const [passengerData, setPassengerData] = useState({});

  useEffect(() => {
    if (mealConfig && mealConfig.passengers && mealConfig.passengers.length > 0) {
      const initialData = {};
      mealConfig.passengers.forEach((p) => {
        initialData[p.id] = {
          meal: 'STANDARD',
          allergies: '',
          beverage: ''
        };
      });
      setPassengerData(initialData);
      setCurrentPassengerId(mealConfig.passengers[0].id);
    } else {
        // Fallback if empty config
        setPassengerData({'p1': { meal: 'STANDARD', allergies: '', beverage: '' }});
        setCurrentPassengerId('p1');
    }
  }, [mealConfig]);

  const handleUpdate = (field, value) => {
    setPassengerData(prev => ({
      ...prev,
      [currentPassengerId]: {
        ...prev[currentPassengerId],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      console.log('POST to https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flight/summary');
      
      const response = await fetch('https://cuddly-fortnight-4w4xx4vwwwrh4qj-8000.app.github.dev/trip/flight/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences: passengerData })
      });
      
      const summaryData = await response.json();
      
      if (onSavePreferences) {
        onSavePreferences(summaryData);
      }
    } catch (error) {
      console.error("Error saving meal preferences:", error);
      // Fallback
      if (onSavePreferences) {
          onSavePreferences({ status: "success", data: passengerData });
      }
    } finally {
      setLoading(false);
    }
  };

  const passengersList = mealConfig?.passengers || [{ id: 'p1', name: 'Traveler 1' }];
  const currentData = passengerData[currentPassengerId] || { meal: 'STANDARD', allergies: '', beverage: '' };

  return (
    <div className="meal-wrapper">
      <div className="meal-container">
        <button style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontWeight: 'bold' }} onClick={onBack}>
          ← Back to Seat Selection
        </button>

        <div className="meal-card">
          <div className="form-title">Meal & Dietary Preferences</div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="input-grid">
              <div className="input-group full-width">
                <label>Select Passenger</label>
                <select 
                  className="form-input" 
                  value={currentPassengerId || ''} 
                  onChange={(e) => setCurrentPassengerId(e.target.value)}
                >
                  {passengersList.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-grid">
              <div className="input-group full-width">
                <label>Special Meal Request</label>
                <select 
                  className="form-input" 
                  value={currentData.meal}
                  onChange={(e) => handleUpdate('meal', e.target.value)}
                >
                  <option value="STANDARD">Standard Meal (No Preference)</option>
                  <option value="VGML">VGML - Vegetarian Vegan Meal</option>
                  <option value="KSML">KSML - Kosher Meal</option>
                  <option value="GFML">GFML - Gluten-Free Meal</option>
                  <option value="DBML">DBML - Diabetic Meal</option>
                  <option value="NLML">NLML - Low Lactose / Nut Free</option>
                  <option value="CHML">CHML - Child Meal</option>
                </select>
                <div className="helper-text">Requests must be made at least 24 hours before departure.</div>
              </div>
            </div>

            <div className="input-grid">
              <div className="input-group full-width">
                <label>Allergies / Medical Notes</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Peanuts, Shellfish, Strawberries" 
                  value={currentData.allergies}
                  onChange={(e) => handleUpdate('allergies', e.target.value)}
                />
              </div>
            </div>

            <div className="input-grid">
              <div className="input-group full-width">
                <label>Beverage Preference</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Diet Coke, Orange Juice" 
                  value={currentData.beverage}
                  onChange={(e) => handleUpdate('beverage', e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
               {loading ? 'Saving...' : 'Save All Preferences'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FlightMealPreference;