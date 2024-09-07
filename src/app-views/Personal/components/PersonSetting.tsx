import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import { Box, Text } from "native-base"
import { View, Image, TouchableOpacity } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import styles_c from "@assets/styles/styles_c";

interface PersonSettingProps { }
const PersonSetting: React.FC<PersonSettingProps> = () => {
  return (
    <Box style={{ gap: 10 }}>
      <Box style={{ ...styles_c.row_between, gap: 5 }}>
        <Text
          color={colors.black}
          fontWeight={'bold'}
          fontSize={sizes._20sdp}
        >
          Cài đặt
        </Text>
        <Feather
          name="settings"
          color={colors.black}
          size={sizes._20sdp}
        />
      </Box>
      <TouchableOpacity style={{ ...styles_c.row_direction_align_center, gap: 10, paddingVertical: 5 }}>
        <MaterialIcons
          name='dark-mode'
          color={colors.black}
          size={sizes._24sdp}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          fontSize={sizes._16sdp}
          fontWeight={'500'}
          color={colors.black}
        >
          Chế độ tối
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles_c.row_direction_align_center, gap: 10, paddingVertical: 5 }}>
        <FontAwesome6
          name='angles-up'
          color={colors.purple}
          size={sizes._24sdp}
        />
        <Box marginLeft={'4px'}>
           <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          fontSize={sizes._16sdp}
          fontWeight={'500'}
          color={colors.purple}
        >
          Nâng cấp tài khoản
        </Text>
        </Box>
       
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles_c.row_direction_align_center, gap: 10, paddingVertical: 5 }}>
        <Ionicons
          name="exit-outline"
          color={colors.red}
          size={sizes._24sdp}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          fontSize={sizes._16sdp}
          fontWeight={'500'}
          color={colors.red}
        >
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </Box>
  )
}
export default PersonSetting