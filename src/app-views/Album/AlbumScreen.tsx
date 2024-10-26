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
import { useSelector } from "react-redux";
import URL_API from "@app-helper/urlAPI";
import { LOGOAPP } from "@app-uikits/image";

interface AlbumScreenProps { }
const AlbumScreen: React.FC<AlbumScreenProps> = () => {
  const data1 = [
    { id: 1, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Người Tình Mùa Đông Remix', singer: 'Vĩnh Thuyên Kim' },
    { id: 2, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Tình Nhòa Remix', singer: 'Rum, KynBB' },
    { id: 3, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Lên Xe Đi Em Ơi', singer: 'Đinh Kiến Phong' },
    { id: 4, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 5, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 6, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 7, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 8, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 9, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Hoa Bằng Lăng Remix', singer: 'Rum' },
  ];
  const data2 = [
    { id: 1, image: require('@assets/images/Chúa_tể_an.png'), singer: 'Phạm Việt Thắng', likes: 18000 },
    { id: 2, image: require('@assets/images/Chúa_tể_an.png'), singer: 'Masew', likes: 217000 },
    { id: 3, image: require('@assets/images/Chúa_tể_an.png'), singer: 'Đình Bình', likes: 118500 },
    { id: 4, image: require('@assets/images/Chúa_tể_an.png'), singer: 'Đinh Kiến Phong', likes: 56000 },
    { id: 5, image: require('@assets/images/Chúa_tể_an.png'), singer: 'Rum', likes: 180001 },
    { id: 6, image: require('@assets/images/Chúa_tể_an.png'), singer: 'Sơn Tùng', likes: 1850708 },
  ]
  const { goToBack } = useNavigationServices()
  const route: any = useRoute()
  const logo = '@assets/images/logoLvalegend.png'
  const { album_id, title, image, singer_id } = route.params
  console.log('album_id: ' + album_id)
  const { loading, error, response } = useSelector((state: any) => state.songAlbum);
  const data = response ? response?.data.filter((item: any) => item?.album_id == album_id) : null
  const quantity = data ? data?.length : 0
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
            <ActionComponent />
          </Box>
          <Box padding={'15px'} style={{ gap: 10, borderRadius: 15 }}>
            {data?.map((item: any, index: number) => (
              <Box key={index}>
                <SongCard item={item}/>
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
            <ListCircleHorizontal title="Ca sĩ đóng góp" data={data2} album_id={album_id}/>
          </Box>
        </Box>
      </Content>
    </Container>
  )
}
export default AlbumScreen