import { Props } from '@app-views/Song/components/ListOptionTab';
import { createSlice } from '@reduxjs/toolkit';


interface ListOptionTabState {
  listOptionTabData: Props[];
  listOptionTabDataCurrent: Props[]
}
const initialState: ListOptionTabState = {
  listOptionTabData: [],
  listOptionTabDataCurrent: []
};

const songScreenSlice = createSlice({
  name: 'songScreen',
  initialState,
  reducers: {
    setListOptionTabData: (state, action) => {
      const data = Array.isArray(action.payload) ? action.payload : [action.payload];

      data.forEach((item) => {
        const existingItem = state.listOptionTabData.find(existingItem => existingItem.song_id === item.song_id);

        if (existingItem) {
          // Cập nhật các trường nếu chúng chưa có
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
          // Nếu phần tử chưa có trong mảng, thêm mới
          state.listOptionTabData.push(item);
        }
      });
    },
    setListOptionTabDataCurrent: (state, action) => {
      const data = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.listOptionTabDataCurrent = data
    },
    clearListOptionTabData: (state) => {
      state.listOptionTabData = [];
    },
    clearListOptionTabDataCurrent: (state) => {
      state.listOptionTabDataCurrent = [];
    },
  },
});

export const { setListOptionTabData, clearListOptionTabData,setListOptionTabDataCurrent, clearListOptionTabDataCurrent  } = songScreenSlice.actions;
export default songScreenSlice.reducer;
