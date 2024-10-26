import { LOGOAPP } from "@app-uikits/image"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { Image } from "expo-image"
import { Box, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "@assets/colors/global_colors"

interface CommentCardProps { }
const CommentCard: React.FC<CommentCardProps> = () => {
  return (
    <Box margin={'15px'}>
      <Box style={{ ...styles_c.row_between }}>
        <Box style={{ ...styles_c.row_between, gap: 10 }}>
          <Box alignSelf={'flex-start'}>
            <Image
              source={LOGOAPP}
              style={{ width: sizes._40sdp, height: sizes._40sdp, borderRadius: 9999 }}
            />
          </Box>
          <Box>
            <Box style={{ ...styles_c.row_direction_align_center, gap: 5 }}>
              <Text style={{ ...styles_c.font_text_14_600 }}>Mỹ Huệ</Text>
              <Box style={{ backgroundColor: colors.purple, paddingHorizontal: 10, borderRadius: 6 }}>
                <Text style={{ ...styles_c.font_text_10_600, color: colors.text_white }}>PLUS</Text>
              </Box>
              <Text style={{ ...styles_c.font_text_12_400, color: colors.text_gray }}>- 18/10/2024</Text>
            </Box>
            <Box style={{ width: sizes._270sdp }}>
              <Text style={{ flexWrap: 'wrap' }}>
                An quá đẹp traiaaaavcxvcvcvcvgfbhgbvbcvbcvbncvbncvbncvbnvbnvbnbvnvbn
                xvcxvcvcv
                vcvxcvsdbfcdsbnfjksdnjkgnsdjkfgnjksdbnjkf
              </Text>
            </Box>
          </Box>
        </Box>
        <TouchableOpacity style={{alignSelf:'flex-start', marginTop:10}}>
          <SimpleLineIcons name="options-vertical" size={sizes._18sdp} color={colors.gray_primary} />
        </TouchableOpacity>
      </Box>
      <Box style={{ ...styles_c.row_direction_align_center, marginLeft: 45 }}>
        <TouchableOpacity style={{ padding: 5 }}>
          <MaterialIcons name="favorite-border" size={sizes._18sdp} color={colors.gray_primary} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 5 }}>
          <Text color={colors.text_gray}>
            Trả lời
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
export default CommentCard