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
    singerRelationshipNoAlbumResponse: null,
    albumRelationshipNoSingerResponse: null,
    bothRelationshipSingerAlbumResponse: null,
    paginationSingerAlbumResponse: [],
    paginationSingerOrAlbumResponse: null,
    paginationSingerAndAlbumResponse: null,
    singerAlbumResponse: null,
    loading: false,
    error: null,
    hasMore: true
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
        const actionChange = { filterSingerId: singer_id || null, filterAlbumId: album_id || null, limit: limit, page: page, ...action.payload }
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];
        if(payloadArray.length < limit){
          state.hasMore = false;
        }
        else {
          state.hasMore = true;
        }

        if (singer_id && album_id && page && limit) {
          state.paginationSingerAndAlbumResponse = state.paginationSingerAndAlbumResponse ? [...state.paginationSingerAndAlbumResponse, ...payloadArray] : payloadArray;
        } else if (singer_id && album_id && !page && !limit) {
          state.bothRelationshipSingerAlbumResponse = state.bothRelationshipSingerAlbumResponse ? [...state.bothRelationshipSingerAlbumResponse, ...payloadArray] : payloadArray;
        } else if (singer_id && !page && !limit) {
          state.singerRelationshipNoAlbumResponse = state.singerRelationshipNoAlbumResponse ? [...state.singerRelationshipNoAlbumResponse, ...payloadArray] : payloadArray;
        } else if (album_id && !page && !limit) {
          state.albumRelationshipNoSingerResponse = state.albumRelationshipNoSingerResponse ? [...state.albumRelationshipNoSingerResponse, ...payloadArray] : payloadArray;
        } else if (page && limit && !singer_id && !album_id) {
          state.paginationSingerAlbumResponse = state.paginationSingerAlbumResponse ? [...state.paginationSingerAlbumResponse, ...payloadArray] : payloadArray;
        } else if ((singer_id || album_id) && (page && limit)) {
          state.paginationSingerOrAlbumResponse = state.paginationSingerOrAlbumResponse ? [...state.paginationSingerOrAlbumResponse, ...payloadArray] : payloadArray;
        } else {
          state.singerAlbumResponse = state.singerAlbumResponse ? [...state.singerAlbumResponse, ...payloadArray] : payloadArray;
        }
      })
      .addCase(getSingerAlbumData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching singer-song data';
      });
  }
});

export default singerAlbumSlice.reducer;
