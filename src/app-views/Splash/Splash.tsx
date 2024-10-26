import React, { memo, useEffect } from 'react';
import { Box, Text } from 'native-base';
import { Image } from 'expo-image';
import { useNavigation, CommonActions } from '@react-navigation/native';
import sizes from '@assets/styles/sizes';
import ServiceStorage, { KEY_STORAGE } from '@app-services/service-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@redux/features/loginSlice';

interface SplashProps { }

const Splash: React.FC<SplashProps> = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const { loading, error, response } = useSelector((state: any) => state.login);

  const getTokenData = async () => {
    const userData = await ServiceStorage.getObject(KEY_STORAGE.ACCOUNT_DATA);

    if (userData?.email && userData?.password) {
      dispatch(loginUser({ email: userData.email, password: userData.password }));
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    }
  };

  useEffect(() => {
    getTokenData();
  }, []);

  useEffect(() => {
    if (response?.token) {
      (async() => {
        await ServiceStorage.setString(KEY_STORAGE.USER_TOKEN, response?.token)
        await navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'BottomContainer' }],
          })
        )
      })()
    } else if (error) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    }
  }, [response?.token, error, navigation]);

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
