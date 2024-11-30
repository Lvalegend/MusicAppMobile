import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MusicPlayerState {
  currentSongId: string | number
  isPlaying: boolean;
  position: number;
  duration: number;
  sound: any
}

const initialState: MusicPlayerState = {
  currentSongId: '',
  isPlaying: false,
  position: 0,
  duration: 0,
  sound: null
};

const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    setCurrentSongId: (state, action: PayloadAction<number | string>) => {
      state.currentSongId = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setPosition: (state, action: PayloadAction<number>) => {
      state.position = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setSound: (state, action: PayloadAction<any>) => {
      state.sound = action.payload;
    },
    resetDataMusicPlayer: (state) => {
      state.isPlaying = false;
      state.position = 0;
      state.duration = 0;
      state.sound = null
    }
  },
});

export const { setCurrentSongId, setIsPlaying, setPosition, setDuration, resetDataMusicPlayer, setSound } = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
