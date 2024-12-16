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
interface ItemCardAlbumProps {
  item?: any
}
const ItemCardAlbum: React.FC<ItemCardAlbumProps> = ({ item }) => {
  const { goToAlbumScreen } = useNavigationComponentApp()

  return (
    <Box>
      <TouchableOpacity onPress={() =>
        goToAlbumScreen({
          album_id: item?.album_id,
          title: item?.album_name,
          image: item?.album_image
        })}>
        <Box style={{ ...styles_c.row_between }}>
          <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
            <Image
              source={item?.album_image ? { uri: `${URL_API}image/${item?.album_image}` } : LOGOAPP}
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
                {item?.album_name || 'Lvalegennd'}
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
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
export default ItemCardAlbum