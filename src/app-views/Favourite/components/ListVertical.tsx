import { Box, Text } from "native-base"
import AntDesign from '@expo/vector-icons/AntDesign';
import sizes from "@assets/styles/sizes";
import colors from "@assets/colors/global_colors";
import { Image } from "expo-image";
import styles_c from "@assets/styles/styles_c";
import { TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
interface ListVerticalProps {
  item?: any
}
const ListVertical: React.FC<ListVerticalProps> = ({ item }) => {
  return (
    <Box>
      <Box style={{ ...styles_c.row_between }}>
        <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
          <Image
            source={require('@assets/images/Chúa_tể_an.png')}
            style={{
              width: sizes._55sdp,
              height: sizes._55sdp,
              borderRadius: 8
            }}
          />
          <Box>
            <Text color={colors.text_black}
              fontSize={sizes._16sdp}
              fontWeight={'bold'}
            >
              Anh Thôi Nhân Nhượng
            </Text>
            <Text color={colors.gray_primary}>Kiều Chi</Text>
          </Box>
        </Box>
        <Box style={{ ...styles_c.row_direction_align_center }}>
          <TouchableOpacity style={{padding:5}}>
            <MaterialIcons
              name="favorite"
              size={sizes._20sdp}
              color={colors.purple}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{padding:5}}>
            <SimpleLineIcons
              name="options-vertical"
              size={sizes._20sdp}
              color={colors.black}
            />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  )
}
export default ListVertical