import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from '../Interfaces/planet.interface'
import { RootState } from './store';

const initialState: Planet[] | [] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    updateCart: (state: any, action: PayloadAction<Planet>):any => {
      return [...state, action.payload];
    },
    clearCart: (state):any => {
      return [];
    },
  },
});

export const { updateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
