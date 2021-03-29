import React from 'react'

function Miles({switchMilesAndRates, switchMilesAndHours}) {
  return (
    <div>
      <div className="miles_title">How many miles do you drive a year?</div>
      <input type="text" className="miles_input"/>
      <button className="rates_previous" onClick={() => switchMilesAndRates()}>Previous</button>
      <button className="rates_next" onClick={() => switchMilesAndHours()}>Next</button>
    </div>
  )
}

export default Miles
