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
  const { 
    paginationSingerSongResponse, 
    hasMorePaginationSingerSongResponse, 
    loading, 
    currentPagePaginationSingerSongResponse ,
    hasFetchingPaginationSingerSongResponse
  } = useSelector((state: any) => state.singerSong)
  const dispatch = useDispatch()
  useEffect(() => {
    if(!hasFetchingPaginationSingerSongResponse){
      dispatch(getSingerSongData({ page: 1, limit: 6 }))
    }
  }, [hasFetchingPaginationSingerSongResponse])

  const handleLoadMore = () => {
    if (hasMorePaginationSingerSongResponse && !loading) {
      const nextPage = currentPagePaginationSingerSongResponse + 1;
      dispatch(getSingerSongData({ page: nextPage, limit: 6 }))
    }
  };

  const combinedDataSingerSong = paginationSingerSongResponse ? paginationSingerSongResponse?.flatMap(obj => obj?.data) : []


  return (
    <Container>
      <HeaderApp title={"Bảng xếp hạng"} />
      <Content>
        <Box marginY={'20px'}>
          {/* <RankingChart /> */}
          <Box bgColor={colors.blue_primary} padding={'15px'} style={{ gap: 10, borderRadius: 15 }}>
            {combinedDataSingerSong?.map((item: any, index: number) => (
              <Box key={index}>
                <RankingCard item={item} index={index}/>
              </Box>
            ))}
            {hasMorePaginationSingerSongResponse &&
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