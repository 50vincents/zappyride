import React from 'react';
import './App.css';
import Rate from './components/Rate/Rate';

function App() {
  return (
    <div className="App">
      <Rate/>
    </div>
  );
}

export default App;

// electricBill(loadprofile, electricrate, timeperiod)

// load profile - electricity used over time period considered... measured in kWh (kw per hour), kW is derivative of kWh over time
// *sampled per hour - sequence of electricity usage over time
// ex: load profile of a home for a yr is (365 days/year) * (24 hrs a day) = 8760 values
// LP(t) with t=1,2.....8760

// electric rate - how load profile is processed into dollar amount for electric bill
// flat rate - set $/kWh value applied to load profile
// ex: flat rate of $0.10/kwh and home uses 5 kwh every hour, total bill for year is $0.10 * 5 * 8760
// block rate: layering flat rates on top of eachother based on energy usage fora month
// ex: $0.10/kwh for first 1000 kwh of month, 0.15/kwh for every kwh above 1000
// home uses 1200 kwh for a month, bill = $0.10*1000 + 0.15*200 = $30

// impact of EV on electric bill
// 1) obtain home load profile (including every non ev load... refrig, ac)
// 2) calculate bill b1 based on initial load profile aand rate that customer is on -- this is what homeowner is paying to electric company
// 3) calculate load profile added by the ev - based on how much energy it needs and when it is charged --- usually 0.3 kwh per mile driven
// 4) add home load profile and ev load profile
// 5) caalculate bill b2 baasedd on new loada profile (potentially w diff rate)
// 6) bill impact = b2 - b1

// task
// 1) request from user input(rate currently on, miles user will drive per year, what hours of day they plan to charge)
// 2) calculate bill impact
// 3) display - bill impact of charging ev under each rate / whether or not they should switch rates

