import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import { Box, Text } from "native-base"
import { View, TouchableOpacity } from "react-native"
import { Image } from 'expo-image';
import Feather from '@expo/vector-icons/Feather';
import styles_c from "@assets/styles/styles_c";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import { useEffect } from "react";
import ServiceStorage, { KEY_STORAGE } from "@app-services/service-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@redux/features/userSlice";

interface PersonInfoProps { }
const PersonInfo: React.FC<PersonInfoProps> = () => {
  const { goToEditProfile } = useNavigationComponentApp()
  const { userData } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      (async () => {
        const data = await ServiceStorage.getObject(KEY_STORAGE.ACCOUNT_DATA);
        dispatch(setUserData(data));
      })();
    }
  }, [userData, dispatch]);
  return (
    <Box style={{ ...styles_c.row_between, marginTop: 10 , flex:1, gap:10}}>
      <Box flexDirection={'row'} alignItems={'center'} style={{ gap: 10, flex: 9 }}>
        <Box flex={1}>
          <Image
            source={userData?.user_avatar ? { uri: userData?.user_avatar } : require('@assets/images/Chúa_tể_an.png')}
            style={{ width: sizes._80sdp, height: sizes._80sdp, borderRadius: 50 }}
            contentFit="cover"
            transition={1000}
          />
        </Box>
        <Box flex={3}>
          <Text
            color={colors.black}
            fontWeight={'600'}
            fontSize={sizes._20sdp}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {userData?.user_name ? userData?.user_name : 'Người dùng'}
          </Text>
          <Box
            backgroundColor={colors.text_gray}
            paddingX={'10px'}
            borderRadius={50}
            paddingY={'3px'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text
              color={colors.white}
              fontWeight={'bold'}
              fontSize={sizes._10sdp}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {userData?.role ? userData?.role : 'normal'}
            </Text>
          </Box>
        </Box>
      </Box>
      <TouchableOpacity style={{ padding: 5, flex:1, ...styles_c.col_center }} onPress={() => goToEditProfile()}>
        <Feather name='edit' size={sizes._25sdp} />
      </TouchableOpacity>
    </Box>
  )
}
export default PersonInfo