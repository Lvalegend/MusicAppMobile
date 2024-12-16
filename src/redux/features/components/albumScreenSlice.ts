// redux/features/albumIdSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa state ban đầu là một mảng album_id

type FavouriteAlbumProps = {
   album_id: number,
   is_favourite: boolean
}
interface AlbumScreenIdState {
  albumScreenIds: number[];
  listCheckAlbumFavourite: FavouriteAlbumProps[]
}

const initialState: AlbumScreenIdState = {
  albumScreenIds: [],
  listCheckAlbumFavourite: []
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
    setListCheckAlbumFavourite: (state, action) => {
      const data = Array.isArray(action.payload) ? action.payload : [action.payload];

      data?.forEach((item) => {
        const existingItem = state.listCheckAlbumFavourite?.find(existingItem => existingItem.album_id === item.album_id);

        if (existingItem) {
          // Cập nhật trạng thái yêu thích nếu có tồn tại song_id
          existingItem.is_favourite = item.is_favourite;
        } else {
          // Nếu không có song_id trong list, thêm vào
          state.listCheckAlbumFavourite.push(item);
        }
      });
    },
    clearListCheckAlbumFavourite: (state) => {
      state.listCheckAlbumFavourite = [];
    }
  },
});

// Export actions để dispatch
export const { addAlbumScreenId, removeAlbumScreenId, setListCheckAlbumFavourite, clearListCheckAlbumFavourite } = albumScreenIdSlice.actions;

// Export reducer để đưa vào store
export default albumScreenIdSlice.reducer;
