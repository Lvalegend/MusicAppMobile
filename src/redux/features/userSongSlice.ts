import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type UserSongParams = {
  page?: number;
  limit?: number;
  song_id?: number;
  token?: string;
}
type FavouriteSongForUser = {
  token?: string
  song_id?: number
}
export const addFavouriteSongForUser = createAsyncThunk(
  'post/addFavouriteSongForUser',
  async (data: FavouriteSongForUser) => {
    console.log('DataFavouriteSongForUser', data)
    const sendSongData = {
      song_id: data?.song_id,
    }
    const response = await useCallAPI('POST', `${URL_API}add/relationship/user-song`, true, data?.token, sendSongData)
    return response
  }
)
export const getUserSongData = createAsyncThunk(
  'get/userSongData',
  async (props?: UserSongParams, { getState }) => {
    const state: any = getState()
    const { token, song_id, page, limit } = props || {};

    const paginationData = state.userSong.paginationUserSongResponse;
    const alreadyFetched = paginationData.some(item => item.filterSongId === song_id && item.page === page && item.limit === limit);

    console.log('alreadyFetcheddddddđ', alreadyFetched);
    if (alreadyFetched) {
      return
    }
    else {
      const response = await useCallAPI(
        'GET',
        `${URL_API}get-data/relationship/user-song?page=${page}&limit=${limit}&song_id=${song_id}`,
        false,
        token
      );
      return response;
    }
  }
);

export const deleteFavouriteSongForUser = createAsyncThunk(
  'delete/deleteFavouriteSongForUser',
  async (data: FavouriteSongForUser) => {
    console.log('dataaaaaaaaaaaaaaaaaaa', data)
    const response = await useCallAPI('DELETE', `${URL_API}delete/relationship/user-song?song_id=${data?.song_id}`, true, data?.token)
    return response
  }
)
const userSongSlice = createSlice({
  name: 'userSong',
  initialState: {
    paginationUserAndSongResponse: [],
    songRelationshipNoPaginationResponse: [],
    paginationUserSongResponse: [],
    userSongResponse: [],
    songDataInPlaylistSendResponse: null,
    deleteUserSongResponse: null,
    loading: false,
    error: null,
  },
  reducers: {
      resetStateUserSong: (state) => {
        state.paginationUserAndSongResponse = [];
        state.songRelationshipNoPaginationResponse = [];
        state.paginationUserSongResponse = [];
        state.userSongResponse = [];
        state.songDataInPlaylistSendResponse = null;
        state.deleteUserSongResponse = null;
        state.loading = false;
        state.error = null;
      },
      removeSongById: (state, action) => {
        const song_id = action.payload;
        state.paginationUserAndSongResponse = state.paginationUserAndSongResponse.filter(
          (item) => item.filterSongId !== song_id
        );
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserSongData.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getUserSongData.fulfilled, (state, action) => {
        state.loading = false;

        const { song_id, page, limit } = action.meta.arg || {};
        const actionChange = { filterSongId: song_id || null, limit: limit, page: page, ...action.payload }
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (song_id && page && limit) {
          console.log('state.paginationUserAndSongResponse', state.paginationUserAndSongResponse)
          state.paginationUserAndSongResponse = state.paginationUserAndSongResponse ? [...state.paginationUserAndSongResponse, ...payloadArray] : payloadArray;
        } else if (song_id && !page && !limit) {
          console.log('state.songRelationshipNoPaginationResponse', state.songRelationshipNoPaginationResponse)
          state.songRelationshipNoPaginationResponse = state.songRelationshipNoPaginationResponse ? [...state.songRelationshipNoPaginationResponse, ...payloadArray] : payloadArray;
        } else if (page && limit && !song_id) {
          console.log('state.paginationUserSongResponse', state.paginationUserSongResponse)
          state.paginationUserSongResponse = state.paginationUserSongResponse ? [...state.paginationUserSongResponse, ...payloadArray] : payloadArray;
        } else {
          console.log('state.userSongResponse', state.userSongResponse)
          state.userSongResponse = payloadArray;
        }
      })
      .addCase(getUserSongData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching Playlist data';
      });
    builder
      .addCase(addFavouriteSongForUser.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(addFavouriteSongForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.songDataInPlaylistSendResponse = action.payload
      })
      .addCase(addFavouriteSongForUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching Playlist data';
      });
    builder
      .addCase(deleteFavouriteSongForUser.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(deleteFavouriteSongForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteUserSongResponse = action.payload
      })
      .addCase(deleteFavouriteSongForUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching Playlist data';
      });
  }
})
export const { resetStateUserSong, removeSongById } = userSongSlice.actions;
export default userSongSlice.reducer;