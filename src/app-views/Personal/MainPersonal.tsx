import HeaderApp from "@app-components/HeaderApp/HeaderApp"
import { Container, Content } from "@app-layout/Layout"
import { Box } from "native-base"
import { memo } from "react"
import PersonInfo from "./components/PersonInfo"
import PersonSetting from "./components/PersonSetting"
import SliderHorizontal from "./components/SliderHorizontal"
import { useSelector } from "react-redux"
import AccountPackage from "../ViewAll/components/AccountPackage"


interface MainPersonalProps { }
const MainPersonal: React.FC<MainPersonalProps> = () => {
  const {allPlaylistData} = useSelector((state:any) => state.playlist )
  const combineAllPlaylistData = allPlaylistData ? allPlaylistData?.flatMap(obj => obj?.data) : []
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
  const data2 = [
    { id: 1, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Người Tình Mùa Đông Remix', singer: 'Vĩnh Thuyên Kim' },
    { id: 2, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Tình Nhòa Remix', singer: 'Rum, KynBB' },
    { id: 3, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Lên Xe Đi Em Ơi', singer: 'Đinh Kiến Phong' },
    { id: 4, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 5, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 6, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 7, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 8, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
    { id: 9, image: require('@assets/images/Chúa_tể_an.png'), nameSong: 'Không Bằng Remix', singer: 'Nam Milo' },
  ];
  return (
    <Container>
      <HeaderApp style={{marginBottom: 5}}  title={"Cá nhân"} />
      <Content>
        <Box marginX={'20px'} style={{ gap: 15 }} marginBottom={'20px'}>
          <PersonInfo />
          <SliderHorizontal data={combineAllPlaylistData} title={"Danh sách phát của tôi"} />
          <SliderHorizontal data={data2} title={"Có thể bạn muốn nghe"} />
          <AccountPackage/>
          <PersonSetting />
        </Box>
      </Content>
    </Container>
  )
}
export default memo(MainPersonal)