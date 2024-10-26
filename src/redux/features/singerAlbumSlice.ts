import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type SingerAlbumParams = {
  page?: number;
  limit?: number;
  singer_id?: number;
  album_id?: number;
}

export const getSingerAlbumData = createAsyncThunk(
  'get/singerAlbumData',
  async (props?: SingerAlbumParams) => {
    const response = await useCallAPI('GET', `${URL_API}get-data/relationship/singer-album?page=${props?.page}&limit=${props?.limit}&singer_id=${props?.singer_id}&album_id=${props?.album_id}`);
    return response;
  }
);

const singerAlbumSlice = createSlice({
  name: 'singerAlbum',
  initialState: {
    singerResponse: null,
    albumResponse: null,
    bothResponse: null,
    paginationResponse: null,
    response: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingerAlbumData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingerAlbumData.fulfilled, (state, action) => {
        state.loading = false;

        const { singer_id, album_id, page, limit } = action.meta.arg || {};

        if (singer_id && album_id) {
          state.bothResponse = state.bothResponse ? [...state.bothResponse, ...action.payload] : action.payload;
        } else if (singer_id) {
          state.singerResponse = state.singerResponse ? [...state.singerResponse, ...action.payload] : action.payload;
        } else if (album_id) {
          state.albumResponse = state.albumResponse ? [...state.albumResponse, ...action.payload] : action.payload;
        } else if (page && limit) {
          state.paginationResponse = state.paginationResponse ? [...state.paginationResponse, ...action.payload] : action.payload;
        } else {
          state.response = state.response ? [...state.response, ...action.payload] : action.payload;
        }
      })
      .addCase(getSingerAlbumData.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching singer-song data';
      });
  }
});

export default singerAlbumSlice.reducer;
