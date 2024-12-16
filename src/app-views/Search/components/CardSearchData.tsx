import { LOGOAPP } from "@app-uikits/image"
import ModalOptionSong from "@app-views/Modal/ModalOptionSong/ModalOptionSong"
import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { Image } from "expo-image"
import { Box, Text } from "native-base"
import { Fragment, useState } from "react"
import { TouchableOpacity } from "react-native"
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useNavigationComponentApp } from "@app-helper/navigateToScreens"
import URL_API from "@app-helper/urlAPI"

interface CardSearchDataProps {
  item?: any
}
const CardSearchData: React.FC<CardSearchDataProps> = ({ item }) => {
  const { goToSongScreen } = useNavigationComponentApp()
  const [isVisibleModalOptionSong, setIsVisibleModalOptionSong] = useState(false)
  const onCloseModalOptionSong = () => {
    setIsVisibleModalOptionSong(false)
  }
  const singerNames = item?.singers.map(singer => singer?.singer_name).join(", ");
  return (
    <Box>
      <TouchableOpacity onPress={() => goToSongScreen({song_id: item?.song_id, song_name: item?.song_name})}>
        <Box style={{ ...styles_c.row_between }}>
          <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
            <Image
              source={item?.song_image ? { uri: `${URL_API}image/${item?.song_image}` } : LOGOAPP}
              style={{ width: sizes._50sdp, height: sizes._50sdp, borderRadius: 8 }}
            />
            <Box>
              <Box maxW={sizes._200sdp}>
                <Text
                  style={{ ...styles_c.font_text_14_600 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item?.song_name}
                </Text>
              </Box>
              <Box maxW={sizes._200sdp}>
                <Text
                  style={{ ...styles_c.font_text_14_400, color: colors.text_gray }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {singerNames || 'Lê Văn An'}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
            <TouchableOpacity onPress={() => setIsVisibleModalOptionSong(true)}>
              <SimpleLineIcons
                name="options-vertical"
                size={sizes._20sdp}
                color={colors.gray_primary}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </TouchableOpacity>
      <Fragment>
        <ModalOptionSong
          isVisible={isVisibleModalOptionSong}
          closeModal={onCloseModalOptionSong}
          song_id={item?.song_id}
          song_url={item?.song_url}
        />
      </Fragment>
    </Box>
  )
}
export default CardSearchData