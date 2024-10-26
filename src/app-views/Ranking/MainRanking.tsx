import { TouchableOpacity, View } from "react-native"
import RankingChart from "./components/RankingChart"
import { Container, Content } from "@app-layout/Layout";
import HeaderApp from "@app-components/HeaderApp/HeaderApp";
import { memo } from "react";
import { Box, Text } from "native-base";
import colors from "@assets/colors/global_colors";
import RankingCard from "./components/RankingCard";
import styles_c from "@assets/styles/styles_c";

interface MainRankingProps { }
const MainRanking: React.FC<MainRankingProps> = () => {
  const data = [
    { id: 1, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Người Tình Mùa Đông Remix', singer: 'Vĩnh Thuyên Kim', rank: 1 },
    { id: 2, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Tình Nhòa Remix', singer: 'Rum, KynBB', rank: 3 },
    { id: 3, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Lên Xe Đi Em Ơi', singer: 'Đinh Kiến Phong', rank: 2 },
    { id: 4, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo', rank: 7 },
    { id: 5, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo', rank: 6 },
    { id: 6, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo', rank: 4 },
    { id: 7, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo', rank: 9 },
    { id: 8, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo', rank: 8 },
    { id: 9, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Hoa Bằng Lăng Remix', singer: 'Rum', rank: 5 },
  ];
  const dataSorted = data.sort((a, b) => a.rank - b.rank);

  return (
    <Container>
      <HeaderApp style={{ marginBottom: 5 }} title={"Bảng xếp hạng"} />
      <Content>
        <Box marginY={'10px'}>
          <RankingChart />
          <Box bgColor={colors.blue_primary} padding={'15px'} style={{ gap: 10, borderRadius: 15 }}>
            {dataSorted.map((item: any, index: number) => (
              <Box key={index}>
                <RankingCard item={item} />
              </Box>
            ))}
            <TouchableOpacity style={{
              borderRadius: 15,
              padding: 5,
              marginTop:2,
              borderColor: colors.white,
              borderWidth: 1,
              ...styles_c.row_center
            }}>
              <Text color={colors.white}>XEM THÊM</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Content>
    </Container>

  )
}
export default memo(MainRanking)