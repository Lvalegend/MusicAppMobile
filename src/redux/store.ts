import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './features/registerSlice';
import loginReducer from './features/loginSlice';
import userReducer from './features/userSlice';
import albumReducer from './features/albumSlice';
import songAlbumReducer from './features/songAlbumSlice';
import singerSongReducer from './features/singerSongSlice';
import singAlbumReducer from './features/singerAlbumSlice';


const store = configureStore({
  reducer: {
     register: registerReducer,
     login: loginReducer,
     user: userReducer,
     album: albumReducer,
     songAlbum: songAlbumReducer,
     singerSong: singerSongReducer,
     singerAlbum: singAlbumReducer
  },
});

export default store;
