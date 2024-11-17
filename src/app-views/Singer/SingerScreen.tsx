import HeaderCustom from "@app-components/HeaderCustom/HeaderCustom"
import { Container, Content } from "@app-layout/Layout"
import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { ImageBackground } from "expo-image"
import { Box, Text } from "native-base"
import { TouchableOpacity, StyleSheet } from "react-native"
import ListSongCardVertical from "./components/ListSongCardVertical"
import SliderOneRowSmall from "@app-views/Home/components/SliderOneRowSmall"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getSingerAlbumData } from "@redux/features/singerAlbumSlice"
import { useRoute } from "@react-navigation/native"
import URL_API from "@app-helper/urlAPI"
import { LOGOAPP } from "@app-uikits/image"

interface SingerScreenProps {
}
const SingerScreen: React.FC<SingerScreenProps> = () => {
  const route:any = useRoute()
  const {singer_id, singer_name, date_of_birth, singer_avatar, description, singer_entity_id , total_favourite } = route.params
  const dispatch = useDispatch()
  useEffect(() => {
    if (singer_id) {
      dispatch(getSingerAlbumData({ page: 1, limit: 6, singer_id: singer_id }))
    }
  }, [singer_id])
  const {paginationSingerOrAlbumResponse} = useSelector((state:any)=> state.singerAlbum)
  console.log('paginationSingerOrAlbumResponse', paginationSingerOrAlbumResponse)
  const data = paginationSingerOrAlbumResponse
    ?.filter((item: any) => item.filterSingerId === singer_id)
    .flatMap((item: any) => item?.data || []);
    console.log('dataasenger', data)
  return (
    <Container>
      <HeaderCustom title={'Thông tin ca sĩ'} />
      <Content>
        <Box>
          <Box w={'full'}>
            <ImageBackground
              source={singer_avatar ? { uri: `${URL_API}/image/${singer_avatar}` } : LOGOAPP}
              style={{ width: '100%', height: sizes._300sdp }}
            >
              <Box style={{ justifyContent: 'flex-end', flex: 1, padding: 10, gap: 10 }}>
                <Box>
                  <Text style={{ ...styles_c.font_text_30_400, color: colors.white }}>{singer_name || ''}</Text>
                </Box>
                <Box>
                  <Text style={{ ...styles_c.font_text_14_400, color: colors.white_gray }}>{total_favourite || 0} theo dõi</Text>
                </Box>
                <Box style={{ ...styles_c.row_between, gap: 10 }}>
                  <TouchableOpacity style={[styles.buttonImageStyle, { backgroundColor: colors.black }]}>
                    <Box>
                      <Text style={{ ...styles_c.font_text_16_400, color: colors.white }}>THEO DÕI</Text>
                    </Box>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.buttonImageStyle, { backgroundColor: colors.purple }]}>
                    <Box>
                      <Text style={{ ...styles_c.font_text_16_400, color: colors.white }}>PHÁT NHẠC</Text>
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Box>
            </ImageBackground>
          </Box>
          <Box>
            <ListSongCardVertical title="Danh sách nhạc của ca sĩ" singer_id={singer_id} />
          </Box>
          <Box px={3}>
            <SliderOneRowSmall title="Album cá nhân" data={data} sizeTitle={sizes._18sdp} />
          </Box>
          <Box p={3}>
            <Box>
              <Box>
                <Text style={{ ...styles_c.font_text_18_600 }}>Thông tin</Text>
              </Box>
              <Box w={'full'} marginY={2}>
                <Text style={styles.textStyle}>{description || ''}</Text>
              </Box>
            </Box>
            <Box style={{ gap: 8 }}>
              <Box style={styles.boxInfoStyle}>
                <Box width={'30%'}>
                  <Text>
                    Tên thật
                  </Text>
                </Box>
                <Box w={'70%'}>
                  <Text style={styles.textStyle}>
                    {singer_name}
                  </Text>
                </Box>
              </Box>
              <Box style={styles.boxInfoStyle}>
                <Box width={'30%'}>
                  <Text>
                    Ngày sinh
                  </Text>
                </Box>
                <Box w={'70%'}>
                  <Text style={styles.textStyle}>
                    {date_of_birth}
                  </Text>
                </Box>
              </Box>
              <Box style={styles.boxInfoStyle}>
                <Box width={'30%'}>
                  <Text>
                    Quốc gia
                  </Text>
                </Box>
                <Box w={'70%'}>
                  <Text style={styles.textStyle}>
                    Việt Nam
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Content>
    </Container>
  )
}
const styles = StyleSheet.create({
  buttonImageStyle: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 99999,
    flex: 1,
    ...styles_c.col_center
  },
  boxInfoStyle: {
    ...styles_c.row_direction_align_center,
    width: '100%',
    gap: 20
  },
  textStyle: {
    ...styles_c.font_text_16_400,
    flexWrap: 'wrap',
    color: colors.text_gray
  }
})
export default SingerScreen