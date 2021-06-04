import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from '../Interfaces/planet.interface'

const initialState: Planet[] | [] = [];

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Planet[]>):Planet [] => {
      return [...state, ...action.payload];
    },
    clearOrder: (state):[] => {
      return [];
    },
  },
});

export const { createOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
