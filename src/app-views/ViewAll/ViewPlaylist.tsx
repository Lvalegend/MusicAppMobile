import { Container, Content, Header } from "@app-layout/Layout"
import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { Box, Text } from "native-base"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useNavigationServices } from "@app-helper/navigateToScreens"
import TitleContent from "./components/TitleContent"
import URL_API from "@app-helper/urlAPI"
import ActionComponent from "./components/ActionComponent"
import { LOGOAPP } from "@app-uikits/image"
import SongCard from "@app-views/Album/components/SongCard"
import { useRoute } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { getListPlaylistOfUser } from "@redux/features/playlistSlice"
import ServiceStorage, { KEY_STORAGE } from "@app-services/service-storage"
import { getSongPlaylistData } from "@redux/features/songPlaylistSlice"
import SongCardPlaylist from "./components/SongCardPlaylist"
import ListCircleHorizontal from "./components/ListCircleHorizontal"

interface ViewPlaylistProps { }
const ViewPlaylist: React.FC<ViewPlaylistProps> = () => {
  const { goToBack } = useNavigationServices()
  const [token, setToken] = useState<string>()
  const route:any = useRoute()
  const {playlist_id, playlist_name} = route.params
  useEffect(() => {
    (async () => {
      const token = await ServiceStorage.getString(KEY_STORAGE.USER_TOKEN)
      setToken(token)
    })()
  }, [])
  const dispatch = useDispatch()
  useEffect(() => {
      if(playlist_id){
        dispatch(getSongPlaylistData({page:1, limit: 5, playlist_id: playlist_id}))
      }
  },[playlist_id])

  function mergePlaylists(playlists: any[]) {
    const playlistMap = {};

    playlists.forEach(playlist => {
        if (playlistMap[playlist.playlist_id]) {
            // Gộp các bài hát và loại bỏ trùng lặp dựa trên song_id
            const existingPlaylist = playlistMap[playlist.playlist_id];
            playlist.songs.forEach(song => {
                if (!existingPlaylist.songs.some(s => s.song_id === song.song_id)) {
                    existingPlaylist.songs.push(song);
                }
            });
        } else {
            // Thêm playlist mới vào playlistMap
            playlistMap[playlist.playlist_id] = {
                ...playlist,
                songs: [...playlist.songs]
            };
        }
    });

    // Trả về danh sách playlist đã gộp
    return Object.values(playlistMap);
}
  const {paginationSongOrPlaylistResponse} = useSelector(( state:any)=> state.songPlaylist)
  console.log('{paginationSongOrPlaylistResponse', paginationSongOrPlaylistResponse)
  const filterData = paginationSongOrPlaylistResponse ? paginationSongOrPlaylistResponse
    ?.filter((item: any) => item?.filterPlaylistId === playlist_id)
    .flatMap((item: any) => item?.data || []) : []
  const data = filterData ? mergePlaylists(filterData): []
  console.log('dataaaaaa', JSON.stringify(data))
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
              title={playlist_name}
              image={LOGOAPP}
              songQuantity={data[0]?.songs?.length}
            />
          </Box>
          <Box marginX={'15px'} mb={4}>
            <ActionComponent />
          </Box>
          <Box padding={'15px'} style={{ gap: 10, borderRadius: 15 }}>
            {data[0]?.songs?.map((item: any, index: number) => (
              <Box key={index}>
                <SongCardPlaylist item={item} />
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
            <ListCircleHorizontal title="Ca sĩ đóng góp" data={data} />
          </Box>
        </Box>
      </Content>
    </Container>
  )
}
export default ViewPlaylist