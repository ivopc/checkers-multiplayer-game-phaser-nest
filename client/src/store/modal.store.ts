
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  displayRules: false,
  displayHistory: false,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    /**
     * Changes the visibility of the rules modal.
     */
    setDisplayRules: (state, action) => {
      state.displayRules = action.payload;
    },
    /**
     * Changes the visibility of the history modal.
     */
    setDisplayHistory: (state, action) => {
      state.displayHistory = action.payload;
    },
  },
});

export const { setDisplayRules, setDisplayHistory } =
  modalSlice.actions;

export default modalSlice.reducer;