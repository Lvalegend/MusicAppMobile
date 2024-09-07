import sizes from "@assets/styles/sizes"
import { Box, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import styles_c from "@assets/styles/styles_c";
import { Image } from 'expo-image'
import colors from "@assets/colors/global_colors";

interface VerticalListProps {
  title: string
}
const VerticalList: React.FC<VerticalListProps> = ({ title }) => {
  return (
    <Box>
      <Box marginY={'10px'}>
        <Text
          color={'white'}
          fontSize={sizes._22sdp}
          fontWeight={'bold'}
        >
          {title}
        </Text>
      </Box>
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
            <Text color={'white'}
              fontSize={sizes._16sdp}
              fontWeight={'bold'}
            >
              Anh Thôi Nhân Nhượng
            </Text>
            <Text color={colors.gray_primary}>Kiều Chi</Text>
          </Box>
        </Box>
        <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
          <TouchableOpacity>
            <Entypo
              name="add-to-list"
              size={sizes._20sdp}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <SimpleLineIcons
              name="options-vertical"
              size={sizes._20sdp}
              color="black"
            />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  )
}
export default VerticalList