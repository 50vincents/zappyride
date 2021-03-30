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
        <button className="hours_button" onClick={() => {setHours(1); storeData(); switchHoursAndCalc();}}>Before noon</button>
        <button className="hours_button" onClick={() => {setHours(2); storeData(); switchHoursAndCalc();}}>Between noon and 6 pm</button>
        <button className="hours_button" onClick={() => {setHours(3); storeData(); switchHoursAndCalc();}}>After evening (6 pm)</button>
      </div>
      <button className="hours_previous" onClick={() => switchMilesAndHours()}>Previous</button>
    </div>
  )
}

export default Hours
