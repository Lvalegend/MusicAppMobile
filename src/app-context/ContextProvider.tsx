import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface MusicPlayerState {
  currentSongId: string | number;
  isPlaying: boolean;
  position: number;
  duration: number;
  sound: any;
  pauseMusic: (() => void) | null
}

const initialMusicPlayerState: MusicPlayerState = {
  currentSongId: '',
  isPlaying: false,
  position: 0,
  duration: 0,
  sound: null,
  pauseMusic: null
};

const musicPlayerReducer = (state: MusicPlayerState, action: any): MusicPlayerState => {
  switch (action.type) {
    case 'SET_CURRENT_SONG_ID':
      return { ...state, currentSongId: action.payload };
    case 'SET_IS_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'SET_POSITION':
      return { ...state, position: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_SOUND':
      return { ...state, sound: action.payload };
    case 'RESET_DATA_MUSIC_PLAYER':
      return { ...state, isPlaying: false, position: 0, duration: 0, sound: null, pauseMusic: null };
    case 'SET_PAUSE_MUSIC':
       return {...state, pauseMusic: action.payload}
    default:
      return state;
  }
};

// State và actions cho AlbumScreen
interface AlbumScreenIdState {
  albumScreenIds: number[];
}

const initialAlbumScreenState: AlbumScreenIdState = {
  albumScreenIds: [],
};

const albumScreenIdReducer = (state: AlbumScreenIdState, action: any): AlbumScreenIdState => {
  switch (action.type) {
    case 'ADD_ALBUM_SCREEN_ID':
      if (!state.albumScreenIds.includes(action.payload)) {
        return { ...state, albumScreenIds: [...state.albumScreenIds, action.payload] };
      }
      return state;
    case 'REMOVE_ALBUM_SCREEN_ID':
      return {
        ...state,
        albumScreenIds: state.albumScreenIds.filter(id => id !== action.payload),
      };
    default:
      return state;
  }
};

interface APIContextProps {
  musicPlayerState: MusicPlayerState;
  albumScreenState: AlbumScreenIdState;
  musicPlayerDispatch: React.Dispatch<any>;
  albumScreenDispatch: React.Dispatch<any>;
}

const APIContext = createContext<APIContextProps | undefined>(undefined);

export const APIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [musicPlayerState, musicPlayerDispatch] = useReducer(musicPlayerReducer, initialMusicPlayerState);
  const [albumScreenState, albumScreenDispatch] = useReducer(albumScreenIdReducer, initialAlbumScreenState);

  return (
    <APIContext.Provider
      value={
        {
          musicPlayerState,
          albumScreenState,
          musicPlayerDispatch,
          albumScreenDispatch
        }
      }>
      {children}
    </APIContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAppContext must be used within a StateProvider');
  }
  return context;
};
