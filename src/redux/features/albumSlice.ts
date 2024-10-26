import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ParamsGetDataFromMainTable } from 'src/app-schema/schema';

export const getAlbumData = createAsyncThunk(
  'get/albumData',
  async (props?: ParamsGetDataFromMainTable) => {
    const response = await useCallAPI('GET', `${URL_API}get/album-data?page=${props?.page}&limit=${props?.limit}&filterColumn=${props?.filterColumn ? props?.filterColumn : ''}&filterValue=${props?.filterValue}`)
    return response
  }
)
const albumSlice = createSlice({
  name: 'album',
  initialState: {
    response: null,
    filterResponse: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlbumData.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getAlbumData.fulfilled, (state, action) => {
        state.loading = false;
        const { filterColumn, filterValue} = action.meta.arg || {};

        if (filterColumn && filterValue) {
          state.filterResponse = action.payload;
        } else {
          state.response = action.payload;
        }
      })
      .addCase(getAlbumData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching album data';
      });
  }
})
export default albumSlice.reducer;