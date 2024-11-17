// redux/features/albumIdSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa state ban đầu là một mảng album_id
interface AlbumScreenIdState {
  albumScreenIds: number[];
}

const initialState: AlbumScreenIdState = {
  albumScreenIds: [],
};

const albumScreenIdSlice = createSlice({
  name: 'albumScreenId',
  initialState,
  reducers: {
    // Action để thêm albumScreen_id vào mảng
    addAlbumScreenId(state, action: PayloadAction<number>) {
      // Kiểm tra xem albumScreen_id đã có trong mảng chưa, nếu chưa thì thêm vào
      if (!state.albumScreenIds.includes(action.payload)) {
        state.albumScreenIds.push(action.payload);
      }
    },
    // Action để xóa albumScreen_id khỏi mảng
    removeAlbumScreenId(state, action: PayloadAction<number>) {
      state.albumScreenIds = state.albumScreenIds.filter(id => id !== action.payload);
    },
  },
});

// Export actions để dispatch
export const { addAlbumScreenId, removeAlbumScreenId } = albumScreenIdSlice.actions;

// Export reducer để đưa vào store
export default albumScreenIdSlice.reducer;
