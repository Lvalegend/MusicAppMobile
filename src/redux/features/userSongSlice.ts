import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type UserSongParams = {
  page?: number;
  limit?: number;
  song_id?: number;
  token?: string;
};

type FavouriteSongForUser = {
  token?: string;
  song_id?: number;
};

interface UserSongState {
  paginationUserAndSongResponse: any[];
  songRelationshipNoPaginationResponse: any[];
  paginationUserSongResponse: any[];
  userSongResponse: any[];
  addUserSongResponse: any | null;
  deleteUserSongResponse: any | null;
  loading: boolean;
  error: string | null;
  hasFetchingPaginationUserAndSong: boolean;
  hasFetchingSongRelationshipNoPagination: boolean;
  hasFetchingPaginationUserSong: boolean;
  hasFetchingUserSong: boolean;
  hasMorePaginationUserAndSong: boolean;
  hasMorePaginationUserSong: boolean;
}

export const addFavouriteSongForUser = createAsyncThunk(
  'post/addFavouriteSongForUser',
  async (data: FavouriteSongForUser) => {
    const sendSongData = {
      song_id: data?.song_id,
    };
    const response = await useCallAPI('POST', `${URL_API}add/relationship/user-song`, true, data?.token, sendSongData);
    return response;
  }
);

export const getUserSongData = createAsyncThunk(
  'get/userSongData',
  async (props?: UserSongParams) => {
    const response = await useCallAPI(
      'GET',
      `${URL_API}get-data/relationship/user-song?page=${props?.page}&limit=${props?.limit}&song_id=${props?.song_id}`,
      false,
      props?.token
    );
    return response;
  }
);

export const deleteFavouriteSongForUser = createAsyncThunk(
  'delete/deleteFavouriteSongForUser',
  async (data: FavouriteSongForUser) => {
    const response = await useCallAPI(
      'DELETE',
      `${URL_API}delete/relationship/user-song?song_id=${data?.song_id}`,
      true,
      data?.token
    );
    return response;
  }
);

const initialState: UserSongState = {
  paginationUserAndSongResponse: [],
  songRelationshipNoPaginationResponse: [],
  paginationUserSongResponse: [],
  userSongResponse: [],
  addUserSongResponse: null,
  deleteUserSongResponse: null,
  loading: false,
  error: null,
  hasFetchingPaginationUserAndSong: false,
  hasFetchingSongRelationshipNoPagination: false,
  hasFetchingPaginationUserSong: false,
  hasFetchingUserSong: false,
  hasMorePaginationUserAndSong: true,
  hasMorePaginationUserSong: true,
};

const userSongSlice = createSlice({
  name: 'userSong',
  initialState,
  reducers: {
    resetStateUserSong: (state) => {
      Object.assign(state, initialState);
    },
    removeSongById: (state, action) => {
      const song_id = action.payload;
      state.paginationUserAndSongResponse = state.paginationUserAndSongResponse.filter(
        (item) => item.filterSongId !== song_id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserSongData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserSongData.fulfilled, (state, action) => {
        state.loading = false;

        const { song_id, page, limit } = action.meta.arg || {};
        const actionChange = { filterSongId: song_id || null, limit: limit, page: page, ...action.payload };
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (song_id && page && limit) {
          state.paginationUserAndSongResponse = state.paginationUserAndSongResponse
            ? [...state.paginationUserAndSongResponse, ...payloadArray]
            : payloadArray;
          state.hasFetchingPaginationUserAndSong = !!payloadArray.length;
          state.hasMorePaginationUserAndSong = payloadArray.length === limit;
        } else if (song_id && !page && !limit) {
          state.songRelationshipNoPaginationResponse = state.songRelationshipNoPaginationResponse
            ? [...state.songRelationshipNoPaginationResponse, ...payloadArray]
            : payloadArray;
          state.hasFetchingSongRelationshipNoPagination = !!payloadArray.length;
        } else if (page && limit && !song_id) {
          state.paginationUserSongResponse = state.paginationUserSongResponse
            ? [...state.paginationUserSongResponse, ...payloadArray]
            : payloadArray;
          state.hasFetchingPaginationUserSong = !!payloadArray.length;
          state.hasMorePaginationUserSong = payloadArray.length === limit;
        } else {
          state.userSongResponse = payloadArray;
          state.hasFetchingUserSong = !!payloadArray.length;
        }
      })
      .addCase(getUserSongData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching favourite data';
      })
      .addCase(addFavouriteSongForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavouriteSongForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.addUserSongResponse = action.payload;
      })
      .addCase(addFavouriteSongForUser.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while adding favourite song';
      })
      .addCase(deleteFavouriteSongForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavouriteSongForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteUserSongResponse = action.payload;
      })
      .addCase(deleteFavouriteSongForUser.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while deleting favourite song';
      });
  },
});

export const { resetStateUserSong, removeSongById } = userSongSlice.actions;
export default userSongSlice.reducer;
