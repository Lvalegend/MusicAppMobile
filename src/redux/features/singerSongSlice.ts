import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type SingerSongParams = {
  page?: number;
  limit?: number;
  singer_id?: number;
  song_id?: number;
  isRandom?: boolean;
};

interface SingerSongState {
  singerRelationshipNoSongResponse: any[] | null;
  songRelationshipNoSingerResponse: any[] | null;
  bothRelationshipSingerSongResponse: any[] | null;
  paginationSingerSongResponse: any[] | null;
  paginationSingerOrSongResponse: any[];
  paginationSingerAndSongResponse: any[] | null;
  singerSongResponse: any[] | null;
  loading: boolean;
  error: string | null;
  hasMorePaginationSingerAndSongResponse: boolean;
  hasMorePaginationSingerSongResponse: boolean
  hasMorePaginationSingerOrSongResponse: boolean
  hasFetchingPaginationSingerSongResponse: boolean;
  hasFetchingPaginationSingerOrSongResponse: boolean;
  hasFetchingPaginationSingerAndSongResponse: boolean;
  hasFetchingSingerRelationshipNoSongResponse: boolean;
  hasFetchingSongRelationshipNoSingerResponse: boolean;
  hasFetchingBothRelationshipSingerSongResponse: boolean;
  hasFetchingSingerSongResponse: boolean;
  currentPagePaginationSingerSongResponse: number;
  currentPagePaginationSingerOrSongResponse: number;
  currentPagePaginationSingerAndSongResponse: number;
}

export const getSingerSongData = createAsyncThunk(
  'get/singerSongData',
  async (props?: SingerSongParams) => {
    const response = await useCallAPI(
      'GET',
      `${URL_API}get-data/relationship/singer-song?page=${props?.page}&limit=${props?.limit}&singer_id=${props?.singer_id}&song_id=${props?.song_id}`
    );
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
    hasMorePaginationSingerAndSongResponse: true,
    hasMorePaginationSingerSongResponse: true,
    hasMorePaginationSingerOrSongResponse: true,
    hasFetchingPaginationSingerSongResponse: false,
    hasFetchingPaginationSingerOrSongResponse: false,
    hasFetchingPaginationSingerAndSongResponse: false,
    hasFetchingSingerRelationshipNoSongResponse: false,
    hasFetchingSongRelationshipNoSingerResponse: false,
    hasFetchingBothRelationshipSingerSongResponse: false,
    hasFetchingSingerSongResponse: false,
    currentPagePaginationSingerSongResponse: 1,
    currentPagePaginationSingerOrSongResponse: 1,
    currentPagePaginationSingerAndSongResponse: 1,
  } as SingerSongState,
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
        const actionChange = {
          filterSingerId: singer_id || null,
          filterSongId: song_id || null,
          limit: limit,
          page: page,
          ...action.payload,
        };
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (singer_id && song_id && page && limit) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMorePaginationSingerAndSongResponse = false;
          } else {
            state.hasMorePaginationSingerAndSongResponse = true;
          }
          state.paginationSingerAndSongResponse = state.paginationSingerAndSongResponse
            ? [...state.paginationSingerAndSongResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingPaginationSingerAndSongResponse = !!payloadArray[0]?.data;
          state.currentPagePaginationSingerAndSongResponse = page;
        } else if (singer_id && !page && !limit) {
          state.singerRelationshipNoSongResponse = state.singerRelationshipNoSongResponse
            ? [...state.singerRelationshipNoSongResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingSingerRelationshipNoSongResponse = !!payloadArray[0]?.data;
        } else if (song_id && !page && !limit) {
          state.songRelationshipNoSingerResponse = state.songRelationshipNoSingerResponse
            ? [...state.songRelationshipNoSingerResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingSongRelationshipNoSingerResponse = !!payloadArray[0]?.data;
        } else if (page && limit && !singer_id && !song_id) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMorePaginationSingerSongResponse = false;
          } else {
            state.hasMorePaginationSingerSongResponse = true;
          }
          state.paginationSingerSongResponse = state.paginationSingerSongResponse
            ? [...state.paginationSingerSongResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingPaginationSingerSongResponse = !!payloadArray[0]?.data;
          state.currentPagePaginationSingerSongResponse = page;
        } else if ((singer_id || song_id) && page && limit) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMorePaginationSingerOrSongResponse = false;
          } else {
            state.hasMorePaginationSingerOrSongResponse = true;
          }
          state.paginationSingerOrSongResponse = state.paginationSingerOrSongResponse
            ? [...state.paginationSingerOrSongResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingPaginationSingerOrSongResponse = !!payloadArray[0]?.data;
          state.currentPagePaginationSingerOrSongResponse = page;
        } else if (singer_id && song_id && !page && !limit) {
          state.bothRelationshipSingerSongResponse = state.bothRelationshipSingerSongResponse
            ? [...state.bothRelationshipSingerSongResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingBothRelationshipSingerSongResponse = !!payloadArray[0]?.data;
        } else if (!singer_id && !song_id && !page && !limit) {
          state.singerSongResponse = payloadArray;
          state.hasFetchingSingerSongResponse = !!payloadArray[0]?.data;
        }
      })
      .addCase(getSingerSongData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching singer-song data';
      });
  },
});

export default singerSongSlice.reducer;
