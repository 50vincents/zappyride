import React, { useState } from 'react'
import './Miles.css';

function Miles({switchMilesAndRates, switchMilesAndHours}) {
  const [miles, setMiles] = useState('');

  return (
    <div className="miles">
      <div className="miles_title">How many miles do you drive a year?</div>
      <input 
        className="miles_input" 
        value={miles} 
        onChange={e => setMiles(e.target.value)}
        placeholder="Enter miles"
      />
      <div className="miles_buttons">
        <button className="miles_button" onClick={() => switchMilesAndRates()}>Previous</button>
        <button className="miles_button" onClick={() => switchMilesAndHours()}>Next</button>
      </div>
    </div>
  )
}

export default Miles
