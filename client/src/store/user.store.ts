
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { store } from '.';

const initialState = {
  accessToken: null,
  userData: {},
}

export const fetchUserData = createAsyncThunk("user/fetchUserData", async () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${store.getState().user.accessToken}`);

  const response = await fetch(`${apiUrl}/auth/whoami`, {
    headers
  });
  return response.json();
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Sets the user access token.
     */
    setUserAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      console.log("Can't fetch user data", action.payload);
    });
  }
});

export const { setUserAccessToken } =
  userSlice.actions;

export default userSlice.reducer;