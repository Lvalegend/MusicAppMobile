import HeaderApp from "@app-components/HeaderApp/HeaderApp"
import { Container, Content } from "@app-layout/Layout"
import { Box } from "native-base"
import { memo, useEffect } from "react"
import SliderBox from "./components/SliderBox"
import SliderGrid from "./components/SliderGrid"
import SliderOneRowBig from "./components/SliderOneRowBig"
import SliderOneRowSmall from "./components/SliderOneRowSmall"
import { useDispatch, useSelector } from "react-redux"
import { getAlbumData } from "@redux/features/albumSlice"
import { getSongAlbumData } from "@redux/features/songAlbumSlice"
import { getSingerSongData } from "@redux/features/singerSongSlice"
import { getSingerAlbumData } from "@redux/features/singerAlbumSlice"

interface MainHomeProps { }
const MainHome: React.FC<MainHomeProps> = () => {
  const dispatch = useDispatch();
  const { loading, error, response } = useSelector((state: any) => state.album);
  const { paginationResponse } = useSelector((state: any) => state.singerSong)
  useEffect(() => {
    dispatch(getAlbumData());
    dispatch(getSongAlbumData());
    dispatch(getSingerSongData());
    dispatch(getSingerSongData({page: 1, limit: 6}));
    dispatch(getSingerAlbumData({page:1, limit: 6}));
  }, [dispatch]);
  
  const dataAlbumHot = response && response?.result?.data ? response?.result?.data.filter((item: any) => item?.status === 'hot') : [];

  const data1 = [
    { id: 1, icon: '', name: 'BXH Nhạc Mới', backgroundColor: ['#9DD0F6', '#23BFEF'] },
    { id: 2, icon: '', name: 'Top 100', backgroundColor: ['#E59CF0', '#FF33FF'] },
    { id: 3, icon: '', name: 'Nhạc Việt', backgroundColor: ['#E88383', '#FF0000'] },
    { id: 4, icon: '', name: 'Nhạc Nước Ngoài', backgroundColor: ['#E883C3', '#FF3399'] },
  ]
  const data2 = [
    { id: 1, image: require('@assets/images/Chúa_tể_an.png'), status: 'ĐANG THỊNH HÀNH', title: 'Trending GEN Z', else: 'Ở đây có nhạc hot tiktok cho các chiến thần đu trend' },
    { id: 2, image: require('@assets/images/Chúa_tể_an.png'), status: 'BEST OF V-POP', title: 'Nhạc Trẻ Ballad Cực Thấm', else: 'Các bài hát nổi bật nhất' },
    { id: 3, image: require('@assets/images/Chúa_tể_an.png'), status: 'MỚI CẬP NHẬT', title: 'Kết Hợp Gây Nghiện', else: 'Sự kết hợp âm nhạc của vô số nghệ sĩ' },
    { id: 4, image: require('@assets/images/Chúa_tể_an.png'), status: 'TUẦN MỚI NHẠC MỚI', title: 'Nhạc Mới Mỗi Tuần', else: 'Nhạc mới cập nhật hàng tuần' },
  ]
              
  const data3 = [
    { id: 1, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Người Tình Mùa Đông Remix', singer: 'Vĩnh Thuyên Kim' },
    { id: 2, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Tình Nhòa Remix', singer: 'Rum, KynBB' },
    { id: 3, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Lên Xe Đi Em Ơi', singer: 'Đinh Kiến Phong' },
    { id: 4, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 5, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 6, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 7, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 8, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 9, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
  ];
  const data4 = [
    { id: 1, image: require('@assets/images/Chúa_tể_an.png'), description: 'Chill Cùng Rap Việt', singer: 'Rum, KynBB, BRay' },
    { id: 2, image: require('@assets/images/Chúa_tể_an.png'), description: 'BEST OF V-POP', singer: 'Rum, KynBB' },
    { id: 3, image: require('@assets/images/Chúa_tể_an.png'), description: 'Mới Cập Nhật', singer: 'Khánh Phương, Quang Vinh, Khánh Phương' },
    { id: 4, image: require('@assets/images/Chúa_tể_an.png'), description: 'Nhạc Trẻ Huyền Thoại', singer: 'Rhymastic, LK, KynBB' },
  ]
  const data5 = [
    { id: 1, image: require('@assets/images/Chúa_tể_an.png'), description: 'Nhạc Cháy', singer: 'Rum, KynBB, BRay' },
    { id: 2, image: require('@assets/images/Chúa_tể_an.png'), description: 'BEST OF K-POP', singer: 'Rum, KynBB' },
    { id: 3, image: require('@assets/images/Chúa_tể_an.png'), description: 'Mới Cập Nhật Hôm Nay', singer: 'Khánh Phương, Quang Vinh, Khánh Phương' },
    { id: 4, image: require('@assets/images/Chúa_tể_an.png'), description: 'Nhạc Bất Hủ Huyền Thoại', singer: 'Rhymastic, LK, KynBB' },
  ]
  const routeData = { title: 'Bạn muốn nghe gì', data: data4 }
  const routeData2 =
  {
    title: 'Chill',
    data1: { title: 'Bạn ổn ko', data: data5 },
    data2: { title: 'Hôm nay bạn muốn nghe gì', data: data4 },
    data3: { title: 'Lofi', data: data4 }
  }

  return (
    <Container>
      <HeaderApp style={{ marginBottom: 5 }} title={'Home'} />
      <Content>
        <Box style={{ marginHorizontal: 20 }}>
          <SliderOneRowBig data={dataAlbumHot} />
          <SliderGrid data={paginationResponse?.data} title={"Gợi ý cho bạn"} />
          <SliderBox title={"Chủ đề & thể loại"} data={data1} routeData={routeData2} />
          <Box marginY={5}>
            <SliderOneRowSmall title={"Có thể bạn muốn nghe"} data={data4} routeData={routeData} />
          </Box>
        </Box>
      </Content>
    </Container>
  )
}
export default memo(MainHome)