import React from 'react'

function Hours({switchMilesAndHours}) {
  return (
    <div>
      <div className="hours_title">What hours of the day do you plan to charge?</div>
      <button className="hours_previous" onClick={() => switchMilesAndHours()}>Previous</button>
    </div>
  )
}

export default Hours
