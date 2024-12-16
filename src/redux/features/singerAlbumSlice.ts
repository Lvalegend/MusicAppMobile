import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type SingerAlbumParams = {
  page?: number;
  limit?: number;
  singer_id?: number;
  album_id?: number;
};

interface SingerAlbumState {
  singerRelationshipNoAlbumResponse: any[] ;
  albumRelationshipNoSingerResponse: any[] ;
  bothRelationshipSingerAlbumResponse: any[] ;
  paginationSingerAlbumResponse: any[] ;
  paginationSingerAndAlbumResponse: any[] ;
  paginationSingerNoAlbumResponse: any[],
  paginationAlbumNoSingerResponse: any[] ;
  singerAlbumResponse: any[] ;
  loading: boolean;
  error: string | null;
  hasMorePaginationSingerAndAlbumResponse: boolean;
  hasMorePaginationSingerAlbumResponse: boolean;
  hasMorePaginationSingerNoAlbumResponse: boolean;
  hasMorePaginationAlbumNoSingerResponse: boolean;
  hasFetchingPaginationSingerAlbumResponse: boolean;
  hasFetchingPaginationSingerNoAlbumResponse: boolean;
  hasFetchingPaginationAlbumNoSingerResponse: boolean;
  hasFetchingPaginationSingerAndAlbumResponse: boolean;
  hasFetchingSingerRelationshipNoAlbumResponse: boolean;
  hasFetchingAlbumRelationshipNoSingerResponse: boolean;
  hasFetchingBothRelationshipSingerAlbumResponse: boolean;
  hasFetchingSingerAlbumResponse: boolean;
  currentPagePaginationSingerNoAlbumResponse: number;
  currentPagePaginationAlbumNoSingerResponse: number;
  currentPagePaginationSingerAlbumResponse: number;
  currentPagePaginationSingerAndAlbumResponse: number;
}

export const getSingerAlbumData = createAsyncThunk(
  'get/singerAlbumData',
  async (props?: SingerAlbumParams) => {
    const response = await useCallAPI(
      'GET',
      `${URL_API}get-data/relationship/singer-album?page=${props?.page}&limit=${props?.limit}&singer_id=${props?.singer_id}&album_id=${props?.album_id}`
    );
    return response;
  }
);

const singerAlbumSlice = createSlice({
  name: 'singerAlbum',
  initialState: {
    singerRelationshipNoAlbumResponse: [],
    albumRelationshipNoSingerResponse: [],
    bothRelationshipSingerAlbumResponse: [],
    paginationSingerAlbumResponse: [],
    paginationSingerAndAlbumResponse: [],
    paginationAlbumNoSingerResponse: [],
    paginationSingerNoAlbumResponse: [],
    singerAlbumResponse: [],
    loading: false,
    error: null,
    hasMorePaginationSingerAndAlbumResponse: true,
    hasMorePaginationAlbumNoSingerResponse: true,
    hasMorePaginationSingerNoAlbumResponse: true,
    hasMorePaginationSingerAlbumResponse: true,
    hasFetchingPaginationSingerAlbumResponse: false,
    hasFetchingPaginationSingerAndAlbumResponse: false,
    hasFetchingSingerRelationshipNoAlbumResponse: false,
    hasFetchingAlbumRelationshipNoSingerResponse: false,
    hasFetchingPaginationAlbumNoSingerResponse: false,
    hasFetchingPaginationSingerNoAlbumResponse: false,
    hasFetchingBothRelationshipSingerAlbumResponse: false,
    hasFetchingSingerAlbumResponse: false,
    currentPagePaginationSingerAlbumResponse: 1,
    currentPagePaginationSingerAndAlbumResponse: 1,
    currentPagePaginationAlbumNoSingerResponse: 1,
    currentPagePaginationSingerNoAlbumResponse: 1
  } as SingerAlbumState,
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
        const actionChange = {
          filterSingerId: singer_id || null,
          filterAlbumId: album_id || null,
          limit: limit,
          page: page,
          ...action.payload,
        };
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (singer_id && album_id && page && limit) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMorePaginationSingerAndAlbumResponse = false;
          } else {
            state.hasMorePaginationSingerAndAlbumResponse = true;
          }
          state.paginationSingerAndAlbumResponse = state.paginationSingerAndAlbumResponse
            ? [...state.paginationSingerAndAlbumResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingPaginationSingerAndAlbumResponse = !!payloadArray[0]?.data;
          state.currentPagePaginationSingerAndAlbumResponse = page;
        } else if (singer_id && !page && !limit) {
          state.singerRelationshipNoAlbumResponse = state.singerRelationshipNoAlbumResponse
            ? [...state.singerRelationshipNoAlbumResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingSingerRelationshipNoAlbumResponse = !!payloadArray[0]?.data;
        } else if (album_id && !page && !limit) {
          state.albumRelationshipNoSingerResponse = state.albumRelationshipNoSingerResponse
            ? [...state.albumRelationshipNoSingerResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingAlbumRelationshipNoSingerResponse = !!payloadArray[0]?.data;
        } else if (page && limit && !singer_id && !album_id) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMorePaginationSingerAlbumResponse = false;
          } else {
            state.hasMorePaginationSingerAlbumResponse = true;
          }
          state.paginationSingerAlbumResponse = state.paginationSingerAlbumResponse
            ? [...state.paginationSingerAlbumResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingPaginationSingerAlbumResponse = !!payloadArray[0]?.data;
          state.currentPagePaginationSingerAlbumResponse = page;
        } else if (singer_id && page && limit) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMorePaginationSingerNoAlbumResponse = false;
          } else {
            state.hasMorePaginationSingerNoAlbumResponse = true;
          }
          state.paginationSingerNoAlbumResponse = state.paginationSingerNoAlbumResponse
            ? [...state.paginationSingerNoAlbumResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingPaginationSingerNoAlbumResponse = !!payloadArray[0]?.data;
          state.currentPagePaginationSingerNoAlbumResponse = page;
        } else if (album_id && page && limit) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMorePaginationAlbumNoSingerResponse = false;
          } else {
            state.hasMorePaginationAlbumNoSingerResponse = true;
          }
          state.paginationAlbumNoSingerResponse = state.paginationAlbumNoSingerResponse
            ? [...state.paginationAlbumNoSingerResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingPaginationAlbumNoSingerResponse = !!payloadArray[0]?.data;
          state.currentPagePaginationAlbumNoSingerResponse = page;
        }
         else if (singer_id && album_id && !page && !limit) {
          state.bothRelationshipSingerAlbumResponse = state.bothRelationshipSingerAlbumResponse
            ? [...state.bothRelationshipSingerAlbumResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingBothRelationshipSingerAlbumResponse = !!payloadArray[0]?.data;
        } else if (!singer_id && !album_id && !page && !limit) {
          state.singerAlbumResponse = payloadArray;
          state.hasFetchingSingerAlbumResponse = !!payloadArray[0]?.data;
        }
      })
      .addCase(getSingerAlbumData.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching singer-album data';
      });
  },
});

export default singerAlbumSlice.reducer;
