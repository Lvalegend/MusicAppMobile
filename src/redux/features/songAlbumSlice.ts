import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getSongAlbumData = createAsyncThunk(
  'get/songAlbumData',
  async () => {
    const response = await useCallAPI('GET', `${URL_API}get-data/relationship/song-album`)
    return response
  }
)
const songAlbumSlice = createSlice({
  name: 'songAlbum',
  initialState: {
    response: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSongAlbumData.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getSongAlbumData.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(getSongAlbumData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching album data';
      });
  }
})
export default songAlbumSlice.reducer;