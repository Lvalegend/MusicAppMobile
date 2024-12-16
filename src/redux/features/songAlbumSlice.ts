import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type SongAlbumParams = {
  page?: number;
  limit?: number;
  song_id?: number;
  album_id?: number;
};

interface SongAlbumState {
  songRelationshipNoAlbumResponse: any[] | null;
  albumRelationshipNoSongResponse: any[] | null;
  bothRelationshipSongAlbumResponse: any[] | null;
  paginationSongAlbumResponse: any[] | null;
  paginationSongOrAlbumResponse: any[] | null;
  paginationSongAndAlbumResponse: any[] | null;
  songAlbumResponse: any[] | null;
  loading: boolean;
  error: string | null;
  hasMorePaginationSongAndAlbumResponse: boolean;
  hasMorePaginationSongAlbumResponse: boolean;
  hasMorePaginationSongOrAlbumResponse: boolean;
  hasFetchingPaginationSongAlbumResponse: boolean;
  hasFetchingPaginationSongOrAlbumResponse: boolean;
  hasFetchingPaginationSongAndAlbumResponse: boolean;
  hasFetchingSongRelationshipNoAlbumResponse: boolean;
  hasFetchingAlbumRelationshipNoSongResponse: boolean;
  hasFetchingBothRelationshipSongAlbumResponse: boolean;
  hasFetchingSongAlbumResponse: boolean;
  currentPagePaginationSongAlbumResponse: number;
  currentPagePaginationSongOrAlbumResponse: number;
  currentPagePaginationSongAndAlbumResponse: number;
}

export const getSongAlbumData = createAsyncThunk(
  'get/songAlbumData',
  async (props?: SongAlbumParams) => {
    const response = await useCallAPI(
      'GET',
      `${URL_API}get-data/relationship/song-album?page=${props?.page}&limit=${props?.limit}&song_id=${props?.song_id}&album_id=${props?.album_id}`
    );
    return response;
  }
);

const songAlbumSlice = createSlice({
  name: 'songAlbum',
  initialState: {
    songRelationshipNoAlbumResponse: null,
    albumRelationshipNoSongResponse: null,
    bothRelationshipSongAlbumResponse: null,
    paginationSongAlbumResponse: null,
    paginationSongOrAlbumResponse: null,
    paginationSongAndAlbumResponse: null,
    songAlbumResponse: null,
    loading: false,
    error: null,
    hasMorePaginationSongAndAlbumResponse: true,
    hasMorePaginationSongAlbumResponse: true,
    hasMorePaginationSongOrAlbumResponse: true,
    hasFetchingPaginationSongAlbumResponse: false,
    hasFetchingPaginationSongOrAlbumResponse: false,
    hasFetchingPaginationSongAndAlbumResponse: false,
    hasFetchingSongRelationshipNoAlbumResponse: false,
    hasFetchingAlbumRelationshipNoSongResponse: false,
    hasFetchingBothRelationshipSongAlbumResponse: false,
    hasFetchingSongAlbumResponse: false,
    currentPagePaginationSongAlbumResponse: 1,
    currentPagePaginationSongOrAlbumResponse: 1,
    currentPagePaginationSongAndAlbumResponse: 1,
  } as SongAlbumState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSongAlbumData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSongAlbumData.fulfilled, (state, action) => {
        state.loading = false;

        const { song_id, album_id, page, limit } = action.meta.arg || {};
        const actionChange = {
          filterSongId: song_id || null,
          filterAlbumId: album_id || null,
          limit: limit,
          page: page,
          ...action.payload,
        };
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (song_id && album_id && page && limit) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMorePaginationSongAndAlbumResponse = false;
          } else {
            state.hasMorePaginationSongAndAlbumResponse = true;
          }
          state.paginationSongAndAlbumResponse = state.paginationSongAndAlbumResponse
            ? [...state.paginationSongAndAlbumResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingPaginationSongAndAlbumResponse = !!payloadArray[0]?.data;
          state.currentPagePaginationSongAndAlbumResponse = page;
        } else if (song_id && !page && !limit) {
          state.songRelationshipNoAlbumResponse = state.songRelationshipNoAlbumResponse
            ? [...state.songRelationshipNoAlbumResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingSongRelationshipNoAlbumResponse = !!payloadArray[0]?.data;
        } else if (album_id && !page && !limit) {
          state.albumRelationshipNoSongResponse = state.albumRelationshipNoSongResponse
            ? [...state.albumRelationshipNoSongResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingAlbumRelationshipNoSongResponse = !!payloadArray[0]?.data;
        } else if (page && limit && !song_id && !album_id) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMorePaginationSongAlbumResponse = false;
          } else {
            state.hasMorePaginationSongAlbumResponse = true;
          }
          state.paginationSongAlbumResponse = state.paginationSongAlbumResponse
            ? [...state.paginationSongAlbumResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingPaginationSongAlbumResponse = !!payloadArray[0]?.data;
          state.currentPagePaginationSongAlbumResponse = page;
        } else if ((song_id || album_id) && page && limit) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMorePaginationSongOrAlbumResponse = false;
          } else {
            state.hasMorePaginationSongOrAlbumResponse = true;
          }
          state.paginationSongOrAlbumResponse = state.paginationSongOrAlbumResponse
            ? [...state.paginationSongOrAlbumResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingPaginationSongOrAlbumResponse = !!payloadArray[0]?.data;
          state.currentPagePaginationSongOrAlbumResponse = page;
        } else if (song_id && album_id && !page && !limit) {
          state.bothRelationshipSongAlbumResponse = state.bothRelationshipSongAlbumResponse
            ? [...state.bothRelationshipSongAlbumResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingBothRelationshipSongAlbumResponse = !!payloadArray[0]?.data;
        } else if (!song_id && !album_id && !page && !limit) {
          state.songAlbumResponse = payloadArray;
          state.hasFetchingSongAlbumResponse = !!payloadArray[0]?.data;
        }
      })
      .addCase(getSongAlbumData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching song-album data';
      });
  },
});

export default songAlbumSlice.reducer;
