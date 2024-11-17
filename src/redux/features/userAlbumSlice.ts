import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type userAlbumParams = {
  page?: number;
  limit?: number;
  album_id?: number;
  token?: string;
}
type FavouriteAlbumForUser = {
  token?: string
  album_id?: number
}
export const addFavouriteAlbumForUser = createAsyncThunk(
  'post/addFavouriteAlbumForUser',
  async (data: FavouriteAlbumForUser) => {
    console.log('DataFavouriteAlbumForUser', data)
    const sendAlbumData = {
      album_id: data?.album_id,
    }
    const response = await useCallAPI('POST', `${URL_API}add/relationship/user-album`, true, data?.token, sendAlbumData)
    return response
  }
)
export const getUserAlbumData = createAsyncThunk(
  'get/userAlbumData',
  async (props?: userAlbumParams, { getState }) => {
    const state: any = getState()
    const { token, album_id, page, limit } = props || {};

    const paginationData = state.userAlbum.paginationUserAlbumResponse;
    const alreadyFetched = paginationData.some(item => item.filterAlbumId === album_id && item.page === page && item.limit === limit);

    console.log('alreadyFetcheddddddđ', alreadyFetched);
    if (alreadyFetched) {
      return
    }
    else {
      const response = await useCallAPI(
        'GET',
        `${URL_API}get-data/relationship/user-album?page=${page}&limit=${limit}&album_id=${album_id}`,
        false,
        token
      );
      return response;
    }
  }
);

export const deleteFavouriteAlbumForUser = createAsyncThunk(
  'delete/deleteFavouriteAlbumForUser',
  async (data: FavouriteAlbumForUser) => {
    console.log('dataaaaaaaaaaaaaaaaaaa', data)
    const response = await useCallAPI('DELETE', `${URL_API}delete/relationship/user-album?album_id=${data?.album_id}`, true, data?.token)
    return response
  }
)
const userAlbumSlice = createSlice({
  name: 'userAlbum',
  initialState: {
    paginationUserAndAlbumResponse: [],
    albumRelationshipNoPaginationResponse: [],
    paginationUserAlbumResponse: [],
    userAlbumResponse: [],
    albumDataInPlaylistSendResponse: null,
    deleteUserAlbumResponse: null,
    loading: false,
    error: null,
  },
  reducers: {
      resetStateUserAlbum: (state) => {
        state.paginationUserAndAlbumResponse = [];
        state.albumRelationshipNoPaginationResponse = [];
        state.paginationUserAlbumResponse = [];
        state.userAlbumResponse = [];
        state.albumDataInPlaylistSendResponse = null;
        state.deleteUserAlbumResponse = null;
        state.loading = false;
        state.error = null;
      },
      removeAlbumById: (state, action) => {
        const album_id = action.payload;
        state.paginationUserAndAlbumResponse = state.paginationUserAndAlbumResponse.filter(
          (item) => item.filterAlbumId !== album_id
        );
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAlbumData.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getUserAlbumData.fulfilled, (state, action) => {
        state.loading = false;

        const { album_id, page, limit } = action.meta.arg || {};
        const actionChange = { filterAlbumId: album_id || null, limit: limit, page: page, ...action.payload }
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (album_id && page && limit) {
          console.log('state.paginationUserAndAlbumResponse', state.paginationUserAndAlbumResponse)
          state.paginationUserAndAlbumResponse = state.paginationUserAndAlbumResponse ? [...state.paginationUserAndAlbumResponse, ...payloadArray] : payloadArray;
        } else if (album_id && !page && !limit) {
          console.log('state.albumRelationshipNoPaginationResponse', state.albumRelationshipNoPaginationResponse)
          state.albumRelationshipNoPaginationResponse = state.albumRelationshipNoPaginationResponse ? [...state.albumRelationshipNoPaginationResponse, ...payloadArray] : payloadArray;
        } else if (page && limit && !album_id) {
          console.log('state.paginationUserAlbumResponse', state.paginationUserAlbumResponse)
          state.paginationUserAlbumResponse = state.paginationUserAlbumResponse ? [...state.paginationUserAlbumResponse, ...payloadArray] : payloadArray;
        } else {
          console.log('state.userAlbumResponse', state.userAlbumResponse)
          state.userAlbumResponse = payloadArray;
        }
      })
      .addCase(getUserAlbumData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching Playlist data';
      });
    builder
      .addCase(addFavouriteAlbumForUser.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(addFavouriteAlbumForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.albumDataInPlaylistSendResponse = action.payload
      })
      .addCase(addFavouriteAlbumForUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching Playlist data';
      });
    builder
      .addCase(deleteFavouriteAlbumForUser.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(deleteFavouriteAlbumForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteUserAlbumResponse = action.payload
      })
      .addCase(deleteFavouriteAlbumForUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching Playlist data';
      });
  }
})
export const { resetStateUserAlbum, removeAlbumById } = userAlbumSlice.actions;
export default userAlbumSlice.reducer;