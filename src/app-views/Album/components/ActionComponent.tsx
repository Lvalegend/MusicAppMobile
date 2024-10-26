import { Box, Text } from "native-base"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from "react-native";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import colors from "@assets/colors/global_colors";

interface ActionComponentProps { }
const ActionComponent: React.FC<ActionComponentProps> = () => {
  return (
    <Box style={{ ...styles_c.row_between }}>
      <TouchableOpacity>
        <Box alignItems={'center'}>
          <MaterialCommunityIcons name="download-circle-outline" size={sizes._28sdp} color={colors.black} />
          <Text>Tải xuống</Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: colors.blue_primary,
          padding: 10,
          borderRadius: 20
        }}>
        <Text color={colors.white} style={{ ...styles_c.font_text_16_600 }}>PHÁT NGẪU NHIÊN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Box alignItems={'center'}>
          <MaterialIcons
            name="favorite-outline"
            size={sizes._27sdp}
            color={colors.black}
          />
          <Text>Yêu thích</Text>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
export default ActionComponent