import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type UserSingerParams = {
  page?: number;
  limit?: number;
  singer_id?: number;
  token?: string;
};

type FavouriteSingerForUser = {
  token?: string;
  singer_id?: number;
};

interface UserSingerState {
  paginationUserAndSingerResponse: any[];
  singerRelationshipNoPaginationResponse: any[];
  paginationUserSingerResponse: any[];
  userSingerResponse: any[];
  addUserSingerResponse: any | null;
  deleteUserSingerResponse: any | null;
  loading: boolean;
  error: string | null;
  hasFetchingPaginationUserAndSinger: boolean;
  hasFetchingSingerRelationshipNoPagination: boolean;
  hasFetchingPaginationUserSinger: boolean;
  hasFetchingUserSinger: boolean;
  hasMorePaginationUserAndSinger: boolean;
  hasMorePaginationUserSinger: boolean;
}

export const addFavouriteSingerForUser = createAsyncThunk(
  'post/addFavouriteSingerForUser',
  async (data: FavouriteSingerForUser) => {
    const sendSingerData = {
      singer_id: data?.singer_id,
    };
    const response = await useCallAPI('POST', `${URL_API}add/relationship/user-singer`, true, data?.token, sendSingerData);
    return response;
  }
);

export const getUserSingerData = createAsyncThunk(
  'get/userSingerData',
  async (props?: UserSingerParams) => {
    const response = await useCallAPI(
      'GET',
      `${URL_API}get-data/relationship/user-singer?page=${props?.page}&limit=${props?.limit}&singer_id=${props?.singer_id}`,
      false,
      props?.token
    );
    return response;
  }
);

export const deleteFavouriteSingerForUser = createAsyncThunk(
  'delete/deleteFavouriteSingerForUser',
  async (data: FavouriteSingerForUser) => {
    const response = await useCallAPI(
      'DELETE',
      `${URL_API}delete/relationship/user-singer?singer_id=${data?.singer_id}`,
      true,
      data?.token
    );
    return response;
  }
);

const initialState: UserSingerState = {
  paginationUserAndSingerResponse: [],
  singerRelationshipNoPaginationResponse: [],
  paginationUserSingerResponse: [],
  userSingerResponse: [],
  addUserSingerResponse: null,
  deleteUserSingerResponse: null,
  loading: false,
  error: null,
  hasFetchingPaginationUserAndSinger: false,
  hasFetchingSingerRelationshipNoPagination: false,
  hasFetchingPaginationUserSinger: false,
  hasFetchingUserSinger: false,
  hasMorePaginationUserAndSinger: true,
  hasMorePaginationUserSinger: true,
};

const userSingerSlice = createSlice({
  name: 'userSinger',
  initialState,
  reducers: {
    resetStateUserSinger: (state) => {
      Object.assign(state, initialState);
    },
    removeSingerById: (state, action) => {
      const singer_id = action.payload;
      state.paginationUserAndSingerResponse = state.paginationUserAndSingerResponse.filter(
        (item) => item.filterSingerId !== singer_id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserSingerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserSingerData.fulfilled, (state, action) => {
        state.loading = false;

        const { singer_id, page, limit } = action.meta.arg || {};
        const actionChange = { filterSingerId: singer_id || null, limit, page, ...action.payload };
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (singer_id && page && limit) {
          state.paginationUserAndSingerResponse = state.paginationUserAndSingerResponse
            ? [...state.paginationUserAndSingerResponse, ...payloadArray]
            : payloadArray;
          state.hasFetchingPaginationUserAndSinger = !!payloadArray.length;
          state.hasMorePaginationUserAndSinger = payloadArray.length === limit;
        } else if (singer_id && !page && !limit) {
          state.singerRelationshipNoPaginationResponse = state.singerRelationshipNoPaginationResponse
            ? [...state.singerRelationshipNoPaginationResponse, ...payloadArray]
            : payloadArray;
          state.hasFetchingSingerRelationshipNoPagination = !!payloadArray.length;
        } else if (page && limit && !singer_id) {
          state.paginationUserSingerResponse = state.paginationUserSingerResponse
            ? [...state.paginationUserSingerResponse, ...payloadArray]
            : payloadArray;
          state.hasFetchingPaginationUserSinger = !!payloadArray.length;
          state.hasMorePaginationUserSinger = payloadArray.length === limit;
        } else {
          state.userSingerResponse = payloadArray;
          state.hasFetchingUserSinger = !!payloadArray.length;
        }
      })
      .addCase(getUserSingerData.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching singer data';
      })
      .addCase(addFavouriteSingerForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavouriteSingerForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.addUserSingerResponse = action.payload;
      })
      .addCase(addFavouriteSingerForUser.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while adding favourite singer';
      })
      .addCase(deleteFavouriteSingerForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavouriteSingerForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteUserSingerResponse = action.payload;
      })
      .addCase(deleteFavouriteSingerForUser.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while deleting favourite singer';
      });
  },
});

export const { resetStateUserSinger, removeSingerById } = userSingerSlice.actions;
export default userSingerSlice.reducer;
