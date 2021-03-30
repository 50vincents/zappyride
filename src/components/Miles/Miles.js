import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { storeMiles } from "../../features/data/dataSlice";
import "./Miles.css";

function Miles({switchMilesAndRates, switchMilesAndHours}) {
  const dispatch = useDispatch();
  const [miles, setMiles] = useState('');
  const [valid, setValid] = useState(true);

  const storeData = () => {
    dispatch(
      storeMiles(miles)
    );
  };

  const handleKeyUp = (e) => {
    // Enter
    if (e.keyCode === 13) {
      if(miles === '') {
        setValid(false);
      } else {
        storeData();
        switchMilesAndHours();
      }
    }
  }

// storeData(); switchMilesAndHours();
  return (
    <div className="miles">
      <div className="miles_title">How many miles do you drive a year?</div>
      {valid ? (
        <input 
        className="miles_input" 
        value={miles} 
        onChange={e => setMiles(e.target.value)}
        placeholder="Enter miles"
        onKeyUp={handleKeyUp}
        />
      ) : (
        <>
        <input 
        className="miles_input" 
        value={miles} 
        onChange={e => setMiles(e.target.value)}
        placeholder="Enter miles"
        onKeyUp={handleKeyUp}
        />
        <div className="miles_invalid">Please enter miles driven</div>
        </>
      )}  
      <div className="miles_buttons">
        <button className="miles_button" onClick={() => switchMilesAndRates()}>Previous</button>
      </div>
    </div>
  )
}

export default Miles