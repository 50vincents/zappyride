import React, { useState }  from 'react'
import './Rates.css';

function Rates({switchMilesAndRates}) {
  const [rate, setRate] = useState('');

  return (
    <div className='rates'>
      <div className="rates_title">Let's get started...</div>
      <div className="rates_body">Which rate are you currently on?</div>
      <div className="rates_buttons">
        <button className="rates_button" onClick={() => setRate('A')}>Rate A </button>
        <button className="rates_button" onClick={() => setRate('B')}>Rate B </button>
      </div>
      <button className="rates_next" onClick={() => switchMilesAndRates()}>Next</button>
    </div>
  )
}

export default Rates
