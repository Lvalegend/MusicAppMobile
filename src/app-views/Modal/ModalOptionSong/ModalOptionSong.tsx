import ModalCustom from "@app-components/CustomModal/ModalCustom"
import { Box, Text } from "native-base"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import sizes from "@assets/styles/sizes";
import colors from "@assets/colors/global_colors";
import AntDesign from "expo-vector-icons/build/AntDesign";
import styles_c from "@assets/styles/styles_c";
import { TouchableOpacity } from "react-native";

interface ModalOptionSongProps {
  isVisible: boolean
  closeModal: any
}
const ModalOptionSong: React.FC<ModalOptionSongProps> = ({
  isVisible,
  closeModal
}) => {
  return (
    <ModalCustom
    title={'Lựa chọn'}
      isVisible={isVisible}
      isScroll={true}
      onClose={closeModal}>
      <Box my={'5px'}>
        <TouchableOpacity style={{ ...styles_c.row_direction_align_center, gap: 10, padding:10 }}>
          <MaterialCommunityIcons name="download-circle-outline" size={sizes._28sdp} color={colors.black} />
          <Text fontSize={sizes._16sdp}>Tải về</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles_c.row_direction_align_center, gap: 10, padding:10 }}>
          <MaterialIcons name="favorite-outline" size={sizes._28sdp} color={colors.black} />
          <Text fontSize={sizes._16sdp}>Yêu thích</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles_c.row_direction_align_center, gap: 10, padding:10 }}>
          <Ionicons name="albums" size={sizes._28sdp} color={colors.black} />
          <Text fontSize={sizes._16sdp}>Thêm vào album</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles_c.row_direction_align_center, gap: 10, padding:10 }}>
          <MaterialCommunityIcons name="account-music-outline" size={sizes._28sdp} color={colors.black} />
          <Text fontSize={sizes._16sdp}>Xem ca sĩ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles_c.row_direction_align_center, gap: 10, padding:10 }}>
          <MaterialIcons name="playlist-add" size={sizes._28sdp} color={colors.black} />
          <Text fontSize={sizes._16sdp}>Thêm vào playlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles_c.row_direction_align_center, gap: 10, padding:10 }}>
          <AntDesign name="message1" size={sizes._28sdp} color={colors.black} />
          <Text fontSize={sizes._16sdp}>Bình luận</Text>
        </TouchableOpacity>
      </Box>
    </ModalCustom>
  )
}
export default ModalOptionSong