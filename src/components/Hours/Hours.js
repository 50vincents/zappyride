import React, {useState} from 'react'

function Hours({switchMilesAndHours}) {
  const [hours, setHours] = useState('');

  return (
    <div>
      <div className="hours_title">What hours of the day do you plan to charge?</div>
      <input 
        className="hours_input" 
        value={hours} 
        onChange={e => setHours(e.target.value)}
        placeholder="Enter hours"
      />
      <button className="hours_previous" onClick={() => switchMilesAndHours()}>Previous</button>
    </div>
  )
}

export default Hours
