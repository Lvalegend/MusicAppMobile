import GradientComponent from "@app-components/LinearGradientComponent.tsx/GradientProps";
import { useNavigationServices } from "@app-helper/navigateToScreens";
import { Container, Content } from "@app-layout/Layout";
import ModalOptionSong from "@app-views/Modal/ModalOptionSong/ModalOptionSong";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Box, Text } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import ListOptionTab from "./components/ListOptionTab";
import { useRoute } from "@react-navigation/native";

interface SongScreenProps { }
const SongScreen: React.FC<SongScreenProps> = () => {
  const { goToBack } = useNavigationServices()
  const route:any = useRoute()
  const {song_id, album_id, album_name} = route.params
  const [isVisibleModalOptionSong, setIsVisibleModalOptionSong] = useState(false)
  const onCloseModalOptionSong = () => {
    setIsVisibleModalOptionSong(false)
  }
  return (
    <Container>
      <Content>
        <GradientComponent colors={[colors.white_gray, colors.gray_primary]} style={{ width: '100%', height: sizes._screen_height }}>
          <Box flex={1}>
            <Box style={{ ...styles_c.row_between }} marginX={'20px'} marginY={'5px'} h={'5%'}>
              <TouchableOpacity onPress={goToBack}>
                <Entypo name="chevron-thin-down" size={sizes._24sdp} color={colors.white} />
              </TouchableOpacity>
              <Box>
                <Text fontSize={sizes._20sdp} color={colors.white} fontWeight={'600'}>Bài hát</Text>
              </Box>
              <TouchableOpacity onPress={() => setIsVisibleModalOptionSong(true)}>
                <SimpleLineIcons name="options" size={sizes._24sdp} color={colors.white} />
              </TouchableOpacity>
            </Box>
            <Box w={'full'} h={'95%'}>
              <ListOptionTab song_id={song_id} album_id={album_id} album_name={album_name} />
            </Box>
          </Box>
        </GradientComponent>
        <React.Fragment>
          <ModalOptionSong
            isVisible={isVisibleModalOptionSong}
            closeModal={onCloseModalOptionSong}
            showIconComments={true}
          />
        </React.Fragment>
      </Content>
    </Container>
  )
}
export default SongScreen