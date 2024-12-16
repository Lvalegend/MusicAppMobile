import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type RecentlyViewedType = {
  song_id?: number
  token: string
}

export const recentlyViewed: any = createAsyncThunk(
  'post/recentlyViewed',
  async (props: RecentlyViewedType) => {
    const response = await useCallAPI('POST', `${URL_API}recently/add?song_id=${props.song_id}`, false, props?.token)
    return response;
  }
);

export const getListRecentlyViewedOfUser: any = createAsyncThunk(
  'get/getListRecentlyViewedOfUser',
  async (props: RecentlyViewedType) => {
    const response = await useCallAPI('GET', `${URL_API}get-data/recently`, false, props?.token)
    return response;
  }
)

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState: {
    dataGetListRecentViewedResponse: [],
    dataAddRecentViewedResponse: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recentlyViewed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.dataAddRecentViewedResponse = action.payload;
      })
      .addCase(recentlyViewed.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getListRecentlyViewedOfUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListRecentlyViewedOfUser.fulfilled, (state, action) => {
        state.loading = false;
        state.dataGetListRecentViewedResponse = action.payload;
      })
      .addCase(getListRecentlyViewedOfUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default recentlyViewedSlice.reducer;
