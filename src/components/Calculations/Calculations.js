import React, { useState } from 'react'
import * as d3 from 'd3';
import toread from './USA_NY_Buffalo.725280_TMY2.csv';
import { useSelector } from 'react-redux';
import { selectHours, selectMiles, selectRate } from '../../features/data/dataSlice';
  
function Calculations() {
  const hours = useSelector(selectHours);
  const miles = useSelector(selectMiles);
  const rate = useSelector(selectRate);

  const [initialBill, setInitialBill] = useState('');
  const [newRateABill, setNewRateABill] = useState('');
  const [newRateBBill, setNewRateBBill] = useState('');
  const [newRateBill, setNewRateBill] = useState('');
  //const [afternoonHour, setAfternoonHour] = useState(0);

  let afternoonHours = 0; // betw 12 and 6
  let otherHours = 0; 
  let total = 0;
  let temp = 0;
  // Obtain home load profile 
  const getInitialLoadProfile = async () => {
    await d3.csv(toread).then(data => {
      for(let i=0; i<data.length; i++) {
        if(data[i].Date.split(' ')[3].split(':')[0] >= 12 && data[i].Date.split(' ')[3].split(':')[0] <= 18) {
          afternoonHours += parseFloat(data[i].Electricity);
        } else  {
          otherHours += parseFloat(data[i].Electricity);
        }
      }
    });
  }

  // Calculate bill B1 based on initial load profile and rate the customer is on
  const calculateInitialBill = async () => {
    await getInitialLoadProfile().then(() => {
      if(rate === 1){
        total = afternoonHours+otherHours;
        total *= 0.15;
        setInitialBill(total);
      } else if(rate === 2) {
        total = (afternoonHours * 0.20) + (otherHours * 0.08);
        setInitialBill(total);
      }
    });
  }

  // Calculate load profile added by EV, typically consumes 0.3 kWh per mile driven
  const getEvLoadProfile = () => {
    return miles * 0.3;
  }

  // Calculate bill B2 based on combined load profile 
  const calculateNewBill = async () => {
    await calculateInitialBill().then(() => {
      //console.log('init hour: '+afternoonHours);

      // Add up home and EV load profiles
      if(hours === 1 || hours === 3) {
        afternoonHours += getEvLoadProfile();
      } else {
        otherHours += getEvLoadProfile();
      }
      // console.log('new hour: ' +afternoonHours);
      total = afternoonHours+otherHours;
      total *= 0.15;
      setNewRateABill(total);

      total = (afternoonHours * 0.20) + (otherHours * 0.08);
      setNewRateBBill(total);   
    });
  }

  // Calculate bill impact
  const calculateBillImpact = async () => {
      await calculateNewBill().then(() => {
        if(rate === 1) {
          setNewRateBill(newRateABill - initialBill);
          console.log(newRateBill)
        } else if(rate === 2) {
          setNewRateBill(newRateBBill - initialBill);
        }
      })
  }
  calculateBillImpact();
  console.log('initial bill: ' + initialBill); // loaad profile * rate
  console.log('new bill: '+ newRateABill) 
  console.log('rate b: ' + newRateBBill)




  return (
    <div className='calc'>
      <div className="calc_title">Your bill impact adds ${newRateBill} to your bill from ${initialBill} to ${newRateABill}</div>
      <div className="calc_title">Using other plan it would cost  
      {rate === 1 && newRateABill > newRateBBill ? (
        <div>{newRateBBill}. You should switch plans to save</div>
      ) : rate === 1 && newRateABill < newRateBBill ?(
        <div>{newRateBBill}. You have a good deal.</div>
      ) : rate === 2 && newRateBBill > newRateABill ? (
        <div>{newRateABill}. You should switch to save.</div>
      ) : (
        <div>{newRateABill}. You have the best deal.</div>
      )}
      </div>
      
    </div>
  )
}

export default Calculations