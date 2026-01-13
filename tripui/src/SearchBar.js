import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setTerm(event.target.value);
  };

  const handleClear = () => {
    setTerm('');
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (!term) return;

    setIsLoading(true);

    try {
      // POST request to your FastAPI backend
      const response = await fetch('http://localhost:8000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: term }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('FastAPI Response:', data);
      
    } catch (error) {
      console.error('Error submitting search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={onFormSubmit} className="search-form">
        
        {/* Row 1: Input and Clear Button */}
        <div className="input-group">
          <input
            type="text"
            className="search-input"
            value={term}
            onChange={handleInputChange}
            placeholder="Search destination..."
            disabled={isLoading}
          />
          
          {/* Clear button appears only when there is text */}
          {term && (
            <button 
              type="button" 
              className="clear-btn" 
              onClick={handleClear}
              title="Clear search"
            >
              &#x2715;
            </button>
          )}
        </div>

        {/* Row 2: Submit Button */}
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        
      </form>
    </div>
  );
};

export default SearchBar;
