import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type PlaylistProps = {
  token: string
  playlist_name?: string,
  page?: number
  limit?: number
}

export const createPlaylist: any = createAsyncThunk(
  'post/createPlaylist',
  async (props: PlaylistProps) => {
    console.log(props.playlist_name)
    const response = await useCallAPI('POST', `${URL_API}create/playlist`, true, props?.token, { playlist_name: props?.playlist_name })
    return response;
  }
);

export const getListPlaylistOfUser: any = createAsyncThunk(
  'get/getPlaylistOfUser',
  async (props: PlaylistProps) => {
    const response = await useCallAPI('GET', `${URL_API}get/user-playlist-data?page=${props?.page}&limit=${props?.limit}`, false, props?.token)
    return response;
  }
)

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    paginationPlaylistData: [],
    allPlaylistData: [],
    playlistDataSendResponse: null,
    hasFetchingPaginationPlaylistData: false,
    currentPagePaginationPlaylistData: 1,
    hasMorePaginationPlaylistData: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlistDataSendResponse = action.payload;
      })
      .addCase(createPlaylist.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getListPlaylistOfUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListPlaylistOfUser.fulfilled, (state, action) => {
        state.loading = false;
        const { limit, page } = action.meta.arg || {};
        const payloadArray = Array.isArray(action.payload) ? action.payload : [action.payload];
        if (page && limit) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMorePaginationPlaylistData = false;
          } else {
            state.hasMorePaginationPlaylistData = true;
          }
          state.paginationPlaylistData = state.paginationPlaylistData ? [...state.paginationPlaylistData, ...payloadArray] : payloadArray;
          state.hasFetchingPaginationPlaylistData = !!payloadArray[0]?.data;
          state.currentPagePaginationPlaylistData = page;
        } else {
          state.allPlaylistData = payloadArray;
        }
      })
      .addCase(getListPlaylistOfUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default playlistSlice.reducer;
