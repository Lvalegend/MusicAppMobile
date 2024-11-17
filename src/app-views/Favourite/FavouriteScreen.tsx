import HeaderApp from "@app-components/HeaderApp/HeaderApp"
import { useNavigationComponentApp, useNavigationServices } from "@app-helper/navigateToScreens"
import { Container, Content, Header } from "@app-layout/Layout"
import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from "@react-navigation/native"
import { Box, Text, useDisclose } from "native-base"
import { Platform, ScrollView, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import ItemCardSong from "./components/ItemCardSong"
import { Fragment, useEffect, useState } from "react"
import ModalFindAndFilter from "@app-views/Modal/ModalFindAndFilter/ModalFindAndFilter"
import ModalOptionSong from "@app-views/Modal/ModalOptionSong/ModalOptionSong"
import { useDispatch, useSelector } from "react-redux"
import { getUserSongData } from "@redux/features/userSongSlice"
import ServiceStorage, { KEY_STORAGE } from "@app-services/service-storage"
import { getUserAlbumData } from "@redux/features/userAlbumSlice"
import ItemCardAlbum from "./components/ItemCardAlbum"

interface FavouriteScreenProps { }
const FavouriteScreen: React.FC<FavouriteScreenProps> = () => {
  const { goToBack } = useNavigationServices()

  const route: any = useRoute()
  const { title, type } = route.params
  const [isVisibleModalFindAndFilter, setIsVisibleModalFindAndFilter] = useState(false)
  const closeModalModalFindAndFilter = () => {
    setIsVisibleModalFindAndFilter(false)
  }
  const [token, setToken] = useState<string>()
  const { paginationUserSongResponse } = useSelector((state: any) => state.userSong)
  const { paginationUserAlbumResponse } = useSelector((state: any) => state.userAlbum)
  const combinedDataUserSong = paginationUserSongResponse ? paginationUserSongResponse?.flatMap(obj => obj?.data) : []
  const combinedDataUserAlbum = paginationUserAlbumResponse ? paginationUserAlbumResponse?.flatMap(obj => obj?.result) : []

  console.log('combinedDataUserSong', combinedDataUserSong)
  console.log('combinedDataUserAlbum', combinedDataUserAlbum)

  useEffect(() => {
    (async () => {
      const token = await ServiceStorage.getString(KEY_STORAGE.USER_TOKEN)
      setToken(token)
    })()
  }, [])
  const dispatch = useDispatch()
  useEffect(() => {
    if (type === 'song_favourite' && token) {
      dispatch(getUserSongData({ page: 1, limit: 10, token: token }))
      console.log('re-render')
    }
    else if (type === 'album_favourite' && token) {
      dispatch(getUserAlbumData({ page: 1, limit: 10, token: token }))
      console.log('re-render')
    }
  }, [type, token])



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
            <TouchableOpacity style={{ padding: 5 }}>
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
            {type === 'song_favourite' &&
              <Text color={colors.text_gray}>
                {combinedDataUserSong?.length || '0'} bài hát đã yêu thích
              </Text>
            }
            {type === 'album_favourite' &&
              <Text color={colors.text_gray}>
                {combinedDataUserAlbum?.length || '0'} bài hát đã yêu thích
              </Text>
            }
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
          <ScrollView style={{ marginHorizontal: 12 }}>
            <Box>
              {type === 'song_favourite' &&
                <Box>
                  {combinedDataUserSong?.map((item: any, index: number) => (
                    <Box key={index} mb={'15px'}>
                      <ItemCardSong item={item} />
                    </Box>
                  ))}
                </Box>}
              {type === 'album_favourite' &&
                <Box>
                  {combinedDataUserAlbum?.map((item: any, index: number) => (
                    <Box key={index} mb={'15px'}>
                      <ItemCardAlbum item={item} />
                    </Box>
                  ))}
                </Box>}
            </Box>
          </ScrollView>
        </Box>
      </Content>
      <Fragment>
        <ModalFindAndFilter
          isVisible={isVisibleModalFindAndFilter}
          closeModal={closeModalModalFindAndFilter}
        />
      </Fragment>
    </Container>
  )
}
export default FavouriteScreen