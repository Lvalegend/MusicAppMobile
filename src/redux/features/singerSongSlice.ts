import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type SingerSongParams = {
  page?: number;
  limit?: number;
  singer_id?: number;
  song_id?: number;
}

export const getSingerSongData = createAsyncThunk(
  'get/singerSongData',
  async (props?: SingerSongParams) => {
    const response = await useCallAPI('GET', `${URL_API}get-data/relationship/singer-song?page=${props?.page}&limit=${props?.limit}&singer_id=${props?.singer_id}&song_id=${props?.song_id}`);
    return response;
  }
);

const singerSongSlice = createSlice({
  name: 'singerSong',
  initialState: {
    singerResponse: null,
    songResponse: null,
    bothResponse: null,
    paginationResponse: null,
    response: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingerSongData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingerSongData.fulfilled, (state, action) => {
        state.loading = false;

        const { singer_id, song_id, page, limit } = action.meta.arg || {};

        if (singer_id && song_id) {
          state.bothResponse = action.payload;
        } else if (singer_id) {
          state.singerResponse = action.payload;
        } else if (song_id) {
          state.songResponse = action.payload;
        } else if (page && limit) {
          state.paginationResponse = action.payload;
        } else {
          state.response = action.payload;
        }
      })
      .addCase(getSingerSongData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching singer-song data';
      });
  }
});

export default singerSongSlice.reducer;
