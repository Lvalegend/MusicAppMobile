import { Props } from '@app-views/Song/components/ListOptionTab';
import { createSlice } from '@reduxjs/toolkit';

type FavouriteDataProps = {
  song_id: number,
  is_favourite: boolean | null
}

interface SongScreenState {
  listOptionTabData: Props[];
  listOptionTabDataCurrent: Props[]
  listCheckFavourite: FavouriteDataProps[]
}
const initialState: SongScreenState = {
  listOptionTabData: [],
  listOptionTabDataCurrent: [],
  listCheckFavourite: []
};

const songScreenSlice = createSlice({
  name: 'songScreen',
  initialState,
  reducers: {
    setListCheckFavourite: (state, action) => {
      const data = Array.isArray(action.payload) ? action.payload : [action.payload];

      data?.forEach((item) => {
        const existingItem = state.listCheckFavourite.find(existingItem => existingItem.song_id === item.song_id);

        if (existingItem) {
          // Cập nhật trạng thái yêu thích nếu có tồn tại song_id
          existingItem.is_favourite = item.is_favourite;
        } else {
          // Nếu không có song_id trong list, thêm vào
          state.listCheckFavourite.push(item);
        }
      });
    },
    setListOptionTabDataCurrent: (state, action) => {
      const data = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.listOptionTabDataCurrent = data
    },
    setListOptionTabData: (state, action) => {
      const data = Array.isArray(action.payload) ? action.payload : [action.payload];

      data.forEach((item) => {
        const existingItem = state.listOptionTabData?.find(existingItem => existingItem.song_id === item.song_id);

        if (existingItem) {
          if (!existingItem.album_id && item.album_id) {
            existingItem.album_id = item.album_id;
          }
          if (!existingItem.album_name && item.album_name) {
            existingItem.album_name = item.album_name;
          }
          if (!existingItem.song_name && item.song_name) {
            existingItem.song_name = item.song_name;
          }
          if (!existingItem.data && item.data) {
            existingItem.data = item.data;
          }
        } else {
          state.listOptionTabData.push(item);
        }
      });
    },
    clearListOptionTabData: (state) => {
      state.listOptionTabData = [];
    },
    clearListCheckFavourite: (state) => {
      state.listOptionTabData = [];
    },
    clearListOptionTabDataCurrent: (state) => {
      state.listOptionTabDataCurrent = [];
    },

  },
});

export const {
  setListOptionTabData,
  clearListOptionTabData,
  setListOptionTabDataCurrent,
  clearListOptionTabDataCurrent,
  setListCheckFavourite,
  clearListCheckFavourite
} = songScreenSlice.actions;
export default songScreenSlice.reducer;
