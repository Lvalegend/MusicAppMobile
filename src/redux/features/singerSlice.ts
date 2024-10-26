import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ParamsGetDataFromMainTable } from 'src/app-schema/schema';

export const getSingerData = createAsyncThunk(
  'get/singerData',
  async (props?: ParamsGetDataFromMainTable) => {
    const response = await useCallAPI('GET', `${URL_API}get/singer-data?page=${props?.page}&limit=${props?.limit}&filterColumn=${props?.filterColumn ? props?.filterColumn : ''}&filterValue=${props?.filterValue}`)
    return response
  }
)
const singerSlice = createSlice({
  name: 'singer',
  initialState: {
    response: null,
    filterResponse: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingerData.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getSingerData.fulfilled, (state, action) => {
        state.loading = false;
        const { filterColumn, filterValue} = action.meta.arg || {};

        if (filterColumn && filterValue) {
          state.filterResponse = action.payload;
        } else {
          state.response = action.payload;
        }
      })
      .addCase(getSingerData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching singer data';
      });
  }
})
export default singerSlice.reducer;