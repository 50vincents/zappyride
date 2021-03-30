import React, { useEffect, useState, useRef }  from 'react'
import { useDispatch } from 'react-redux';
import { storeRate } from '../../features/data/dataSlice';
import './Rates.css';

function Rates({switchMilesAndRates}) {
  const dispatch = useDispatch();
  const [rate, setRate] = useState('');
  const isInitialMount = useRef(true);

  const storeData =  () => {
    dispatch(
      storeRate(rate)
    );
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
       // Your useEffect code here to be run on update
      storeData();
      switchMilesAndRates();
   }
  }, [rate])

  return (
    <div className='rates'>
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