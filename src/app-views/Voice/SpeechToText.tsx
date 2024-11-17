import { Container, Content, Footer, Header } from "@app-layout/Layout";
import { Box, Text } from "native-base";
import Voice from '@react-native-voice/voice';
import React, { useEffect, useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import sizes from "@assets/styles/sizes";
import { PermissionsAndroid, Platform, TextInput, TouchableOpacity } from "react-native";
import styles_c from "@assets/styles/styles_c";
import colors from "@assets/colors/global_colors";
import { Audio } from 'expo-av';

interface SpeechToTextProps {}

const SpeechToText: React.FC<SpeechToTextProps> = () => {
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    const getPermissions = async () => {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message: "We need access to your microphone to convert speech to text",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        setHasPermission(permission === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const { status } = await Audio.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    };

    getPermissions();

    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event: any) => {
    console.log('Speech results:', event);
    const text = event.value[0];
    setRecognizedText(text);
  };

  const onSpeechError = (error: any) => {
    console.log('Speech error:', error);
  };

  const startListening = async () => {
    if (hasPermission) {
      console.log('Permission granted, starting voice recognition...');
      setIsListening(true);
      try {
        await Voice.start('en-US');
      } catch (err) {
        console.log('Error starting voice recognition:', err);
      }
    } else {
      console.log('Microphone permission not granted');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      Voice.removeAllListeners();
      setIsListening(false);
    } catch (err) {
      console.log('Error stopping voice recognition:', err);
    }
  };

  return (
    <Container>
      <Header>
        <Box style={{ ...styles_c.col_center }}>
          <Text>Welcome to Speech to Text</Text>
        </Box>
      </Header>
      <Content>
        <Box style={{ ...styles_c.col_center }}>
          <TextInput
            style={{
              width: sizes._100sdp,
              padding: 10,
              backgroundColor: colors.gray_primary,
            }}
            placeholder="Enter text"
            value={recognizedText}
            onChangeText={(text) => setRecognizedText(text)}
          />
          <TouchableOpacity
            style={{
              ...styles_c.col_center,
              borderWidth: 1,
              padding: 10,
              borderRadius: 9999,
              width: sizes._200sdp,
              height: sizes._200sdp
            }}
            onPress={() => (isListening ? stopListening() : startListening())}
          >
            {isListening ? (
              <Text>...</Text>
            ) : (
              <FontAwesome name="microphone" size={sizes._50sdp} color="black" />
            )}
          </TouchableOpacity>
        </Box>
      </Content>
      <Footer />
    </Container>
  );
};

export default SpeechToText;
