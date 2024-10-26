import ModalCustom from "@app-components/CustomModal/ModalCustom"
import { Box, Text } from "native-base"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import sizes from "@assets/styles/sizes";
import colors from "@assets/colors/global_colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import styles_c from "@assets/styles/styles_c";
import { TouchableOpacity, StyleSheet } from "react-native";

interface ModalOptionSongProps {
  isVisible: boolean
  closeModal: any,
  showIconComments?: boolean
}
const ModalOptionSong: React.FC<ModalOptionSongProps> = ({
  isVisible,
  closeModal,
  showIconComments = false
}) => {
  return (
    <ModalCustom
      title={'Lựa chọn'}
      isVisible={isVisible}
      isScroll={true}
      onClose={closeModal}>
      <Box my={'5px'}>
        <TouchableOpacity style={styles.buttonStyle}>
          <MaterialCommunityIcons name="download-circle-outline" size={sizes._28sdp} color={colors.black} />
          <Text fontSize={sizes._16sdp}>Tải về</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <MaterialIcons name="favorite-outline" size={sizes._28sdp} color={colors.black} />
          <Text fontSize={sizes._16sdp}>Yêu thích</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <Ionicons name="albums" size={sizes._28sdp} color={colors.black} />
          <Text fontSize={sizes._16sdp}>Thêm vào album</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <MaterialCommunityIcons name="account-music-outline" size={sizes._28sdp} color={colors.black} />
          <Text fontSize={sizes._16sdp}>Xem ca sĩ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <MaterialIcons name="playlist-add" size={sizes._28sdp} color={colors.black} />
          <Text fontSize={sizes._16sdp}>Thêm vào playlist</Text>
        </TouchableOpacity>
        {showIconComments &&
          <TouchableOpacity style={styles.buttonStyle}>
            <AntDesign name="message1" size={sizes._28sdp} color={colors.black} />
            <Text fontSize={sizes._16sdp}>Bình luận</Text>
          </TouchableOpacity>
        }
      </Box>
    </ModalCustom>
  )
}
const styles = StyleSheet.create({
  buttonStyle: {
    ...styles_c.row_direction_align_center,
    gap: 10,
    padding: 10
  }
})
export default ModalOptionSong