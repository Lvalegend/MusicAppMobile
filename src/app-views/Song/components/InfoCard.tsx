import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import { Image } from "expo-image"
import { Box, Text } from "native-base"
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles_c from "@assets/styles/styles_c";

interface InfoCardProps { }
const InfoCard: React.FC<InfoCardProps> = () => {
  return (
    <Box bgColor={colors.white} p={'10px'} borderRadius={'8px'} w={'full'}>
      <Box
        style={{
          ...styles_c.row_direction_align_center,
          gap: 10,
          borderBottomWidth: 1,
          paddingBottom: 10
        }}>
        <Box>
          <Image
            source={require('@assets/images/Chúa_tể_an.png')}
            style={{ width: sizes._65sdp, height: sizes._65sdp, borderRadius: 8 }}
          />
        </Box>
        <Box>
          <Text fontWeight={'700'}>Lâu Đài Tình Ái</Text>
          <Text
            color={colors.gray_primary}
          >
            Cẩm Ly, Quốc Đại
          </Text>
          <Box
            style={{ ...styles_c.row_direction_align_center, gap: 10 }}
          >
            <Box
              style={{ ...styles_c.row_direction_align_center, gap: 5 }}
            >
              <AntDesign
                name="hearto"
                size={sizes._15sdp}
                color={colors.gray_primary}
              />
              <Text color={colors.gray_primary}>940,0K</Text>
            </Box>
            <Box
              style={{
                ...styles_c.row_direction_align_center, gap: 5
              }}
            >
              <MaterialIcons
                name="headphones"
                size={sizes._15sdp}
                color={colors.gray_primary}
              />
              <Text color={colors.gray_primary}>31M</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box pt={'10px'}>
        <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
          <Box w={'25%'}>
            <Text color={colors.gray_primary}>Album</Text>
          </Box>
          <Box w={'75%'}>
            <Text>Lâu Đài Tình Ái</Text>
          </Box>
        </Box>
        <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
          <Box w={'25%'}>
            <Text color={colors.gray_primary}>Thể loại</Text>
          </Box>
          <Box w={'75%'}>
            <Text>Nhạc Trữ Tình, Việt Nam</Text>
          </Box>
        </Box>
        <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
          <Box w={'25%'}>
            <Text color={colors.gray_primary}>Cung cấp</Text>
          </Box>
          <Box w={'75%'}>
            <Text>Lvalegend</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default InfoCard