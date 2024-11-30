// redux/features/singerIdSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavouriteSingerProps = {
   singer_id: number,
   is_favourite: boolean
}
// Định nghĩa state ban đầu là một mảng singer_id
interface SingerScreenIdState {
  singerScreenIds: number[];
  listSongCardIds: number[];
  listCheckSingerFavourite: FavouriteSingerProps[]

}

const initialState: SingerScreenIdState = {
  singerScreenIds: [],
  listSongCardIds: [],
  listCheckSingerFavourite: []
};

const singerScreenIdSlice = createSlice({
  name: 'singerScreenId',
  initialState,
  reducers: {
    addSingerScreenId(state, action: PayloadAction<number>) {
      if (!state.singerScreenIds.includes(action.payload)) {
        state.singerScreenIds.push(action.payload);
      }
    },
    removeSingerScreenId(state, action: PayloadAction<number>) {
      state.singerScreenIds = state.singerScreenIds.filter(id => id !== action.payload);
    },
    addListSongCardId(state, action: PayloadAction<number>) {
      if (!state.listSongCardIds.includes(action.payload)) {
        state.listSongCardIds.push(action.payload);
      }
    },
    removeListSongCardId(state, action: PayloadAction<number>) {
      state.listSongCardIds = state.listSongCardIds.filter(id => id !== action.payload);
    },
    setListCheckSingerFavourite: (state, action) => {
      const data = Array.isArray(action.payload) ? action.payload : [action.payload];

      data?.forEach((item) => {
        const existingItem = state.listCheckSingerFavourite?.find(existingItem => existingItem.singer_id === item.singer_id);

        if (existingItem) {
          // Cập nhật trạng thái yêu thích nếu có tồn tại song_id
          existingItem.is_favourite = item.is_favourite;
        } else {
          // Nếu không có song_id trong list, thêm vào
          state.listCheckSingerFavourite.push(item);
        }
      });
    },
    clearListCheckSingerFavourite: (state) => {
      state.listCheckSingerFavourite = [];
    }
  },
});

// Export actions để dispatch
export const { addSingerScreenId, removeSingerScreenId, addListSongCardId, removeListSongCardId, setListCheckSingerFavourite, clearListCheckSingerFavourite } = singerScreenIdSlice.actions;

// Export reducer để đưa vào store
export default singerScreenIdSlice.reducer;
