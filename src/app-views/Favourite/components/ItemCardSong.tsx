import { Box, Text } from "native-base"
import AntDesign from '@expo/vector-icons/AntDesign';
import sizes from "@assets/styles/sizes";
import colors from "@assets/colors/global_colors";
import { Image } from "expo-image";
import styles_c from "@assets/styles/styles_c";
import { TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import URL_API from "@app-helper/urlAPI";
import { LOGOAPP } from "@app-uikits/image";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import { Fragment, useState } from "react";
import ModalFindAndFilter from "@app-views/Modal/ModalFindAndFilter/ModalFindAndFilter";
import ModalOptionSong from "@app-views/Modal/ModalOptionSong/ModalOptionSong";
interface ItemCardSongProps {
  item?: any
}
const ItemCardSong: React.FC<ItemCardSongProps> = ({ item }) => {
  const { goToSongScreen } = useNavigationComponentApp()
  const [isVisibleModalOptionSong, setIsVisibleModalOptionSong] = useState(false)
  const closeModalModalOptionSong = () => {
    setIsVisibleModalOptionSong(false)
  }
  return (
    <Box>
      <TouchableOpacity onPress={() => goToSongScreen({ song_id: item?.song_id, song_name: item?.song_name })}>
        <Box style={{ ...styles_c.row_between }}>
          <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
            <Image
              source={item?.song_image ? { uri: `${URL_API}image/${item?.song_image}` } : LOGOAPP}
              style={{
                width: sizes._55sdp,
                height: sizes._55sdp,
                borderRadius: 8
              }}
            />
            <Box>
              <Text color={colors.text_black}
                fontSize={sizes._16sdp}
                fontWeight={'bold'}
              >
                {item?.song_name || 'Lvalegennd'}
              </Text>
              <Text color={colors.gray_primary}>Lvalegend</Text>
            </Box>
          </Box>
          <Box style={{ ...styles_c.row_direction_align_center }}>
            <TouchableOpacity style={{ padding: 5 }}>
              <MaterialIcons
                name="favorite"
                size={sizes._20sdp}
                color={colors.purple}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }} onPress={() => setIsVisibleModalOptionSong(true)}>
              <SimpleLineIcons
                name="options-vertical"
                size={sizes._20sdp}
                color={colors.black}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </TouchableOpacity>
      <Fragment>
        <ModalOptionSong
          isVisible={isVisibleModalOptionSong}
          closeModal={closeModalModalOptionSong}
          song_id={item?.song_id}
          song_url={item?.song_url}
        />
      </Fragment>
    </Box>
  )
}
export default ItemCardSong