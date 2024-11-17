import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const updateSongView = createAsyncThunk(
  'update/songView',
  async (song_id:number) => {
    const response = await useCallAPI('PUT', `${URL_API}update/song-view?song_id=${song_id}`)
    return response
  }
)
const songSlice = createSlice({
  name: 'song',
  initialState: {
    updateSongViewResponse: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSongView.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(updateSongView.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSongViewResponse = action.payload
      })
      .addCase(updateSongView.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while update song view data';
      });
  }
})
export default songSlice.reducer;