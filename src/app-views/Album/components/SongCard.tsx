import sizes from "@assets/styles/sizes"
import { Box, Text } from "native-base"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import styles_c from "@assets/styles/styles_c";
import { Image } from 'expo-image'
import colors from "@assets/colors/global_colors";
import Octicons from '@expo/vector-icons/Octicons';
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import { useEffect, useState } from "react";
import ModalOptionSong from "@app-views/Modal/ModalOptionSong/ModalOptionSong";
import React from "react";
import URL_API from "@app-helper/urlAPI";
import { LOGOAPP } from "@app-uikits/image";
import { useDispatch, useSelector } from "react-redux";
import { getSingerSongData } from "@redux/features/singerSongSlice";

interface SongCardProps {
  item: any
}
const SongCard: React.FC<SongCardProps> = ({ item }) => {
  const { goToSongScreen } = useNavigationComponentApp()
  const [isVisibleModalOptionSong, setIsVisibleModalOptionSong] = useState(false)
  const onCloseModalOptionSong = () => {
    setIsVisibleModalOptionSong(false)
  }
  
  return (
    <Box>
      <TouchableWithoutFeedback onPress={() => goToSongScreen(
        {
          song_id: item?.song_id,
          album_id: item?.album_id,
          album_name: item?.album_name,
          song_name: item?.song_name,
          song_url: item?.song_url
        })}>
        <Box style={{ ...styles_c.row_between }}>
          <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
            <Image
              source={item?.song_image ? { uri: `${URL_API}/image/${item?.song_image}` } : LOGOAPP}
              style={{
                width: sizes._55sdp,
                height: sizes._55sdp,
                borderRadius: 8
              }}
              contentFit="cover"
            />
            <Box width={sizes._200sdp}>
              <Text
                color={colors.black}
                fontSize={sizes._16sdp}
                fontWeight={'bold'}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item?.song_name}
              </Text>
              <Text color={colors.gray_primary}>{item?.singer_name || 'Lê Văn An'}</Text>
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
      </TouchableWithoutFeedback>
      <React.Fragment>
        <ModalOptionSong
          isVisible={isVisibleModalOptionSong}
          closeModal={onCloseModalOptionSong}
          song_id={item?.song_id}
          song_url={item?.song_url}
        />
      </React.Fragment>
    </Box>
  )
}
export default SongCard