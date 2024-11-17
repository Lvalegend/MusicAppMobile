import ModalCustom from "@app-components/CustomModal/ModalCustom"
import { Box, Text } from "native-base"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import sizes from "@assets/styles/sizes";
import colors from "@assets/colors/global_colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import styles_c from "@assets/styles/styles_c";
import { TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { PlaylistView } from "@app-views/Library/components/ViewTabBarOption";

interface ModalSelectPlaylistProps {
  isVisible: boolean
  closeModal: any,
  song_id?: number
}
const ModalSelectPlaylist: React.FC<ModalSelectPlaylistProps> = ({
  isVisible,
  closeModal,
  song_id
}) => {
  return (
    <ModalCustom
      title={'Lựa chọn playlist'}
      isVisible={isVisible}
      isScroll={true}
      onClose={closeModal}>
      <ScrollView style={{ height: sizes._screen_height}}>
        <Box my={'5px'} mx={'15px'}>
          <PlaylistView type={'select'} song_id={song_id} closeModal={closeModal}/>
        </Box>
      </ScrollView>
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
export default ModalSelectPlaylist