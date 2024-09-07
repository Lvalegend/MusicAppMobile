import { View } from "react-native"
import RankingChart from "./components/RankingChart"
import { Container, Content } from "@app-layout/Layout";
import HeaderApp from "@app-components/HeaderApp/HeaderApp";
import { memo } from "react";

interface MainRankingProps { }
const MainRanking: React.FC<MainRankingProps> = () => {
  const topSongs = [
    { name: "Song A", views: 140 },
    { name: "Song B", views: 250 },
    { name: "Song C", views: 180 },
    { name: "Song D", views: 300 },
    { name: "Song E", views: 10000 },
  ];

  return (
    <Container>
      <HeaderApp style={{marginBottom: 5}}  title={"Bảng xếp hạng"} />
      <Content>
        <RankingChart/>
      </Content>
    </Container>

  )
}
export default memo(MainRanking)