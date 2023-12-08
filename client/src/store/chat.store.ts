
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  displayChat: true,
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    /**
     * Changes the visibility of the chat
     */
    setDisplayChat: (state, action) => {
      state.displayChat = action.payload;
    },
  },
});

export const { setDisplayChat } =
  chatSlice.actions;

export default chatSlice.reducer;