import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser:any = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    const response = await useCallAPI('POST', `${URL_API}register`, true, undefined, userData)
    return response;
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    registerResponse: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerResponse = action.payload;
      })
      .addCase(registerUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default registerSlice.reducer;
