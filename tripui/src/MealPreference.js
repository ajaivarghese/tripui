import React from 'react';
import './MealPreference.css';

const MealPreference = ({ passengers, onSave }) => {
  return (
    <div className="container">
      <div className="card">
        <div className="form-title">Meal & Dietary Preferences</div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
          {passengers.map((passenger, index) => (
            <div key={passenger.id || index}>
              {/* Passenger Name (ReadOnly) */}
              <div className="input-grid">
                <div className="input-group full-width">
                  <label>Passenger {index + 1}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={`Traveler ${passenger.id}`} 
                    readOnly 
                  />
                </div>
              </div>

              {/* Meal Selection */}
              <div className="input-grid">
                <div className="input-group full-width">
                  <label>Special Meal Request</label>
                  <select className="form-input">
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

              {/* Allergies */}
              <div className="input-grid">
                <div className="input-group full-width">
                  <label>Allergies / Medical Notes</label>
                  <input type="text" className="form-input" placeholder="e.g. Peanuts, Shellfish" />
                </div>
              </div>

               {/* Beverages */}
               <div className="input-grid">
                <div className="input-group full-width">
                  <label>Beverage Preference</label>
                  <input type="text" className="form-input" placeholder="e.g. Diet Coke, Orange Juice" />
                </div>
              </div>

              {/* Divider if there are more passengers */}
              {index < passengers.length - 1 && <hr className="meal-divider" />}
            </div>
          ))}

          <button type="submit" className="submit-btn">Save Preferences</button>
        </form>
      </div>
    </div>
  );
};

export default MealPreference;