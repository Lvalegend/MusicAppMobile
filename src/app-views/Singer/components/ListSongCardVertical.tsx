import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { Box, Text } from "native-base"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import SongCard from "@app-views/Album/components/SongCard"
import { useDispatch, useSelector } from "react-redux"
import { getSingerSongData } from "@redux/features/singerSongSlice"
import { addListSongCardId } from "@redux/features/components/singerScreenSlice"
import colors from "@assets/colors/global_colors"

interface ListSongCardVerticalProps {
  title?: string
  singer_id?: number
}
const ListSongCardVertical: React.FC<ListSongCardVerticalProps> = ({ title, singer_id }) => {
  const dispatch = useDispatch()
  const { listSongCardIds } = useSelector((state: any) => state.singerScreenId)

  const [checkSingerId, setCheckSingerId] = useState(false)
  useEffect(() => {
    if (singer_id) {
      if (!listSongCardIds?.includes(singer_id)) {
        dispatch(addListSongCardId(singer_id))
        setCheckSingerId(true)
      }
      else {
        setCheckSingerId(false)
      }
    }
  }, [singer_id])

  useEffect(() => {
    if (checkSingerId) {
      dispatch(getSingerSongData({ page: 1, limit: 10, singer_id: singer_id }))
    }
  }, [checkSingerId])

  const { paginationSingerOrSongResponse } = useSelector((state: any) => state.singerSong);
  console.log('paginationSongOrAlbumResponse', paginationSingerOrSongResponse)
  const data = paginationSingerOrSongResponse
    ?.filter((item: any) => item.filterSingerId === singer_id)
    .flatMap((item: any) => item?.data || []);
  return (
    <Box p={3}>
      <TouchableOpacity >
        <Box style={{ ...styles_c.row_direction_align_center, gap: 10, marginBottom: 10 }}>
          <Text fontSize={sizes._18sdp} color={colors.black} fontWeight={'bold'}>{title}</Text>
          <Entypo
            name={'chevron-thin-right'}
            size={sizes._18sdp}
            color={colors.black}
          />
        </Box>
      </TouchableOpacity>
      <Box style={{ gap: 10 }}>
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