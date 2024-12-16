import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Animated, Easing } from 'react-native';
import { Audio } from 'expo-av';
import useCallAPI from '@app-helper/useCallAPI';
import URL_API from '@app-helper/urlAPI';
import axios from 'axios';
import { useNavigationComponentApp } from '@app-helper/navigateToScreens';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import sizes from '@assets/styles/sizes';
import colors from '@assets/colors/global_colors';
import styles_c from '@assets/styles/styles_c';
import showToastApp from '@app-components/CustomToast/ShowToastApp';
import { useAppContext } from 'src/app-context/ContextProvider';

export default function SpeechToText() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [recordings, setRecordings] = useState<any>({});
  const [pulseAnim] = useState(new Animated.Value(1)); // Pulse animation
  const {musicPlayerState,  musicPlayerDispatch } = useAppContext();
  const { goToSongScreen } = useNavigationComponentApp();

  // Start pulse animation when recording
  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if(musicPlayerState.isPlaying && musicPlayerState.pauseMusic){
         musicPlayerState.pauseMusic()
      }
      if (perm.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
        startPulse(); 
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    setRecordings(
      {
        sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI(),
      }
    );
    pulseAnim.stopAnimation(); // Stop animation
  }

  let silenceTimeout: NodeJS.Timeout | null = null; // Biến lưu timeout để kiểm soát thời gian
  const [meteringList, setMeteringList] = useState<number[]>([]);
  console.log('meteringList', meteringList)

  async function monitorAudioLevel() {
    if (recording) {
      const status = await recording.getStatusAsync();
      if (status.metering && status.metering > -60) { // Ngưỡng: -60 dB
        console.log('Âm thanh đủ lớn:', status.metering);
        setMeteringList((prev: any) => [...prev, status.metering]);

        if (silenceTimeout) {
          clearTimeout(silenceTimeout);
          silenceTimeout = null;
        }
      } else {
        console.log('Âm thanh dưới ngưỡng:', status.metering);
        setMeteringList((prev: any) => [...prev, status.metering]);
        if (!silenceTimeout) {
          silenceTimeout = setTimeout(() => {
            stopRecording();
            console.log('Dừng ghi âm vì âm thanh dưới ngưỡng trong 2 giây.');
          }, 2000);
        }
      }
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (recording) {
      interval = setInterval(monitorAudioLevel, 500); // Kiểm tra âm thanh mỗi 500ms
    }
    return () => {
      clearInterval(interval);
      if (silenceTimeout) {
        clearTimeout(silenceTimeout); // Xóa timeout khi component bị unmount
        silenceTimeout = null;
      }
    };
  }, [recording]);



  function getDurationFormatted(milliseconds: number) {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.round((milliseconds / 1000) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  const sendFile = async () => {
    try {
      const formData: any = new FormData();
      formData.append('record', {
        uri: recordings.file,
        name: 'testRecord.m4a',
        type: 'audio/mp4',
      });
      const response = await axios.post(`${URL_API}search/speech-to-text/data`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        console.log('response.dataaaaaaaaaaa', response.data);
        console.log('Tải lên thành công');
        if (response?.data?.data > 0) {
          goToSongScreen({ song_id: response?.data?.data });
        }
        else {
          showToastApp({
            type: 'info',
            title: 'Không tìm thấy bài hát có tên trùng khớp'
          })
        }
      }
    } catch (error) {
      console.error('err:', error);
    }
  };

  useEffect(() => {
    if (meteringList?.length > 0 && recordings && !recording) {
      const hasTwoLargerThanMinus60 = meteringList?.reduce((count, value) => {
        if (value > -60) count++;
        return count;
      }, 0) >= 2;
      if (hasTwoLargerThanMinus60) {
        setMeteringList([])
        sendFile()
      } else {
        setMeteringList([])
      }
    }
  }, [meteringList, recordings])

  return (
    <View style={styles.container}>
      {/* Record button with animation */}
      <TouchableOpacity
        onPress={recording ? stopRecording : startRecording}
        style={{
          borderRadius: 9999,
          borderWidth: 1,
          width: sizes._150sdp,
          height: sizes._150sdp,
          ...styles_c.col_center,
        }}
      >
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              transform: [{ scale: pulseAnim }],
              opacity: recording ? 0.5 : 0, // Hide pulse effect when not recording
            },
          ]}
        />
        <View>
          <FontAwesome name="microphone" size={sizes._70sdp} color={colors.text_black} />
        </View>
      </TouchableOpacity>

      {/* Recordings list */}
      {Object.keys(recordings)?.length > 0 && (
        <View style={styles.recordingsContainer}>
          <View style={styles.recordingRow}>
            <Text>
              Recording {recordings.duration}
            </Text>
            <Button onPress={() => recordings.sound.replayAsync()} title="Play" />
          </View>
        </View>
      )}

      {/* Send file */}
      <TouchableOpacity onPress={sendFile} style={{ padding: 10, borderWidth: 1, marginTop: 10 }}>
        <Text>Send file</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: sizes._150sdp,
    height: sizes._150sdp,
    borderRadius: sizes._75sdp,
    backgroundColor: colors.text_black,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: sizes._100sdp,
    height: sizes._100sdp,
    borderRadius: sizes._50sdp,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: colors.text_black,
  },
  recordingsContainer: {
    marginTop: 20,
    width: '80%',
  },
  recordingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
});
