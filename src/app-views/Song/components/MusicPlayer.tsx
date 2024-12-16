import URL_API from "@app-helper/urlAPI";
import colors from "@assets/colors/global_colors";
import responsive_screen from "@assets/styles/responsive";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Slider from "@react-native-community/slider";
import { recentlyViewed } from "@redux/features/recentlyViewedSlice";
import { updateSongView } from "@redux/features/songSlice";
import { Audio } from "expo-av";
import { Text } from "native-base";
import React, { memo, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "src/app-context/ContextProvider";

interface MusicPlayerProps {
}

const MusicPlayer: React.FC<MusicPlayerProps> = () => {
  const { listOptionTabDataCurrent } = useSelector((state: any) => state.songScreen)
  const { token } = useSelector((state: any) => state.authToken)
  const [randomMode, setRandomMode] = useState(false);
  const { musicPlayerState, musicPlayerDispatch } = useAppContext();
  // const [sound, setSound] = useState<Audio.Sound | null>(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [position, setPosition] = useState(0);
  // const [duration, setDuration] = useState(0);
  const dispatch = useDispatch()

  console.log('song_iddddd', listOptionTabDataCurrent[0]?.data[0]?.song_id)
  useEffect(() => {
    const resetMusicPlayer = async () => {
      if (musicPlayerState.sound) {
        try {
          await musicPlayerState.sound.unloadAsync();
        } catch (error) {
          console.error('Error unloading sound:', error);
        }
      }

      musicPlayerDispatch({ type: 'RESET_DATA_MUSIC_PLAYER' });

      musicPlayerDispatch({
        type: 'SET_CURRENT_SONG_ID',
        payload: listOptionTabDataCurrent[0]?.song_id,
      });
    };

    // So sánh ID bài hát để phát hiện thay đổi
    if (listOptionTabDataCurrent[0]?.song_id !== musicPlayerState.currentSongId) {
      console.log('Bài hát thay đổi, thực hiện reset');
      resetMusicPlayer();
    }
  }, [listOptionTabDataCurrent, musicPlayerState.sound, musicPlayerState.currentSongId]);


  const onPressListener = async () => {
    if (listOptionTabDataCurrent[0]?.data[0]?.song_id) {
      console.log('re-render')
      dispatch(updateSongView(listOptionTabDataCurrent[0]?.data[0]?.song_id))
      if (token) {
        dispatch(recentlyViewed({ song_id: listOptionTabDataCurrent[0]?.data[0]?.song_id, token: token }))
      }
    }
  }

  // useEffect(() => {
  //   musicPlayerDispatch({ type: 'SET_IS_PLAYING', payload: false });
  //   // dispatch(setIsPlaying(false))
  // }, [])

  // useEffect(() => {
  //   return musicPlayerState.sound
  //     ? () => {
  //       musicPlayerState.sound.unloadAsync();
  //     }
  //     : undefined;
  // }, [musicPlayerState.sound]);

  const loadAndPlaySound = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: 1,
      interruptionModeAndroid: 2,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    const { sound } = await Audio.Sound.createAsync(
      listOptionTabDataCurrent[0]?.data[0]?.song_url ? { uri: `${URL_API}audio/${listOptionTabDataCurrent[0]?.data[0]?.song_url}` } : require('@assets/musics/Có hẹn với thanh xuân/co-hen-voi-thanh-xuan-MONSTAR.mp3'),
      { shouldPlay: true }
    );
    // dispatch(setSound(sound));
    musicPlayerDispatch({ type: 'SET_SOUND', payload: sound });
  };

  useEffect(() => {
    if (musicPlayerState.sound) {
      musicPlayerState.sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
    }
  }, [musicPlayerState.sound]);


  const updatePlaybackStatus = (status: any) => {
    if (status.isLoaded) {
      // dispatch(setPosition(status.positionMillis))
      // dispatch(setDuration(status.durationMillis))
      musicPlayerDispatch({ type: 'SET_POSITION', payload: status.positionMillis });
      musicPlayerDispatch({ type: 'SET_DURATION', payload: status.durationMillis })
      // setPosition(status.positionMillis);
      // setDuration(status.durationMillis);

      if (status.didJustFinish && !musicPlayerState.isPlaying) {
        // dispatch(setIsPlaying(false))
        // setIsPlaying(false);
        musicPlayerDispatch({ type: 'SET_IS_PLAYING', payload: false });
      }
    }
  };

  const playSound = async () => {
    if (musicPlayerState.sound) {
      await musicPlayerState.sound.playAsync();
      // setIsPlaying(true);
      // dispatch(setIsPlaying(true))
      musicPlayerDispatch({ type: 'SET_IS_PLAYING', payload: true });
      musicPlayerDispatch({ type: 'SET_PAUSE_MUSIC', payload: pauseSound });
      console.log('re-render')
    } else {
      await loadAndPlaySound();
      // setIsPlaying(true);
      // dispatch(setIsPlaying(true))
      console.log('re-render-2')
      musicPlayerDispatch({ type: 'SET_IS_PLAYING', payload: true });
      musicPlayerDispatch({ type: 'SET_PAUSE_MUSIC', payload: pauseSound });
    }
  };

  const pauseSound = async () => {
    if (musicPlayerState.sound) {
      await musicPlayerState.sound.pauseAsync();
      // setIsPlaying(false);
      // dispatch(setIsPlaying(false))
      musicPlayerDispatch({ type: 'SET_IS_PLAYING', payload: false });
    }
  };
  console.log('isPlaying', musicPlayerState.isPlaying);
  console.log('duration:', musicPlayerState.duration);
  console.log('position:', musicPlayerState.position);
  console.log('currentSongId:', musicPlayerState.currentSongId);
  // console.log('sound:', musicPlayerState.sound);


  // const stopSound = async () => {
  //   if (sound) {
  //     await sound.stopAsync();
  //     setIsPlaying(false);
  //   }
  // };

  const seekPosition = async (value: number) => {
    if (musicPlayerState.sound) {
      await musicPlayerState.sound.setPositionAsync(value);
      musicPlayerDispatch({ type: 'SET_POSITION', payload: value }); // chú ý
    }
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds: any = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={musicPlayerState.duration}
          value={musicPlayerState.position}
          onSlidingComplete={seekPosition}
          minimumTrackTintColor={colors.white}
          maximumTrackTintColor={colors.gray_primary}
          thumbTintColor={colors.white}
        />
        <View style={{ ...styles_c.row_between }}>
          <Text color={colors.white} fontSize={sizes._12sdp}>
            {formatTime(musicPlayerState.position)}
          </Text>
          <Text color={colors.white} fontSize={sizes._12sdp}>
            {formatTime(musicPlayerState.duration)}
          </Text>
        </View>
      </View>
      <View style={{ ...styles_c.row_direction_align_center }}>
        <TouchableOpacity
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsive_screen.h_bigger_767px(25, 5),
          }}
          onPress={() => setRandomMode(!randomMode)}
        >
          <FontAwesome name="random" size={sizes._28sdp} color={randomMode === true ? colors.blue_primary : colors.white} />
        </TouchableOpacity>
        <View style={{
          ...styles_c.row_center,
          gap: 10,
          marginTop: responsive_screen.h_bigger_767px(20, 0),
          width: '90%',
          paddingRight: 20
        }}>
          <TouchableOpacity style={styles.button}>
            <AntDesign name="stepbackward" size={sizes._35sdp} color={colors.white} />
          </TouchableOpacity>
          {musicPlayerState.isPlaying ? (
            <TouchableOpacity onPress={pauseSound} style={styles.button}>
              <AntDesign name="pausecircleo" size={sizes._65sdp} color={colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => { playSound(), onPressListener() }} style={styles.button}>
              <AntDesign name="playcircleo" size={sizes._65sdp} color={colors.white} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button}>
            <AntDesign name="stepforward" size={sizes._35sdp} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  button: {
    padding: 10,
  },
  slider: {
    width: '100%',
  },
});

export default memo(MusicPlayer);