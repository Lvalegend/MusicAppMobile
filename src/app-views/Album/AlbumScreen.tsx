import { useNavigationServices } from "@app-helper/navigateToScreens";
import { Container, Content, Header } from "@app-layout/Layout";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useRoute } from "@react-navigation/native";
import { Box, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import ActionComponent from "./components/ActionComponent";
import ListCircleHorizontal from "./components/ListCircleHorizontal";
import SongCard from "./components/SongCard";
import TitleContent from "./components/TitleContent";
import { useDispatch, useSelector } from "react-redux";
import URL_API from "@app-helper/urlAPI";
import { LOGOAPP } from "@app-uikits/image";
import { memo, useEffect, useState } from "react";
import { getSongAlbumData } from "@redux/features/songAlbumSlice";
import { getSingerAlbumData } from "@redux/features/singerAlbumSlice";
import { getSingerSongData } from "@redux/features/singerSongSlice";
import { addAlbumScreenId } from "@redux/features/components/albumScreenSlice";

interface AlbumScreenProps { }
const AlbumScreen: React.FC<AlbumScreenProps> = () => {

  const { goToBack } = useNavigationServices()
  const route: any = useRoute()
  const dispatch = useDispatch();
  const { album_id, title, image } = route.params

  const {albumScreenIds} = useSelector((state:any) => state.albumScreenId)
  
  const [checkAlbumId, setCheckAlbumId] = useState(false)
  useEffect(() => {
    if(!albumScreenIds?.includes(album_id)){
      dispatch(addAlbumScreenId(album_id))
      setCheckAlbumId(true)
    }
    else {
      setCheckAlbumId(false)
    }
  },[album_id])

  useEffect(() => {
    if (checkAlbumId) {
      console.log('re-render')
      dispatch(getSongAlbumData({ page: 1, limit: 10, album_id: album_id }))
    }
  }, [checkAlbumId])

  const { paginationSongOrAlbumResponse } = useSelector((state: any) => state.songAlbum);
  console.log('paginationSongOrAlbumResponse', paginationSongOrAlbumResponse)
  const data = paginationSongOrAlbumResponse
    ?.filter((item: any) => item.filterAlbumId === album_id)
    .flatMap((item: any) => item?.data || []);
  const quantity = data ? data?.length : 0
  console.log('dataaaaaaa', JSON.stringify(data))
  console.log('album_id', album_id)


  return (
    <Container>
      <Header>
        <Box style={{ ...styles_c.row_between }}>
          <TouchableOpacity style={{ padding: 15 }} onPress={goToBack}>
            <Ionicons name="arrow-back-sharp" size={sizes._26sdp} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 15 }}>
            <SimpleLineIcons name="options-vertical" size={sizes._24sdp} color={colors.black} />
          </TouchableOpacity>
        </Box>
      </Header>
      <Content>
        <Box style={{ gap: 10 }}>
          <Box marginX={'15px'}>
            <TitleContent
              title={title}
              image={image ? { uri: `${URL_API}/image/${image}` } : LOGOAPP}
              songQuantity={quantity}
            />
          </Box>
          <Box marginX={'15px'} mb={4}>
            <ActionComponent data={data}/>
          </Box>
          <Box padding={'15px'} style={{ gap: 10, borderRadius: 15 }}>
            {data?.map((item: any, index: number) => (
              <Box key={index}>
                <SongCard item={item} />
              </Box>
            ))}
            <TouchableOpacity style={{
              borderRadius: 15,
              padding: 5,
              marginTop: 2,
              borderColor: colors.gray_primary,
              borderWidth: 1,
              ...styles_c.row_center
            }}>
              <Text>XEM THÊM</Text>
            </TouchableOpacity>
          </Box>
          <Box marginX={'15px'} mb={4}>
            {/* <ListCircleHorizontal title="Ca sĩ đóng góp" data={paginationSingerOrAlbumResponse} album_id={album_id} /> */}
          </Box>
        </Box>
      </Content>
    </Container>
  )
}
export default memo(AlbumScreen)