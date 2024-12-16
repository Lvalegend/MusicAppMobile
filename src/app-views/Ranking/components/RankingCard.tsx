import sizes from "@assets/styles/sizes"
import { Box, Text } from "native-base"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import styles_c from "@assets/styles/styles_c";
import { Image } from 'expo-image'
import colors from "@assets/colors/global_colors";
import Octicons from '@expo/vector-icons/Octicons';
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import { useState } from "react";
import ModalOptionSong from "@app-views/Modal/ModalOptionSong/ModalOptionSong";
import React from "react";
import URL_API from "@app-helper/urlAPI";
import { LOGOAPP } from "@app-uikits/image";

interface RankingCardProps {
  item: any
  index: number
}
const RankingCard: React.FC<RankingCardProps> = ({ item, index }) => {
  const { goToSongScreen } = useNavigationComponentApp()
  const [isVisibleModalOptionSong, setIsVisibleModalOptionSong] = useState(false)
  const onCloseModalOptionSong = () => {
    setIsVisibleModalOptionSong(false)
  }
  return (
    <Box>
      <TouchableWithoutFeedback onPress={() => goToSongScreen({ song_id: item?.song_id })}>
        <Box style={{ ...styles_c.row_between }}>
          <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
            <Image
              source={item?.song_image ? { uri: `${URL_API}image/${item?.song_image}` } : LOGOAPP}
              style={{
                width: sizes._55sdp,
                height: sizes._55sdp,
                borderRadius: 8
              }}
              contentFit="cover"
            />
            <Box alignItems={'center'}>
              <Text color={colors.white}>{index + 1}</Text>
              <Octicons name="dot-fill" size={sizes._12sdp} color={colors.white} />
            </Box>
            <Box>
              <Box maxWidth={sizes._250sdp}>
                <Text
                  color={'white'}
                  fontSize={sizes._16sdp}
                  fontWeight={'bold'}
                  ellipsizeMode="tail"
                  numberOfLines={2}
                >
                  {item?.song_name}
                </Text>
              </Box>
              <Text color={colors.white_gray}>{item?.singer_name}</Text>
            </Box>
          </Box>
          <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
            <TouchableOpacity onPress={() => setIsVisibleModalOptionSong(true)}>
              <SimpleLineIcons
                name="options-vertical"
                size={sizes._20sdp}
                color={colors.white}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
      <React.Fragment>
        <ModalOptionSong
          isVisible={isVisibleModalOptionSong}
          closeModal={onCloseModalOptionSong}
        />
      </React.Fragment>
    </Box>
  )
}
export default RankingCard