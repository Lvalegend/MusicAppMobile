import ModalCustom from "@app-components/CustomModal/ModalCustom";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Box, Text } from "native-base";
import { Fragment, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ModalSelectPlaylist from "../ModalActionPlaylist/ModalSelectPlaylist";
import DownloadMusic from "@app-views/Song/components/DownloadMusic";

interface ModalOptionSongProps {
  isVisible: boolean
  closeModal: any,
  song_id? : number,
  song_url? : string
  showIconComments?: boolean
}
const ModalOptionSong: React.FC<ModalOptionSongProps> = ({
  isVisible,
  closeModal,
  song_id,
  song_url,
  showIconComments = false
}) => {
  const [isVisibleModalSelectPlaylist, setIsVisibleModalSelectPlaylist] = useState(false)
  const closeModalSelectPlaylist = () => {
    setIsVisibleModalSelectPlaylist(false)
  }
  return (
    <Box>
      <ModalCustom
        title={'Lựa chọn'}
        isVisible={isVisible}
        isScroll={true}
        onClose={closeModal}>
        <Box my={'5px'}>
          <Fragment>
             <DownloadMusic song_url={song_url} type={"in_option"} />
          </Fragment>
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
          <TouchableOpacity style={styles.buttonStyle} onPress={() => { closeModal(), setIsVisibleModalSelectPlaylist(true) }}>
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
      <ModalSelectPlaylist
        isVisible={isVisibleModalSelectPlaylist}
        closeModal={closeModalSelectPlaylist}
        song_id={song_id}
      />
    </Box>
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