import React, { useState }  from 'react'
import './Rates.css';

function Rates({switchMilesAndRates}) {
  const [rate, setRate] = useState('');

  return (
    <div className='rates'>
      <div className="rates_title">Let's get started</div>
      <div className="rates_body">Which rate are you currently on?</div>
      <div className="rates_buttons">
        <button className="rates_button" onClick={() => switchMilesAndRates()}>Rate A </button>
        <button className="rates_button" onClick={() => switchMilesAndRates()}>Rate B </button>
      </div>
    </div>
  )
}

export default Rates
