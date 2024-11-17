import HeaderCustom from "@app-components/HeaderCustom/HeaderCustom"
import { Header, Container, Content, Footer } from "@app-layout/Layout"
import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { Box, Circle, Square, Text } from "native-base"
import React from "react"
import Octicons from '@expo/vector-icons/Octicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

interface ViewAccountPackageProps { }
const ViewAccountPackage: React.FC<ViewAccountPackageProps> = () => {
  return (
    <Container>
      <HeaderCustom title={'Nâng cấp tài khoản của bạn'}>

      </HeaderCustom>
      <Content>
        <Box
          style={{
            backgroundColor: colors.white_purple,
            padding: 10,
            borderRadius: 10,
            gap: 10,
            borderWidth: 1,
            borderColor: colors.purple
          }}>
          <Box style={{ gap: 5, ...styles_c.row_direction_align_center }}>
            <Text style={{ ...styles_c.font_text_18_600, color: colors.text_purple }}>Tài khoản</Text>
            <Square backgroundColor={colors.purple} paddingX={'10px'} borderRadius={'8px'}>
              <Text style={{ ...styles_c.font_text_14_600, color: colors.text_white }}>PLUS</Text>
            </Square>
          </Box>
          <Box>
            <Text style={{ ...styles_c.font_text_14_400 }}>Nghe nhạc với chất lượng cao nhất, không quảng cáo</Text>
          </Box>
          <Box>
            <Text style={{ ...styles_c.font_text_14_600 }}>19,000đ</Text>
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
      </Content>
      <Footer></Footer>
    </Container>
  )
}
export default ViewAccountPackage