import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Text } from "native-base";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import colors from "@assets/colors/global_colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import responsive_screen from "@assets/styles/responsive";
import URL_API from "@app-helper/urlAPI";
import { useDispatch, useSelector } from "react-redux";
import { updateSongView } from "@redux/features/songSlice";

interface MusicPlayerProps {
}

const MusicPlayer: React.FC<MusicPlayerProps> = () => {
  const { listOptionTabDataCurrent } = useSelector((state: any) => state.songScreen)
  const [randomMode, setRandomMode] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [heard, setHeard] = useState(true);
  const dispatch = useDispatch()

  console.log('song_iddddd', listOptionTabDataCurrent[0]?.data[0]?.song_id)

  const onPressListener = async () => {
    if (heard && listOptionTabDataCurrent[0]?.data[0]?.song_id) {
      setHeard(false)
      console.log('re-render')
      await dispatch(updateSongView(listOptionTabDataCurrent[0]?.data[0]?.song_id))
    }
  }

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

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
    setSound(sound);

    sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
  };

  const updatePlaybackStatus = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);

      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      await loadAndPlaySound();
      setIsPlaying(true);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const seekPosition = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
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
          maximumValue={duration}
          value={position}
          onSlidingComplete={seekPosition}
          minimumTrackTintColor={colors.white}
          maximumTrackTintColor={colors.gray_primary}
          thumbTintColor={colors.white}
        />
        <View style={{ ...styles_c.row_between }}>
          <Text color={colors.white} fontSize={sizes._12sdp}>
            {formatTime(position)}
          </Text>
          <Text color={colors.white} fontSize={sizes._12sdp}>
            {formatTime(duration)}
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
          {isPlaying ? (
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

export default MusicPlayer;