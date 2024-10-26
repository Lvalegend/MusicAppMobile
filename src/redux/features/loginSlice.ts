import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser:any = createAsyncThunk(
  'auth/loginUser',
  async (userData) => {
    const response = await useCallAPI('POST', `${URL_API}login`, true, undefined, userData)
    return response;
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    response: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(loginUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default loginSlice.reducer;
