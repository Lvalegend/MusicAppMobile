import { Box, Circle, Square, Text } from "native-base"
import { ScrollView, TouchableNativeFeedback } from "react-native"
import Octicons from '@expo/vector-icons/Octicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles_c from "@assets/styles/styles_c";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";

interface AccountPackageProps { }
const AccountPackage: React.FC<AccountPackageProps> = () => {
  const { goToViewAccountPackage } = useNavigationComponentApp()
  return (
    <TouchableNativeFeedback onPress={() => goToViewAccountPackage()}>
      <Box
        style={{
          backgroundColor: colors.white_purple,
          padding: 10,
          borderRadius: 10,
          gap: 10,
          borderWidth: 1,
          borderColor: colors.purple
        }}>
        <Box style={{ ...styles_c.row_between }}>
          <Box style={{ gap: 5, ...styles_c.row_direction_align_center }}>
            <Text style={{ ...styles_c.font_text_18_600, color: colors.text_purple }}>Tài khoản</Text>
            <Square backgroundColor={colors.purple} paddingX={'10px'} borderRadius={'8px'}>
              <Text style={{ ...styles_c.font_text_14_600, color: colors.text_white }}>PLUS</Text>
            </Square>
          </Box>
          <Box>
            <AntDesign name="right" size={24} color="black" />
          </Box>
        </Box>
        <Box>
          <Text style={{ ...styles_c.font_text_14_600 }}>19,000đ</Text>
        </Box>
        <Box>
          <Text style={{ ...styles_c.font_text_14_400 }}>Nghe nhạc với chất lượng cao nhất, không quảng cáo</Text>
        </Box>
        <Box style={{ ...styles_c.row_center, gap: 20 }}>
          <Box style={{ ...styles_c.col_center, width: sizes._150sdp }}>
            <Circle
              style={{
                backgroundColor: colors.white,
                padding: 10,
                width: sizes._40sdp,
                ...styles_c.col_center,
                height: sizes._40sdp
              }}>
              <Octicons name="download" size={sizes._20sdp} color={colors.text_purple} />
            </Circle>
            <Text
              style={{
                ...styles_c.font_text_14_400,
                color: colors.text_gray,
                textAlign: 'center'
              }}>
              Tải nhạc bạn thích về máy
            </Text>
          </Box>
          <Box style={{ ...styles_c.col_center, width: sizes._150sdp }}>
            <Circle
              style={{
                backgroundColor: colors.white,
                padding: 10,
                width: sizes._40sdp,
                height: sizes._40sdp,
                ...styles_c.col_center
              }}>
              <SimpleLineIcons name="loop" size={sizes._20sdp} color={colors.text_purple} />
            </Circle>
            <Text style={{
              ...styles_c.font_text_14_400,
              color: colors.text_gray,
              textAlign: 'center'
            }}>
              Phát nhạc theo thứ tự tùy chỉnh
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableNativeFeedback>
  )
}
export default AccountPackage