import { Box, Text } from "native-base";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from "expo-image";
import styles_c from "@assets/styles/styles_c";
import sizes from "@assets/styles/sizes";
import colors from "@assets/colors/global_colors";
import { TouchableOpacity } from "react-native";
import { Fragment, useState } from "react";
import ModalAddPlaylist from "@app-views/Modal/ModalAddPlaylist/ModalAddPlaylist";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";

interface PlaylistViewProps { }

export const PlaylistView: React.FC<PlaylistViewProps> = () => {
  const [isVisibleModalAddPlaylist, setIsVisibleModalAddPlaylist] = useState(false)
  const closeModalAddPlaylist = () => {
    setIsVisibleModalAddPlaylist(false)
  }
  return (
    <Box style={{ gap: 20, marginTop: 15 }}>
      <TouchableOpacity style={{ ...styles_c.row_direction_align_center, gap: 15 }} onPress={() => setIsVisibleModalAddPlaylist(true)}>
        <Box
          style={{
            width: sizes._70sdp,
            height: sizes._70sdp,
            ...styles_c.col_center,
            borderRadius: 7,
          }}
          bgColor={colors.white_gray}
        >
          <AntDesign name="plus" size={24} color={colors.black} />
        </Box>
        <Text>Thêm playlist</Text>
      </TouchableOpacity>
      <Box style={{ ...styles_c.row_direction_align_center, gap: 15 }}>
        <Box style={{
          width: sizes._70sdp,
          height: sizes._70sdp,
          borderRadius: 7,
          overflow: 'hidden'
        }}>
          <Image
            source={require('@assets/images/Chúa_tể_an.png')}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 7
            }}
          />
        </Box>
        <Box style={{ gap: 5 }}>
          <Text fontWeight={'600'} fontSize={sizes._18sdp}>Playlist 1</Text>
          <Text color={colors.text_gray}>Lê Văn An</Text>
        </Box>
      </Box>
      <Fragment>
        <ModalAddPlaylist isVisible={isVisibleModalAddPlaylist} onClose={closeModalAddPlaylist} />
      </Fragment>
    </Box>
  );
}


interface AlbumListViewProps { }

export const AlbumListView: React.FC<AlbumListViewProps> = () => {
  return (
    <Box style={{ gap: 20, marginTop: 15 }}>
      <Box style={{ ...styles_c.row_direction_align_center, gap: 15 }}>
        <Box style={{
          width: sizes._70sdp,
          height: sizes._70sdp,
          borderRadius: 7,
          overflow: 'hidden'
        }}>
          <Image
            source={require('@assets/images/Chúa_tể_an.png')}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 7
            }}
          />
        </Box>
        <Box style={{ gap: 5 }}>
          <Text fontWeight={'600'} fontSize={sizes._18sdp}>Album 1</Text>
          <Text color={colors.text_gray}>Lê Văn An</Text>
        </Box>
      </Box>
    </Box>
  );
}

interface SingerListViewProps { }

export const SingerListView: React.FC<SingerListViewProps> = () => {
  const {goToSingerScreen} = useNavigationComponentApp()
  return (
    <Box>
      <TouchableOpacity style={{ gap: 20, marginTop: 15 }} onPress={() => goToSingerScreen()}>
        <Box style={{ ...styles_c.row_direction_align_center, gap: 15 }}>
          <Box style={{
            width: sizes._70sdp,
            height: sizes._70sdp,
            borderRadius: 50,
            overflow: 'hidden'
          }}>
            <Image
              source={require('@assets/images/Chúa_tể_an.png')}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 7
              }}
            />
          </Box>
          <Box>
            <Text fontWeight={'600'} fontSize={sizes._18sdp}>Lê Văn An</Text>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}


