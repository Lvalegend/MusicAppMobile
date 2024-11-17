import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { Box, Text } from "native-base"
import React, { useEffect } from "react"
import { TouchableOpacity } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import SongCard from "@app-views/Album/components/SongCard"
import { useDispatch, useSelector } from "react-redux"
import { getSingerSongData } from "@redux/features/singerSongSlice"

interface ListSongCardVerticalProps {
  title?: string
  singer_id?: number
}
const ListSongCardVertical: React.FC<ListSongCardVerticalProps> = ({ title, singer_id }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (singer_id) {
      dispatch(getSingerSongData({ page: 1, limit: 10, singer_id: singer_id }))
    }
  }, [singer_id])

  const {paginationSingerOrSongResponse } = useSelector((state: any) => state.singerSong);
  console.log('paginationSongOrAlbumResponse', paginationSingerOrSongResponse)
  const data = paginationSingerOrSongResponse
    ?.filter((item: any) => item.filterSingerId === singer_id)
    .flatMap((item: any) => item?.data || []);
  return (
    <Box p={3}>
      <TouchableOpacity >
        <Box style={{ ...styles_c.row_direction_align_center, gap: 10, marginBottom: 10 }}>
          <Text fontSize={sizes._18sdp} color={'black'} fontWeight={'bold'}>{title}</Text>
          <Entypo
            name={'chevron-thin-right'}
            size={sizes._18sdp}
            color={'black'}
          />
        </Box>
      </TouchableOpacity>
      <Box style={{gap:10}}>
        {data?.map((item: any, index: number) => (
          <Box key={index}>
            <SongCard item={item} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
export default ListSongCardVertical