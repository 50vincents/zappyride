import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    hours: 0,
    miles: 0,
    rate: 0,
  },

  reducers: {
    storeHours: (state, action) => {
      state.hours = action.payload;
    },
    storeMiles: (state, action) => {
      state.miles = action.payload;
    },
    storeRate: (state, action) => {
      state.rate = action.payload;
    },
  },
});

export const { storeHours, storeMiles, storeRate } = dataSlice.actions;
export const selectHours = (state) => state.data.hours;
export const selectMiles = (state) => state.data.miles;
export const selectRate = (state) => state.data.rate;

export default dataSlice.reducer;
