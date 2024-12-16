import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type UserAlbumParams = {
  page?: number;
  limit?: number;
  album_id?: number;
  token?: string;
};

type FavouriteAlbumForUser = {
  token?: string;
  album_id?: number;
};

interface UserAlbumState {
  paginationUserAndAlbumResponse: any[];
  albumRelationshipNoPaginationResponse: any[];
  paginationUserAlbumResponse: any[];
  userAlbumResponse: any[];
  addUserAlbumResponse: any | null;
  deleteUserAlbumResponse: any | null;
  loading: boolean;
  error: string | null;
  hasFetchingPaginationUserAndAlbum: boolean;
  hasFetchingAlbumRelationshipNoPagination: boolean;
  hasFetchingPaginationUserAlbum: boolean;
  hasFetchingUserAlbum: boolean;
  hasMorePaginationUserAndAlbum: boolean;
  hasMorePaginationUserAlbum: boolean;
}

export const addFavouriteAlbumForUser = createAsyncThunk(
  'post/addFavouriteAlbumForUser',
  async (data: FavouriteAlbumForUser) => {
    const sendAlbumData = {
      album_id: data?.album_id,
    };
    const response = await useCallAPI('POST', `${URL_API}add/relationship/user-album`, true, data?.token, sendAlbumData);
    return response;
  }
);

export const getUserAlbumData = createAsyncThunk(
  'get/userAlbumData',
  async (props?: UserAlbumParams) => {
    const response = await useCallAPI(
      'GET',
      `${URL_API}get-data/relationship/user-album?page=${props?.page}&limit=${props?.limit}&album_id=${props?.album_id}`,
      false,
      props?.token
    );
    return response;
  }
);

export const deleteFavouriteAlbumForUser = createAsyncThunk(
  'delete/deleteFavouriteAlbumForUser',
  async (data: FavouriteAlbumForUser) => {
    const response = await useCallAPI(
      'DELETE',
      `${URL_API}delete/relationship/user-album?album_id=${data?.album_id}`,
      true,
      data?.token
    );
    return response;
  }
);

const initialState: UserAlbumState = {
  paginationUserAndAlbumResponse: [],
  albumRelationshipNoPaginationResponse: [],
  paginationUserAlbumResponse: [],
  userAlbumResponse: [],
  addUserAlbumResponse: null,
  deleteUserAlbumResponse: null,
  loading: false,
  error: null,
  hasFetchingPaginationUserAndAlbum: false,
  hasFetchingAlbumRelationshipNoPagination: false,
  hasFetchingPaginationUserAlbum: false,
  hasFetchingUserAlbum: false,
  hasMorePaginationUserAndAlbum: true,
  hasMorePaginationUserAlbum: true,
};

const userAlbumSlice = createSlice({
  name: 'userAlbum',
  initialState,
  reducers: {
    resetStateUserAlbum: (state) => {
      Object.assign(state, initialState);
    },
    removeAlbumById: (state, action) => {
      const album_id = action.payload;
      state.paginationUserAndAlbumResponse = state.paginationUserAndAlbumResponse.filter(
        (item) => item.filterAlbumId !== album_id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAlbumData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAlbumData.fulfilled, (state, action) => {
        state.loading = false;

        const { album_id, page, limit } = action.meta.arg || {};
        const actionChange = { filterAlbumId: album_id || null, limit, page, ...action.payload };
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (album_id && page && limit) {
          if (payloadArray[0]?.result?.length < limit) {
            state.hasMorePaginationUserAndAlbum = false;
          } else {
            state.hasMorePaginationUserAndAlbum = true;
          }
          state.paginationUserAndAlbumResponse = state.paginationUserAndAlbumResponse
            ? [...state.paginationUserAndAlbumResponse, ...payloadArray]
            : payloadArray;
          state.hasFetchingPaginationUserAndAlbum = !!payloadArray[0]?.result;
        } else if (album_id && !page && !limit) {
          state.albumRelationshipNoPaginationResponse = state.albumRelationshipNoPaginationResponse
            ? [...state.albumRelationshipNoPaginationResponse, ...payloadArray]
            : payloadArray;
          state.hasFetchingAlbumRelationshipNoPagination = !!payloadArray[0]?.result;
        } else if (page && limit && !album_id) {
          if (payloadArray[0]?.result?.length < limit) {
            state.hasMorePaginationUserAlbum = false;
          } else {
            state.hasMorePaginationUserAlbum = true;
          }
          state.paginationUserAlbumResponse = state.paginationUserAlbumResponse
            ? [...state.paginationUserAlbumResponse, ...payloadArray]
            : payloadArray;
          state.hasFetchingPaginationUserAlbum = !!payloadArray[0]?.result;
        } else {
          state.userAlbumResponse = payloadArray;
          state.hasFetchingUserAlbum = !!payloadArray[0]?.result;
        }
      })
      .addCase(getUserAlbumData.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching album data';
      })
      .addCase(addFavouriteAlbumForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavouriteAlbumForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.addUserAlbumResponse = action.payload;
      })
      .addCase(addFavouriteAlbumForUser.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while adding favourite album';
      })
      .addCase(deleteFavouriteAlbumForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavouriteAlbumForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteUserAlbumResponse = action.payload;
      })
      .addCase(deleteFavouriteAlbumForUser.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while deleting favourite album';
      });
  },
});

export const { resetStateUserAlbum, removeAlbumById } = userAlbumSlice.actions;
export default userAlbumSlice.reducer;
