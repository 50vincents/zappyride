import React, { useEffect, useState, useRef }  from "react"
import { useDispatch } from "react-redux";
import { storeRate } from "../../features/data/dataSlice";
import "./Rates.css";

function Rates({switchMilesAndRates}) {
  const dispatch = useDispatch();
  const [rate, setRate] = useState('');
  const isInitialMount = useRef(true);

  const storeData =  () => {
    dispatch(
      storeRate(rate)
    );
  };

  // When Rate button is clicked, value will change
  // On change, data is stored in Redux and move to next screen 
  // Does not advance on first mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
      storeData();
      switchMilesAndRates();
   }
  }, [rate])

  return (
    <div className="rates">
      <div className="rates_title">Let's get started...</div>
      <div className="rates_body">Which rate are you currently on?</div>
      <div className="rates_buttons">
        <button className="rates_button" onClick={() => setRate(1)}>Rate A </button>
        <button className="rates_button" onClick={() => setRate(2)}>Rate B </button>
      </div>
    </div>
  )
}

export default Rates