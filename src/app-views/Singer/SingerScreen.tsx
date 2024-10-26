import HeaderCustom from "@app-components/HeaderCustom/HeaderCustom"
import { Container, Content } from "@app-layout/Layout"
import sizes from "@assets/styles/sizes"
import { ImageBackground } from "expo-image"
import { Box } from "native-base"

interface SingerScreenProps { }
const SingerScreen: React.FC<SingerScreenProps> = () => {
  return (
    <Container>
      <HeaderCustom title={'Thông tin ca sĩ'} />
      <Content>
        <Box w={'full'}>
          <ImageBackground
            source={require('@assets/images/Chúa_tể_an.png')}
            style={{ width: '100%', height: sizes._300sdp }}
          />
        </Box>
        
      </Content>
    </Container>
  )
}
export default SingerScreen