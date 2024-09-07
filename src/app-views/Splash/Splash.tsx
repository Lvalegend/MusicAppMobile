import React, { memo, useEffect } from 'react';
import { Box, Text } from 'native-base';
import { Image } from 'expo-image';
import { useNavigation, CommonActions } from '@react-navigation/native';
import sizes from '@assets/styles/sizes';

interface SplashProps {}

const Splash: React.FC<SplashProps> = () => {
  const navigation: any = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Box justifyContent={'center'} alignItems={'center'} flex={1} position={'relative'}>
      <Image
        source={require('@assets/images/logoLvalegend.png')}
        style={{ width: sizes._100sdp, height: sizes._102sdp }}
        contentFit="cover"
        transition={1000}
      />
      <Box position={'absolute'} bottom={10}>
        <Text fontSize={sizes._10sdp}>
          Product by Lvalegend
        </Text>
      </Box>
    </Box>
  );
};

export default memo(Splash);
