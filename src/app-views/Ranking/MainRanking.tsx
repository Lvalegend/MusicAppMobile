import { TouchableOpacity, View } from "react-native"
import RankingChart from "./components/RankingChart"
import { Container, Content } from "@app-layout/Layout";
import HeaderApp from "@app-components/HeaderApp/HeaderApp";
import { memo, useEffect, useState } from "react";
import { Box, Text } from "native-base";
import colors from "@assets/colors/global_colors";
import RankingCard from "./components/RankingCard";
import styles_c from "@assets/styles/styles_c";
import sizes from "@assets/styles/sizes";
import { Image } from 'expo-image'
import { LOGOAPP } from "@app-uikits/image";
import { useDispatch, useSelector } from "react-redux";
import { getSingerSongData } from "@redux/features/singerSongSlice";

interface MainRankingProps { }
const MainRanking: React.FC<MainRankingProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { paginationSingerSongResponse, hasMore, loading } = useSelector((state: any) => state.singerSong)
  const dispatch = useDispatch()
  useEffect(() => {
    if(hasMore){
      dispatch(getSingerSongData({ page: 1, limit: 4 }))
    }
  }, [hasMore])

  console.log('hasMore', hasMore)
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      dispatch(getSingerSongData({ page: nextPage, limit: 4 }))
    }
  };

  const combinedDataSingerSong = paginationSingerSongResponse ? paginationSingerSongResponse?.flatMap(obj => obj?.data) : []


  return (
    <Container>
      <HeaderApp title={"Bảng xếp hạng"} />
      <Content>
        <Box marginY={'20px'}>
          {/* <RankingChart /> */}
          <Box style={{ ...styles_c.col_center, gap: 5, marginBottom: 5 }}>
            <Box style={{ ...styles_c.col_center }}>
              <Text style={{ ...styles_c.font_text_16_600, color: colors.text_black }}>Bài hát được nghe nhiều nhất</Text>
            </Box>
            <Box>
              <Text style={{ ...styles_c.font_text_14_600, color: colors.text_blue_primary }}>TOP 1</Text>
            </Box>
            <Image
              source={LOGOAPP}
              style={{
                width: sizes._100sdp,
                height: sizes._102sdp,
                borderRadius: 8
              }}
              contentFit="cover"
            />
            <Box>
              <Text style={{ ...styles_c.font_text_16_600, color: colors.text_black }}>Người tình mùa đông</Text>
            </Box>
            <Box>
              <Text style={{ ...styles_c.font_text_16_400, color: colors.text_gray }}>Vĩnh Thuyên Kim</Text>
            </Box>
          </Box>
          <Box bgColor={colors.blue_primary} padding={'15px'} style={{ gap: 10, borderRadius: 15 }}>
            {combinedDataSingerSong?.map((item: any, index: number) => (
              <Box key={index}>
                <RankingCard item={item} />
              </Box>
            ))}
            {hasMore &&
              <TouchableOpacity
                style={{
                  borderRadius: 15,
                  padding: 5,
                  marginTop: 2,
                  borderColor: colors.white,
                  borderWidth: 1,
                  ...styles_c.row_center
                }}
                onPress={handleLoadMore}>
                <Text color={colors.white}>XEM THÊM</Text>
              </TouchableOpacity>
            }
          </Box>
        </Box>
      </Content>
    </Container>

  )
}
export default memo(MainRanking)