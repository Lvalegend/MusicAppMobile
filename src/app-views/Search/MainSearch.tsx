import HeaderApp from "@app-components/HeaderApp/HeaderApp"
import SearchBar from "@app-components/SearchBar/SearchBar"
import { Content, Container } from "@app-layout/Layout"
import { Box } from "native-base"
import { memo } from "react"
import { View } from "react-native"

interface MainSearchProps {}
const MainSearch: React.FC<MainSearchProps> = () => {
  return(
    <Container>
      <HeaderApp style={{marginBottom: 5}}  title={"Tìm kiếm"} />
      <Content>
        <Box marginX={'20px'}>
          <SearchBar/>
        </Box>
      </Content>
    </Container>
  )
}
export default memo(MainSearch)