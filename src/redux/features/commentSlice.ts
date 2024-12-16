import URL_API from '@app-helper/urlAPI';
import useCallAPI from '@app-helper/useCallAPI';
import { CommentId, ResponeChatData } from '@app-views/Modal/ModalChat/ModalChat';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ParamsGetDataFromMainTable } from 'src/app-schemas/schema';


export type CommentSchema = {
  comment_id?: number;
  song_id: number;
  user_id?: number;
  parent_comment_id?: CommentId;
  reply_to_comment_id?: CommentId;
  message: string;
  created_at?: Date;
  updated_at?: Date | null;
  report?: boolean;
  report_message?: string | null;
  comment_entity_id?: number | null;
  song_name?: string;
  song_entity_id?: number | null;
  user_name?: string;
  user_avatar?: string;
  role?: string;
};

export type CurrentListCommentsType = {
  song_id: number,
  dataCurrentListComments: ResponeChatData[]
}

type DataType = 'filterPagination' | 'pagination'

export type CurrentPageOfSongType = {
  song_id: number,
  currentPageOfSong: number
  type: DataType
}

interface CommentState {
  commentResponse: any[];
  filterCommentResponse: any[];
  paginationCommentResponse: any[];
  filterPaginationCommentResponse: any[];
  commentDataSendResponse: any;
  currentListComments: CurrentListCommentsType[];
  listCurrentPageOfSong: CurrentPageOfSongType[]
  currentDataCommentsWithLoadMore: any[],
  loading: boolean;
  error: string | null;
  hasFetchingFilterPaginationCommentResponse: boolean;
  hasMoreFilterPaginationCommentResponse: boolean;
  hasFetchingFilterCommentResponse: boolean;
  hasFetchingPaginationCommentResponse: boolean;
  hasMorePaginationCommentResponse: boolean;
  hasFetchingCommentResponse: boolean;
  currentPagePaginationCommentResponse: number,
  currentPageFilterPaginationCommentResponse: number,
}


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
    commentResponse: [],
    filterCommentResponse: [],
    paginationCommentResponse: [],
    filterPaginationCommentResponse: [],
    commentDataSendResponse: [],
    currentListComments: [],
    currentDataCommentsWithLoadMore: [],
    listCurrentPageOfSong: [],
    loading: false,
    error: null,
    hasFetchingFilterPaginationCommentResponse: false,
    hasMoreFilterPaginationCommentResponse: true,
    hasFetchingFilterCommentResponse: false,
    hasFetchingPaginationCommentResponse: false,
    hasMorePaginationCommentResponse: true,
    hasFetchingCommentResponse: false,
    currentPagePaginationCommentResponse: 1,
    currentPageFilterPaginationCommentResponse: 1,
  } as CommentState,
  reducers: {
    addCurrentListComments: (state, action: PayloadAction<CurrentListCommentsType>) => {
      const newItem = action.payload;

      const existingItem = state.currentListComments?.find(
        (item) => item?.song_id === newItem?.song_id
      );

      if (existingItem) {
        existingItem.dataCurrentListComments = [
          ...newItem.dataCurrentListComments,
        ];
      } else {
        state.currentListComments?.push(newItem);
      }
    },
    resetDataCurrentLoadMore: (state) => {
      state.currentDataCommentsWithLoadMore = []
    },
    addListCurrentPageOfSong: (state, action: PayloadAction<CurrentPageOfSongType>) => {
      const newItem = action.payload;

      const existingItem = state.listCurrentPageOfSong?.find(
        (item) => item?.song_id === newItem?.song_id && item?.type === newItem?.type
      );

      if (existingItem) {
        existingItem.currentPageOfSong = newItem.currentPageOfSong
      } else {
        state.listCurrentPageOfSong?.push(newItem);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentData.pending, (state) => {
        state.loading = true,
          state.error = null
      })
      .addCase(getCommentData.fulfilled, (state, action) => {
        state.loading = false;
        const { filterColumn, filterValue, limit, page } = action.meta.arg || {};
        const actionChange = { filterValue: filterValue, filterColumn: filterColumn, limit: limit, page: page, ...action.payload };
        const payloadArray = Array.isArray(actionChange) ? actionChange : [actionChange];

        if (filterColumn && filterValue && page && limit) {

          if (payloadArray[0]?.result?.data?.length < limit) {
            state.hasMoreFilterPaginationCommentResponse = false;
          } else {
            state.hasMoreFilterPaginationCommentResponse = true;
          }
          state.filterPaginationCommentResponse = state.filterPaginationCommentResponse
            ? [...state.filterPaginationCommentResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingFilterPaginationCommentResponse = !!payloadArray[0]?.result?.data;
          state.currentPageFilterPaginationCommentResponse = page;
          state.currentDataCommentsWithLoadMore = payloadArray

        } else if (filterColumn && filterValue && !page && !limit) {
          state.filterCommentResponse = state.filterCommentResponse
            ? [...state.filterCommentResponse, ...payloadArray]
            : payloadArray;

          state.hasFetchingFilterCommentResponse = !!payloadArray[0]?.result?.data;

        } else if (page && limit && !filterColumn && !filterValue) {
          if (payloadArray[0]?.result?.data?.length < limit) {
            state.hasMorePaginationCommentResponse = false;
          } else {
            state.hasMorePaginationCommentResponse = true;
          }
          state.paginationCommentResponse = state.paginationCommentResponse
            ? [...state.paginationCommentResponse, ...payloadArray]
            : payloadArray;
          state.hasFetchingPaginationCommentResponse = !!payloadArray[0]?.result?.data;
          state.currentPagePaginationCommentResponse = page
        } else {
          state.commentResponse = payloadArray;
          state.hasFetchingCommentResponse = !!payloadArray[0]?.result?.data;
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
export const { addCurrentListComments, resetDataCurrentLoadMore, addListCurrentPageOfSong } = commentSlice.actions
export default commentSlice.reducer;