import HeaderApp from "@app-components/HeaderApp/HeaderApp"
import SearchBar from "@app-components/SearchBar/SearchBar"
import { Content, Container } from "@app-layout/Layout"
import { Box } from "native-base"
import { memo, useEffect, useState } from "react"
import { View } from "react-native"
import ListRecommended from "./components/ListRecommend"
import CardSearchData from "./components/CardSearchData"
import useCallAPI from "@app-helper/useCallAPI"
import URL_API from "@app-helper/urlAPI"

interface MainSearchProps { }
const MainSearch: React.FC<MainSearchProps> = () => {
  const [textSearch, setTextSearch] = useState<string>('')
  const recieveText = (text: string) => {
    setTextSearch(text)
  }
  const [dataSearch, setDataSearch] = useState<any>([])
  useEffect(() => {
    if (textSearch !== '') {
      (async () => {
        const response = await useCallAPI('GET', `${URL_API}search/data?text=${textSearch}`)
        if (response?.data) {
          setDataSearch(response?.data)
        }
      })()
    }
    else {
      setDataSearch([])
    }
  }, [textSearch])
  return (
    <Container>
      <HeaderApp style={{ marginBottom: 5 }} title={"Tìm kiếm"} />
      <Content>
        <Box marginX={'20px'}>
          <SearchBar recieveText={recieveText} />
          <Box style={{gap:10, marginTop:10}}>
            {dataSearch?.map((item:any, index: number) => (
              <Box key={index}>
                <CardSearchData item={item}/>
              </Box>
            ))}
          </Box>
          <ListRecommended />
        </Box>
      </Content>
    </Container>
  )
}
export default memo(MainSearch)