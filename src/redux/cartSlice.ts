import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from '../Interfaces/planet.interface'

const initialState: Planet[] | [] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<Planet>):Planet[] | [] => {
      return [...state, action.payload];
    },
    deleteSingleItem: (state, action: PayloadAction<Planet>):Planet[] | []=> {
      const newState: Planet[] = [];
      let deleted: Boolean = false;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id !== action.payload.id) {
          newState.push(state[i]);
        } else if (state[i].id === action.payload.id && !deleted) {
          deleted = true;
        } else {
          newState.push(state[i]);
        }
      }
      return newState;
    },
    deleteAllOfSingleType: (state, action: PayloadAction<Planet>):Planet[] | [] => {
      const newState: Planet[] = [];
      for (let i = 0; i < state.length; i++) {
        if (state[i].id !== action.payload.id) newState.push(state[i]);
      }
      return newState;
    },
    clearCart: (state): [] => {
      return [];
    },
  },
});

export const { updateCart, clearCart, deleteSingleItem, deleteAllOfSingleType } = cartSlice.actions;
export default cartSlice.reducer;
