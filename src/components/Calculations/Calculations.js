import React, { useState } from "react"
import { useSelector } from "react-redux";
import * as d3 from "d3";
import dataFile from "./USA_NY_Buffalo.725280_TMY2.csv";
import { selectHours, selectMiles, selectRate } from "../../features/data/dataSlice";
import "./Calculations.css";

function Calculations({switchHoursAndCalc}) {
  const hours = useSelector(selectHours);
  const miles = useSelector(selectMiles);
  const rate = useSelector(selectRate);

  const [initialBill, setInitialBill] = useState('');
  const [newRateABill, setNewRateABill] = useState('');
  const [newRateBBill, setNewRateBBill] = useState('');
  const [billImpact, setbillImpact] = useState('');

  let afternoonHours = 0; // Between 12 and 6
  let otherHours = 0; // Other
  let total = 0;

  // Obtain home load profile 
  const getInitialLoadProfile = async () => {
    await d3.csv(dataFile).then(data => {
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

      // Add up home and EV load profiles
      if(hours === 1 || hours === 3) {
        afternoonHours += getEvLoadProfile();
      } else {
        otherHours += getEvLoadProfile();
      }

      // Bill B2 based on Rate A
      total = afternoonHours+otherHours;
      total *= 0.15;
      setNewRateABill(total);

      // Bill B2 based on Rate B
      total = (afternoonHours * 0.20) + (otherHours * 0.08);
      setNewRateBBill(total);   
    });
  }

  // Calculate bill impact
  const calculateBillImpact = async () => {
      await calculateNewBill().then(() => {
        if(rate === 1) {
          setbillImpact(newRateABill - initialBill);
        } else if(rate === 2) {
          setbillImpact(newRateBBill - initialBill);
        }
      })
  }

  calculateBillImpact();

  return (
    <div className="calculations">
      <div className="calculations_title">Converting to EV would add <span className="calculations_highlight">${Math.round(billImpact * 100) / 100}</span> to your bill.</div>
      {rate === 1 ? (
        <div className="calculations_details">Your new bill would be <span className="calculations_highlight">${Math.round(newRateABill * 100) / 100}</span> up from <span className="calculations_highlight">${Math.round(initialBill * 100) / 100}</span>.</div>
      ) : rate === 2 ? (
        <div className="calculations_details">Your new bill would be <span className="calculations_highlight">${Math.round(newRateBBill * 100) / 100}</span> up from <span className="calculations_highlight">${Math.round(initialBill * 100) / 100}</span>.</div>
      ) : (
        <></>
      )
      }
      {rate === 1 && newRateABill > newRateBBill ? (
        <div className="calculations_plan">Your current plan is <span className="calculations_highlight">Rate A</span>. By switching to <span className="calculations_highlight">Rate B</span>, your monthly cost would be <span className="calculations_highlight">${Math.round(newRateBBill * 100) / 100}</span>, saving <span className="calculations_highlight">${Math.round((newRateABill-newRateBBill) * 100) / 100}</span>.</div>
      ) : rate === 1 && newRateABill < newRateBBill ?(
        <div className="calculations_plan">Your current plan is <span className="calculations_highlight">Rate A</span>. With <span className="calculations_highlight">Rate B</span>, your monthly cost would be ${Math.round(newRateBBill * 100) / 100}. You already have the best deal.</div>
      ) : rate === 2 && newRateBBill > newRateABill ? (
        <div className="calculations_plan">Your current plan is <span className="calculations_highlight">Rate B</span>. By switching to <span className="calculations_highlight">Rate A</span>, your monthly cost would be <span className="calculations_highlight">${Math.round(newRateABill * 100) / 100}</span>, saving <span className="calculations_highlight">${Math.round((newRateBBill-newRateABill) * 100) / 100}</span>.</div>
      ) : rate === 2 && newRateBBill < newRateABill ? (
        <div className="calculations_plan">Your current plan is <span className="calculations_highlight">Rate B</span>. With <span className="calculations_highlight">Rate A</span>, your monthly cost would be <span className="calculations_highlight">${Math.round(newRateABill * 100) / 100}</span>. You already have the best deal.</div>
      ) : (
        <></>
      )}
      <div className="calculations_rates">For reference, Rate A has a flat rate of $0.15/kWh. Rate B is a TOU rate of $0.20/kWh from 12-6 PM, and $0.08/kWh otherwise.</div>
      <button className="calculations_button" onClick={() => switchHoursAndCalc()}>Previous</button>

    </div>
  )
}

export default Calculations