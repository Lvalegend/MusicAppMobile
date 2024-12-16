import HeaderApp from "@app-components/HeaderApp/HeaderApp"
import { Content, Container } from "@app-layout/Layout"
import { memo, useEffect } from "react"
import { Box } from "native-base"
import sizes from "@assets/styles/sizes"
import TabBarOption from "./components/TabBarOption"
import { PlaylistView } from "./components/ViewTabBarOption"
import SliderHorizontal from "./components/SliderHorizontal"
import SliderOption from "./components/SliderOption"
import { ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getListPlaylistOfUser } from "@redux/features/playlistSlice"

interface MainLibraryProps { }
const MainLibrary: React.FC<MainLibraryProps> = () => {
  const dispatch = useDispatch()
  const {
    paginationPlaylistData,
    loading,
    error,
    hasFetchingPaginationPlaylistData,
    currentPagePaginationPlaylistData,
    hasMorePaginationPlaylistData
  } = useSelector((state: any) => state.playlist)
  const { token } = useSelector((state: any) => state.authToken)
  useEffect(() => {
    if (!hasFetchingPaginationPlaylistData && token) {
      dispatch(getListPlaylistOfUser({ page: 1, limit: 5, token: token }))
    }
  }, [token, hasFetchingPaginationPlaylistData])
  const handleLoadMore = () => {
    if (hasMorePaginationPlaylistData && !loading) {
      const nextPage = currentPagePaginationPlaylistData + 1
      dispatch(getListPlaylistOfUser({ page: nextPage, limit: 5, token: token }))
    }
  }
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      handleLoadMore()
    }
  };
  return (
    <Container>
      <HeaderApp style={{ marginBottom: 5 }} title={"Thư viện"} />
      <Box style={{flex:1}}>
        <ScrollView
          style={{ marginHorizontal: 20, marginBottom:20, flex: 1 }}
          contentContainerStyle={{gap:15}}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          
        >
          <SliderHorizontal title={"Đã nghe gần đây"} />
          <SliderOption />
          <TabBarOption />
        </ScrollView>
      </Box>
    </Container>
  )
}
export default memo(MainLibrary)