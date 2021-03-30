import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { storeHours } from '../../features/data/dataSlice';

import './Hours.css';

function Hours({switchMilesAndHours, switchHoursAndCalc}) {
  const dispatch = useDispatch();
  const [hours, setHours] = useState('');

  const storeData = () => {
    dispatch(
      storeHours(hours)
    );
  };

  return (
    <div className="hours">
      <div className="hours_title">What hours of the day do you plan to charge?</div>
      <div className="hours_buttons">
        <button className="hours_button" onClick={() => {setHours(1); storeData(); switchHoursAndCalc();}}>Before Noon</button>
        <button className="hours_button" onClick={() => {setHours(2); storeData(); switchHoursAndCalc();}}>Between Noon and 6 PM</button>
        <button className="hours_button" onClick={() => {setHours(3); storeData(); switchHoursAndCalc();}}>After Evening (6 PM)</button>
      </div>
      <button className="hours_button" onClick={() => switchMilesAndHours()}>Previous</button>
    </div>
  )
}

export default Hours
