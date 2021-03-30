import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { storeHours } from '../../features/data/dataSlice';

import './Hours.css';

function Hours({switchMilesAndHours, switchHoursAndCalc}) {
  const dispatch = useDispatch();
  const [hours, setHours] = useState('');
  const isInitialMount = useRef(true);

  const storeData = () => {
    dispatch(
      storeHours(hours)
    );
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
       // Your useEffect code here to be run on update
      storeData();
      switchHoursAndCalc();
   }
  }, [hours])

  return (
    <div className="hours">
      <div className="hours_title">What hours of the day do you plan to charge?</div>
      <div className="hours_buttons">
        <button className="hours_button" onClick={() => setHours(1)}>Before noon</button>
        <button className="hours_button" onClick={() => setHours(2)}>Between noon and 6 pm</button>
        <button className="hours_button" onClick={() => setHours(3)}>After evening (6 pm)</button>
      </div>
      <button className="hours_button" onClick={() => switchMilesAndHours()}>Previous</button>
    </div>
  )
}
export default Hours