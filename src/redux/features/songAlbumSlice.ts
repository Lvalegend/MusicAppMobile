import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type SongAlbumParams = {
  page?: number;
  limit?: number;
  song_id?: number;
  album_id?: number;
}
export const getSongAlbumData = createAsyncThunk(
  'get/songAlbumData',
  async (props?: SongAlbumParams, { getState }) => {
    const state: any = getState()
    console.log('stateeeeeeeeee', state);
    const { album_id, song_id, page, limit } = props || {};

    // Kiểm tra nếu dữ liệu đã tồn tại trong store để tránh việc gọi lại API
    const paginationData = state.songAlbum.paginationSongOrAlbumResponse;
    console.log('paginationData', paginationData);
    const alreadyFetched = paginationData.some(item => item.filterAlbumId === album_id && item.filterSongId === song_id && item.page === page && item.limit === limit);

    console.log('alreadyFetcheddddddđ', alreadyFetched);
    if (alreadyFetched) {
      return
    }
    else {
      const response = await useCallAPI(
        'GET',
        `${URL_API}get-data/relationship/song-album?page=${page}&limit=${limit}&album_id=${album_id}&song_id=${song_id}`
      );
      return response;
    }
  }
);
const songAlbumSlice = createSlice({
  name: 'songAlbum',
  initialState: {
    songRelationshipNoAlbumResponse: null,
    albumRelationshipNoSongResponse: null,
    bothRelationshipSongAlbumResponse: null,
    paginationSongAlbumResponse: null,
    paginationSongOrAlbumResponse: [],
    paginationSongAndAlbumResponse: null,
    songAlbumResponse: null,
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

        const { album_id, song_id, page, limit } = action.meta.arg || {};
        const actionChange = { filterSongId: song_id || null, filterAlbumId:  album_id || null, limit: limit, page: page, ...action.payload }
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (album_id && song_id && page && limit) {
          state.paginationSongAndAlbumResponse = state.paginationSongAndAlbumResponse ? [...state.paginationSongAndAlbumResponse, ...payloadArray] : payloadArray;
        } else if (album_id && !page && !limit) {
          state.albumRelationshipNoSongResponse = state.albumRelationshipNoSongResponse ? [...state.albumRelationshipNoSongResponse, ...payloadArray] : payloadArray;;
        } else if (song_id && !page && !limit) {
          state.songRelationshipNoAlbumResponse = state.songRelationshipNoAlbumResponse ? [...state.songRelationshipNoAlbumResponse, ...payloadArray] : payloadArray;
        } else if (page && limit && !album_id && !song_id) {
          state.paginationSongAlbumResponse = state.paginationSongAlbumResponse ? [...state.paginationSongAlbumResponse, ...payloadArray] : payloadArray;
        } else if ((album_id || song_id) && page && limit) {
          state.paginationSongOrAlbumResponse = state.paginationSongOrAlbumResponse ? [...state.paginationSongOrAlbumResponse, ...payloadArray] : payloadArray;
        } else if (album_id && song_id && !page && !limit) {
          state.bothRelationshipSongAlbumResponse = state.bothRelationshipSongAlbumResponse ? [...state.bothRelationshipSongAlbumResponse, ...payloadArray] : payloadArray;
        } else {
          state.songAlbumResponse = state.songAlbumResponse ? [...state.songAlbumResponse, ...payloadArray] : payloadArray;
        }
      })
      .addCase(getSongAlbumData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching album data';
      });
  }
})
export default songAlbumSlice.reducer;