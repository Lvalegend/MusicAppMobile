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
  const { filterPaginationAlbumResponse } = useSelector((state: any) => state.album);
  const { paginationSingerSongResponse } = useSelector((state: any) => state.singerSong)
  const { paginationSingerAlbumResponse } = useSelector((state: any) => state.singerAlbum)
  useEffect(() => {
    (async () => {
      await dispatch(getAlbumData({ page: 1, limit: 5, filterColumn: 'status', filterValue: 'hot' }))
      // await dispatch(getSingerSongData({ page: 1, limit: 6 }))
      await dispatch(getSingerAlbumData({ page: 1, limit: 6 }))
    })()
  }, [dispatch])

  const dataAlbumHot = filterPaginationAlbumResponse
    ?.filter((item: any) => item.filterColumn === 'status' && item.filterValue === 'hot')
    .flatMap((item: any) => item.result?.data || []);

  const combinedDataSingerSong = paginationSingerSongResponse ? paginationSingerSongResponse?.flatMap(obj => obj?.data) : []

  const combinedDataSingerAlbum = paginationSingerAlbumResponse ? paginationSingerAlbumResponse?.flatMap(obj => obj?.data) : []

  return (
    <Container>
      <HeaderApp style={{ marginBottom: 5 }} title={'Home'} />
      <Content>
        <Box style={{ marginHorizontal: 20 }}>
          <SliderOneRowBig data={dataAlbumHot} />
          <SliderGrid data={combinedDataSingerSong} title={"Gợi ý cho bạn"} />
          {/* <SliderBox title={"Chủ đề & thể loại"} data={data1} routeData={routeData2} /> */}
          <Box marginY={5}>
            <SliderOneRowSmall title={"Có thể bạn muốn nghe"} data={combinedDataSingerAlbum} />
          </Box>
        </Box>
      </Content>
    </Container>
  )
}
export default memo(MainHome)