import React, { useState } from "react";
import Rates from "../Rates/Rates";
import Miles from "../Miles/Miles";
import Hours from "../Hours/Hours";
import Calculations from "../Calculations/Calculations";
import "./Modal.css";

function Modal({showModal, setShowModal}) {
  const [showRates, setShowRates] = useState(true);
  const [showMiles, setShowMiles] = useState(false);
  const [showHours, setShowHours] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

  // Functions to switch to different components
  const switchMilesAndRates = () => {
    setShowMiles(!showMiles);
    setShowRates(!showRates);
  };

  const switchMilesAndHours = () => {
    setShowMiles(!showMiles);
    setShowHours(!showHours);
  };

  const switchHoursAndCalc = () => {
    setShowHours(!showHours);
    setShowCalc(!showCalc);
  }

  // Clear state when closed
  const resetWhenClosed = () => {
    setShowRates(true);
    setShowMiles(false);
    setShowHours(false);
    setShowCalc(false);
  };

  if(!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal_content">
        <button className="modal_button" onClick={() => {setShowModal(false); resetWhenClosed();}}>X</button>
        {showRates ?  (
          <Rates switchMilesAndRates={switchMilesAndRates} />
        ) : showMiles ? (
          <Miles switchMilesAndRates={switchMilesAndRates} switchMilesAndHours={switchMilesAndHours}/>
        ) : showHours ? (
          <Hours switchMilesAndHours={switchMilesAndHours} switchHoursAndCalc={switchHoursAndCalc}/>
        ) : showCalc ? (
          <Calculations switchHoursAndCalc={switchHoursAndCalc}/>
        ) :
          <></>
        }
      </div>
    </div>
  )
}

export default Modal