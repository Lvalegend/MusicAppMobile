import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { CommentId } from '@app-views/Modal/ModalChat/ModalChat';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ParamsGetDataFromMainTable } from 'src/app-schema/schema';

export type CommentSchema = {
  comment_id?: number,
  song_id: number,
  user_id?: number,
  parent_comment_id?: CommentId,
  reply_to_comment_id?: CommentId,
  message: string,
  created_at?: Date,
  updated_at?: Date | null,
  report?: boolean,
  report_message?: string | null,
  comment_entity_id?: number | null,
  song_name?: string,
  song_entity_id?: number | null,
  user_name?: string,
  user_avatar?: string,
  role?: string
};


type DataCommentSend = {
  token?: string,
  data?: CommentSchema
}

export const getCommentData = createAsyncThunk(
  'get/getCommentData',
  async (props?: ParamsGetDataFromMainTable) => {
    const response = await useCallAPI('GET', `${URL_API}get/comment-data?page=${props?.page}&limit=${props?.limit}&filterColumn=${props?.filterColumn ? props?.filterColumn : ''}&filterValue=${props?.filterValue}`)
    return response
  }
)
export const sendCommentData = createAsyncThunk(
  'post/sendCommentData',
  async (props?: DataCommentSend) => {
    const response = await useCallAPI('POST', `${URL_API}comment/upload`, false, props?.token, props?.data)
    return response
  }
)
const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    commentResponse: null,
    filterCommentResponse: null,
    paginationCommentResponse: null,
    filterPaginationCommentResponse: null,
    commentDataSendResponse: null,
    loading: false,
    error: null,
    hasMoreFilterPaginationCommentResponse: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentData.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getCommentData.fulfilled, (state, action) => {
        state.loading = false;
        const { filterColumn, filterValue, limit, page } = action.meta.arg || {};
        const actionChange = { filterValue: filterValue, filterColumn: filterColumn, limit: limit, page: page, ...action.payload }
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (filterColumn && filterValue && page && limit) {
          if (payloadArray[0]?.result?.data?.length < limit) {
            state.hasMoreFilterPaginationCommentResponse = false;
          } else {
            state.hasMoreFilterPaginationCommentResponse = true;
          }
          state.filterPaginationCommentResponse = state.filterPaginationCommentResponse ? [...state.filterPaginationCommentResponse, ...payloadArray] : payloadArray;
        } else if (filterColumn && filterValue && !page && !limit) {
          state.filterCommentResponse = state.filterCommentResponse ? [...state.filterCommentResponse, ...payloadArray] : payloadArray;;
        } else if (page && limit && !filterColumn && !filterValue) {
          state.paginationCommentResponse = state.paginationCommentResponse ? [...state.paginationCommentResponse, ...payloadArray] : payloadArray;
        } else {
          state.commentResponse = state.commentResponse ? [...state.commentResponse, ...payloadArray] : payloadArray;
        }
      })
      .addCase(getCommentData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching comment data';
      });
    builder
      .addCase(sendCommentData.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(sendCommentData.fulfilled, (state, action) => {
        state.loading = false;
        state.commentDataSendResponse = action.payload;
      })
      .addCase(sendCommentData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload || 'Error occurred while fetching comment data';
      });
  }
})
export default commentSlice.reducer;