import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type SongPlaylistParams = {
  page?: number;
  limit?: number;
  song_id?: number;
  playlist_id?: number;
}
type AddSongInPlaylist = {
  playlist_id?: number;
  songIds?: number[];
}
type DataSongInPlaylist = {
  data: AddSongInPlaylist
}
export const addSongInPlaylist = createAsyncThunk(
  'post/addSongInPlaylist',
  async (data: DataSongInPlaylist) => {
    console.log('DataSongInPlaylist', data)
    const response = await useCallAPI('POST', `${URL_API}add/song-in-playlist`, true, undefined, data)
    return response
  }
)
export const getSongPlaylistData = createAsyncThunk(
  'get/songPlaylistData',
  async (props?: SongPlaylistParams, { getState }) => {
    const state: any = getState()
    console.log('stateeeeeeeeee', state);
    const { playlist_id, song_id, page, limit } = props || {};

    // Kiểm tra nếu dữ liệu đã tồn tại trong store để tránh việc gọi lại API
    const paginationData = state.songPlaylist.paginationSongOrPlaylistResponse;
    console.log('paginationData', paginationData);
    const alreadyFetched = paginationData.some(item => item.filterPlaylistId === playlist_id && item.filterSongId === song_id && item.page === page && item.limit === limit);

    console.log('alreadyFetcheddddddđ', alreadyFetched);
    if (alreadyFetched) {
      return
    }
    else {
      const response = await useCallAPI(
        'GET',
        `${URL_API}get-data/relationship/song-playlist?page=${page}&limit=${limit}&playlist_id=${playlist_id}&song_id=${song_id}`
      );
      return response;
    }
  }
);
const songPlaylistSlice = createSlice({
  name: 'songPlaylist',
  initialState: {
    songRelationshipNoPlaylistResponse: [],
    playlistRelationshipNoSongResponse: [],
    bothRelationshipSongPlaylistResponse: [],
    paginationSongPlaylistResponse: [],
    paginationSongOrPlaylistResponse: [],
    paginationSongAndPlaylistResponse: [],
    songPlaylistResponse: [],
    songDataInPlaylistSendResponse: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSongPlaylistData.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getSongPlaylistData.fulfilled, (state, action) => {
        state.loading = false;

        const { playlist_id, song_id, page, limit } = action.meta.arg || {};
        const actionChange = { filterSongId: song_id || null, filterPlaylistId: playlist_id || null, limit: limit, page: page, ...action.payload }
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (playlist_id && song_id && page && limit) {
          state.paginationSongAndPlaylistResponse = state.paginationSongAndPlaylistResponse ? [...state.paginationSongAndPlaylistResponse, ...payloadArray] : payloadArray;
        } else if (playlist_id && !page && !limit) {
          state.playlistRelationshipNoSongResponse = state.playlistRelationshipNoSongResponse ? [...state.playlistRelationshipNoSongResponse, ...payloadArray] : payloadArray;;
        } else if (song_id && !page && !limit) {
          state.songRelationshipNoPlaylistResponse = state.songRelationshipNoPlaylistResponse ? [...state.songRelationshipNoPlaylistResponse, ...payloadArray] : payloadArray;
        } else if (page && limit && !playlist_id && !song_id) {
          state.paginationSongPlaylistResponse = state.paginationSongPlaylistResponse ? [...state.paginationSongPlaylistResponse, ...payloadArray] : payloadArray;
        } else if ((playlist_id || song_id) && page && limit) {
          state.paginationSongOrPlaylistResponse = state.paginationSongOrPlaylistResponse ? [...state.paginationSongOrPlaylistResponse, ...payloadArray] : payloadArray;
        } else if (playlist_id && song_id && !page && !limit) {
          state.bothRelationshipSongPlaylistResponse = state.bothRelationshipSongPlaylistResponse ? [...state.bothRelationshipSongPlaylistResponse, ...payloadArray] : payloadArray;
        } else {
          state.songPlaylistResponse = payloadArray;
        }
      })
      .addCase(getSongPlaylistData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching Playlist data';
      });
    builder
      .addCase(addSongInPlaylist.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(addSongInPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.songDataInPlaylistSendResponse = action.payload
      })
      .addCase(addSongInPlaylist.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching Playlist data';
      });
  }
})
export default songPlaylistSlice.reducer;