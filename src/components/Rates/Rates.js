import React, { useState }  from 'react'
import { useDispatch } from 'react-redux';
import { storeRate } from '../../features/data/dataSlice';
import './Rates.css';

function Rates({switchMilesAndRates}) {
  const dispatch = useDispatch();
  const [rate, setRate] = useState('');

  const storeData = () => {
    dispatch(
      storeRate(rate)
    );
  };

  return (
    <div className='rates'>
      <div className="rates_title">Let's get started...</div>
      <div className="rates_body">Which rate are you currently on?</div>
      <div className="rates_buttons">
        <button className="rates_button" onClick={() => setRate(1)}>Rate A </button>
        <button className="rates_button" onClick={() => setRate(2)}>Rate B </button>
      </div>
      <button className="rates_next" onClick={() => {switchMilesAndRates(); storeData();}}>Next</button>
    </div>
  )
}
export default Rates