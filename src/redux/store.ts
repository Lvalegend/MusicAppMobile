import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './features/registerSlice';
import loginReducer from './features/loginSlice';
import userReducer from './features/userSlice';
import albumReducer from './features/albumSlice';
import songReducer from './features/songSlice';
import songAlbumReducer from './features/songAlbumSlice';
import singerSongReducer from './features/singerSongSlice';
import singAlbumReducer from './features/singerAlbumSlice';
import playlistReducer from './features/playlistSlice';
import commentReducer from './features/commentSlice';
import songPlaylistReducer from './features/songPlaylistSlice';
import userSongReducer from './features/userSongSlice';
import userAlbumReducer from './features/userAlbumSlice';
import userSingerReducer from './features/userSingerSlice';
import recentlyViewedReducer from './features/recentlyViewedSlice';
import authReducer from './features/authSlice';
import albumScreenIdReducer from './features/components/albumScreenSlice';
import singerScreenIdReducer from './features/components/singerScreenSlice';
import songScreenReducer from './features/components/songScreenSlice';
import musicPlayerReducer from './features/components/musicPlayerSlice';


const store = configureStore({
  reducer: {
     register: registerReducer,
     login: loginReducer,
     user: userReducer,
     album: albumReducer,
     songAlbum: songAlbumReducer,
     singerSong: singerSongReducer,
     singerAlbum: singAlbumReducer,
     playlist: playlistReducer,
     comment: commentReducer,
     songPlaylist: songPlaylistReducer,
     userSong: userSongReducer,
     recentlyViewed: recentlyViewedReducer,
     userAlbum: userAlbumReducer,
     song: songReducer,
     albumScreenId: albumScreenIdReducer,
     singerScreenId: singerScreenIdReducer,
     songScreen: songScreenReducer,
     musicPlayer: musicPlayerReducer,
     userSinger: userSingerReducer,
     authToken: authReducer
  },
});

export default store;
