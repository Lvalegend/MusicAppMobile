import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ParamsGetDataFromMainTable } from 'src/app-schema/schema';

interface AlbumResponse {
  albumResponse: any[];
  filterAlbumResponse: any[];
  paginationAlbumResponse: any[];
  filterPaginationAlbumResponse: any[];
  loading: boolean;
  error: string | null;
  hasMoreFilterPaginationAlbumResponse: boolean;
  hasMorePaginationAlbumResponse: boolean;
  hasFetchingAlbumResponse: boolean;
  hasFetchingFilterAlbumResponse: boolean;
  hasFetchingPaginationAlbumResponse: boolean;
  hasFetchingFilterPaginationAlbumResponse: boolean;
}


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
    albumResponse: [],
    filterAlbumResponse: [],
    paginationAlbumResponse: [],
    filterPaginationAlbumResponse: [],
    loading: false,
    error: null,
    hasMoreFilterPaginationAlbumResponse: true,
    hasMorePaginationAlbumResponse: true,
    hasFetchingAlbumResponse: false,
    hasFetchingFilterAlbumResponse: false,
    hasFetchingPaginationAlbumResponse: false,
    hasFetchingFilterPaginationAlbumResponse: false,
  } as AlbumResponse,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlbumData.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getAlbumData.fulfilled, (state, action) => {
        state.loading = false;
        const { filterColumn, filterValue, limit, page } = action.meta.arg || {};
        const actionChange = { filterValue: filterValue, filterColumn: filterColumn, limit: limit, page: page, ...action.payload }
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (page && limit && filterColumn && filterValue) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMoreFilterPaginationAlbumResponse = false;
          } else {
            state.hasMoreFilterPaginationAlbumResponse = true;
          }
          state.filterPaginationAlbumResponse = state.filterPaginationAlbumResponse ? [...state.filterPaginationAlbumResponse, ...payloadArray] : payloadArray;
          if (payloadArray[0]?.data) {
            state.hasFetchingFilterAlbumResponse = true;
          } else {
            state.hasFetchingFilterAlbumResponse = false;
          }
        }
        else if (filterColumn && filterValue && !page && !limit) {
          state.filterAlbumResponse = state.filterAlbumResponse ? [...state.filterAlbumResponse, ...payloadArray] : payloadArray;
          if (payloadArray[0]?.data) {
            state.hasFetchingFilterAlbumResponse = true;
          } else {
            state.hasFetchingFilterAlbumResponse = false;
          }
        }
        else if (page && limit && !filterColumn && !filterValue) {
          if (payloadArray[0]?.data?.length < limit) {
            state.hasMorePaginationAlbumResponse = false;
          } else {
            state.hasMorePaginationAlbumResponse = true;
          }
          state.paginationAlbumResponse = state.paginationAlbumResponse ? [...state.paginationAlbumResponse, ...payloadArray] : payloadArray;
          if (payloadArray[0]?.data) {
            state.hasFetchingPaginationAlbumResponse = true;
          } else {
            state.hasFetchingPaginationAlbumResponse = false;
          }
        }
        else {
          state.albumResponse = payloadArray;
          if (payloadArray[0]?.data) {
            state.hasFetchingAlbumResponse = true;
          } else {
            state.hasFetchingAlbumResponse = false;
          }
        }
      })
      .addCase(getAlbumData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching album data';
      });
  }
})
export default albumSlice.reducer;