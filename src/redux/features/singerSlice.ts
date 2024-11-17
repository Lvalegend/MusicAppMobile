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
    singerResponse: null,
    filterSingerResponse: null,
    paginationSingerResponse: null,
    filterPaginationSingerResponse: null,
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
        const { filterColumn, filterValue, page, limit} = action.meta.arg || {};
        const actionChange = {filterValue: filterValue, filterColumn: filterColumn, limit: limit, page: page, ...action.payload }
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (filterColumn && filterValue && page && limit) {
          state.filterPaginationSingerResponse = state.filterPaginationSingerResponse ? [...state.filterPaginationSingerResponse, ...payloadArray] : payloadArray;;
        } else if (filterColumn && filterValue && !page && !limit) {
          state.filterSingerResponse = state.filterSingerResponse ? [...state.filterSingerResponse, ...payloadArray] : payloadArray;;
        } else if (page && limit &&!filterColumn &&!filterValue) {
          state.paginationSingerResponse = state.paginationSingerResponse ? [...state.paginationSingerResponse, ...payloadArray] : payloadArray;
        } else {
          state.singerResponse = state.singerResponse ? [...state.singerResponse, ...payloadArray] : payloadArray;
        }
      })
      .addCase(getSingerData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching singer data';
      });
  }
})
export default singerSlice.reducer;