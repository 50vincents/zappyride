import React, { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux";
import { storeHours } from "../../features/data/dataSlice";
import "./Hours.css";

function Hours({switchMilesAndHours, switchHoursAndCalc}) {
  const dispatch = useDispatch();
  const [hours, setHours] = useState('');
  const isInitialMount = useRef(true);

  const storeData = () => {
    dispatch(
      storeHours(hours)
    );
  };

  // Store data on value change of hour and move to next screen
  // Ignores initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
      storeData();
      switchHoursAndCalc();
   }
  }, [hours])

  return (
    <div className="hours">
      <div className="hours_title">What hours of the day do you plan to charge?</div>
      <div className="hours_buttons">
        <button className="hours_button" onClick={() => setHours(1)}>Before 12 PM</button>
        <button className="hours_button" onClick={() => setHours(2)}>Between 12 PM and 6 PM</button>
        <button className="hours_button" onClick={() => setHours(3)}>After 6 PM</button>
      </div>
      <button className="hours_previous" onClick={() => switchMilesAndHours()}>Previous</button>
    </div>
  )
}

export default Hours