import { Box, Text } from "native-base"
import React, { useState } from "react"
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import styles_c from "@assets/styles/styles_c";
import { Dimensions, TouchableOpacity } from "react-native";
import { useNavigationServices } from "@app-helper/navigateToScreens";
import ListOptionTab from "./components/ListOptionTab";
import CircleImageRotating from "./components/CircleImageRotating";
import { Container, Content } from "@app-layout/Layout";
import GradientComponent from "@app-components/LinearGradientComponent.tsx/GradientProps";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import ModalOptionSong from "@app-views/Modal/ModalOptionSong/ModalOptionSong";

interface SongScreenProps { }
const SongScreen: React.FC<SongScreenProps> = () => {
  const { goToBack } = useNavigationServices()
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
              <ListOptionTab />
            </Box>
          </Box>
        </GradientComponent>
        <React.Fragment>
          <ModalOptionSong
            isVisible={isVisibleModalOptionSong}
            closeModal={onCloseModalOptionSong}
          />
        </React.Fragment>
      </Content>
    </Container>
  )
}
export default SongScreen