import HeaderApp from "@app-components/HeaderApp/HeaderApp"
import { useNavigationServices } from "@app-helper/navigateToScreens"
import { Container, Content, Header } from "@app-layout/Layout"
import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from "@react-navigation/native"
import { Box, Text } from "native-base"
import { Platform, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import ListVertical from "./components/ListVertical"
import { Fragment, useState } from "react"
import ModalFindAndFilter from "@app-views/Modal/ModalFindAndFilter/ModalFindAndFilter"
import ModalOptionSong from "@app-views/Modal/ModalOptionSong/ModalOptionSong"

interface FavouriteScreenProps { }
const FavouriteScreen: React.FC<FavouriteScreenProps> = () => {
  const { goToBack } = useNavigationServices()
  const route: any = useRoute()
  const { title } = route.params
  const [isVisibleModalFindAndFilter, setIsVisibleModalFindAndFilter] = useState(false)
  const closeModalModalFindAndFilter = () => {
    setIsVisibleModalFindAndFilter(false)
  }
  const [isVisibleModalOptionSong, setIsVisibleModalOptionSong] = useState(false)
  const closeModalModalOptionSong = () => {
    setIsVisibleModalOptionSong(false)
  }

  return (
    <Container>
      <Header>
        <Box style={{ ...styles_c.row_between, marginHorizontal: 5 }}>
          <TouchableOpacity onPress={goToBack} style={{ padding: 10 }}>
            <Ionicons name="arrow-back-outline" size={sizes._30sdp} color={colors.black} />
          </TouchableOpacity>
          <Box style={{ ...styles_c.row_direction_align_center, gap: 15 }}>
            <TouchableOpacity style={{ padding: 5 }}>
              <MaterialCommunityIcons name="download-circle-outline" size={sizes._30sdp} color={colors.black} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }}>
              <AntDesign name="search1" size={sizes._27sdp} color={colors.black} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }} onPress={() => setIsVisibleModalOptionSong(true)}>
              <SimpleLineIcons name="options-vertical" size={sizes._20sdp} color={colors.black} />
            </TouchableOpacity>
          </Box>
        </Box>
      </Header>
      <Content>
        <Box style={{ ...styles_c.col_center, marginTop: 10, marginBottom: 15 }}>
          <Box>
            <Text fontSize={sizes._28sdp} fontWeight={'bold'}>{title}</Text>
          </Box>
          <Box mt={2} mb={8}>
            <Text color={colors.text_gray}>
              2 bài hát đã yêu thích
            </Text>
          </Box>
          <TouchableOpacity
            style={{
              backgroundColor: colors.purple,
              paddingVertical: 10,
              paddingHorizontal: 30,
              ...styles_c.col_center,
              borderRadius: 50
            }}>
            <Text style={{ ...styles_c.font_text_16_600 }} color={colors.text_white}>PHÁT NGẪU NHIÊN</Text>
          </TouchableOpacity>
        </Box>
        <Box>
          <TouchableOpacity
            style={{ padding: 12 }}
            onPress={() => setIsVisibleModalFindAndFilter(true)}>
            <Box style={{ ...styles_c.row_direction_align_center, gap: 5 }}>
              <Text color={colors.text_gray}>Mới nhất</Text>
              <AntDesign name="caretdown" size={sizes._12sdp} color={colors.gray_primary} />
            </Box>
          </TouchableOpacity>
          <Box style={{ marginHorizontal: 12 }}>
            <ListVertical />
          </Box>
        </Box>
        <Fragment>
          <ModalFindAndFilter
            isVisible={isVisibleModalFindAndFilter}
            closeModal={closeModalModalFindAndFilter}
          />
        </Fragment>
        <Fragment>
          <ModalOptionSong
            isVisible={isVisibleModalOptionSong}
            closeModal={closeModalModalOptionSong}
          />
        </Fragment>
      </Content>

    </Container>
  )
}
export default FavouriteScreen