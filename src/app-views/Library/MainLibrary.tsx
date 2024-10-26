import HeaderApp from "@app-components/HeaderApp/HeaderApp"
import { Content, Container } from "@app-layout/Layout"
import { memo } from "react"
import { Box } from "native-base"
import sizes from "@assets/styles/sizes"
import TabBarOption from "./components/TabBarOption"
import { PlaylistView } from "./components/ViewTabBarOption"
import SliderHorizontal from "./components/SliderHorizontal"
import SliderOption from "./components/SliderOption"

interface MainLibraryProps { }
const MainLibrary: React.FC<MainLibraryProps> = () => {
  const data1 = [
    { id: 1, image: require('@assets/images/Chúa_tể_an.png'), namePlaylist: 'Người Tình Mùa Đông Remix' },
    { id: 2, image: require('@assets/images/Chúa_tể_an.png'), namePlaylist: 'Tình Nhòa Remix' },
    { id: 3, image: require('@assets/images/Chúa_tể_an.png'), namePlaylist: 'Lên Xe Đi Em Ơi' },
    { id: 4, image: require('@assets/images/Chúa_tể_an.png'), namePlaylist: 'Không Bằng Remix' },
    { id: 5, image: require('@assets/images/Chúa_tể_an.png'), namePlaylist: 'Không Bằng Remix' },
    { id: 6, image: require('@assets/images/Chúa_tể_an.png'), namePlaylist: 'Không Bằng Remix' },
    { id: 7, image: require('@assets/images/Chúa_tể_an.png'), namePlaylist: 'Không Bằng Remix' },
    { id: 8, image: require('@assets/images/Chúa_tể_an.png'), namePlaylist: 'Không Bằng Remix' },
    { id: 9, image: require('@assets/images/Chúa_tể_an.png'), namePlaylist: 'Không Bằng Remix' },
  ];
  return (
    <Container>
      <HeaderApp style={{marginBottom: 5}}  title={"Thư viện"} />
      <Content>
        <Box marginX={'20px'} style={{gap:15}} mb={5}>
          <SliderHorizontal title={"Đã nghe gần đây"} data={data1} />
          <SliderOption/>
          <TabBarOption/>
        </Box>
      </Content>
    </Container>
  )
}
export default memo(MainLibrary)