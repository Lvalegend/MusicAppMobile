import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import URL_API from "@app-helper/urlAPI";
import ServiceStorage, { KEY_STORAGE } from "@app-services/service-storage";
import { LOGOAPP } from "@app-uikits/image";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { Box, Text } from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

interface PersonInfoProps { }

const PersonInfo: React.FC<PersonInfoProps> = () => {
  const { goToEditProfile } = useNavigationComponentApp()
  const [userData, setUserData] = useState<any>({})

  useEffect(() => {
    (async () => {
      const data = await ServiceStorage.getObject(KEY_STORAGE.ACCOUNT_DATA);
      setUserData(data)
    })();
  }, []);

  console.log('userData', userData)

  const changeRole = (role: string) => {
    switch (role) {
      case 'admin':
        return 'QUẢN TRỊ VIÊN'
      case 'normal':
        return 'THƯỜNG'
      case 'vip':
        return 'VIP'
    }
  }
  return (
    <Box style={{ ...styles_c.row_between, marginTop: 10, flex: 1, gap: 10 }}>
      <Box flexDirection={'row'} alignItems={'center'} style={{ gap: 10, flex: 9 }}>
        <Box flex={1}>
          <Image
            source={userData?.user_avatar ? { uri: `${URL_API}/image/${userData?.user_avatar}` } : LOGOAPP}
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
              {changeRole(userData?.role)}
            </Text>
          </Box>
        </Box>
      </Box>
      <TouchableOpacity style={{ padding: 5, flex: 1, ...styles_c.col_center }} onPress={() => goToEditProfile()}>
        <Feather name='edit' size={sizes._25sdp} />
      </TouchableOpacity>
    </Box>
  )
}
export default PersonInfo