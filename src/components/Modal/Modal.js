import React, { useState } from 'react'
import Rates from '../Rates/Rates';
import Miles from '../Miles/Miles';
import Hours from '../Hours/Hours';
import './Modal.css';

function Modal({showModal, setShowModal}) {
  const [showRates, setShowRates] = useState(true);
  const [showMiles, setShowMiles] = useState(false);
  const [showHours, setShowHours] = useState(false);
  
  const switchMilesAndRates = () => {
    setShowMiles(!showMiles);
    setShowRates(!showRates);
  };

  const switchMilesAndHours = () => {
    setShowMiles(!showMiles);
    setShowHours(!showHours);
  };

  const resetWhenClosed = () => {
    setShowRates(true);
    setShowMiles(false);
    setShowHours(false);
  };

  if(!showModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal_content">
        {showRates ?  (
          <Rates switchMilesAndRates={switchMilesAndRates} />
        ) : showMiles ? (
          <Miles switchMilesAndRates={switchMilesAndRates} switchMilesAndHours={switchMilesAndHours}/>
        ) : showHours ? (
          <Hours switchMilesAndHours={switchMilesAndHours}/>
        ) :
          <></>
        }
        <button className="butt" onClick={() => {setShowModal(false); resetWhenClosed();}}>Close</button>
      </div>
    </div>
  )

  
}

export default Modal
