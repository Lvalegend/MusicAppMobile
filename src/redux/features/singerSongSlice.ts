import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type SingerSongParams = {
  page?: number;
  limit?: number;
  singer_id?: number;
  song_id?: number;
  isRandom?: boolean;
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
    singerRelationshipNoSongResponse: null,
    songRelationshipNoSingerResponse: null,
    bothRelationshipSingerSongResponse: null,
    paginationSingerSongResponse: null,
    paginationSingerOrSongResponse: [],
    paginationSingerAndSongResponse: null,
    singerSongResponse: null,
    loading: false,
    error: null,
    hasMore: true
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
        const actionChange = { filterSingerId: singer_id || null, filterSongId: song_id || null, limit: limit, page: page, ...action.payload }
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];
        if (payloadArray[0]?.data?.length < limit) {
          state.hasMore = false;
        } else {
          state.hasMore = true;
        }

        console.log('payloadArray', payloadArray)

        if (singer_id && song_id && page && limit) {
          console.log('state.paginationSingerAndSongResponse', state.paginationSingerAndSongResponse)
          state.paginationSingerAndSongResponse = state.paginationSingerAndSongResponse ? [...state.paginationSingerAndSongResponse, ...payloadArray] : payloadArray;
        } else if (singer_id && !page && !limit) {
          console.log('state.singerRelationshipNoSongResponse', state.singerRelationshipNoSongResponse)
          state.singerRelationshipNoSongResponse = state.singerRelationshipNoSongResponse ? [...state.singerRelationshipNoSongResponse, ...payloadArray] : payloadArray;
        } else if (song_id && !page && !limit) {
          console.log('state.songRelationshipNoSingerResponse', state.songRelationshipNoSingerResponse)
          state.songRelationshipNoSingerResponse = state.songRelationshipNoSingerResponse ? [...state.songRelationshipNoSingerResponse, ...payloadArray] : payloadArray;;
        } else if (page && limit && !singer_id && !song_id) {
          console.log('state.paginationSingerSongResponse', state.paginationSingerSongResponse)
          state.paginationSingerSongResponse = state.paginationSingerSongResponse ? [...state.paginationSingerSongResponse, ...payloadArray] : payloadArray;;
        } else if ((singer_id || song_id) && page && limit) {
          console.log('state.paginationSingerOrSongResponse', state.paginationSingerOrSongResponse)
          state.paginationSingerOrSongResponse = state.paginationSingerOrSongResponse ? [...state.paginationSingerOrSongResponse, ...payloadArray] : payloadArray;
        } else if (singer_id && song_id && !page && !limit) {
          console.log('state.bothRelationshipSingerSongResponse', state.bothRelationshipSingerSongResponse)
          state.bothRelationshipSingerSongResponse = state.bothRelationshipSingerSongResponse ? [...state.bothRelationshipSingerSongResponse, ...payloadArray] : payloadArray;
        } else if (!singer_id && !song_id && !page && !limit) {
          console.log('state.singerSongResponse', state.singerSongResponse)
          state.singerSongResponse = state.singerSongResponse ? [...state.singerSongResponse, ...payloadArray] : payloadArray;
        }
      })
      .addCase(getSingerSongData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching singer-song data';
      });
  }
});

export default singerSongSlice.reducer;
