import { useNavigationServices } from "@app-helper/navigateToScreens";
import { Container, Content } from "@app-layout/Layout";
import { useRoute } from "@react-navigation/native";
import { Box } from "native-base";
import HeaderCustom from "../../app-components/HeaderCustom/HeaderCustom";
import GridView from "./GridView";
import ListTitleView from "./ListTitleView";

interface ViewAllProps {
}
const ViewAll: React.FC<ViewAllProps> = () => {
  const route: any = useRoute();
  const components = () => {
    switch (route.params.type) {
      case 'album':
        return <GridView />
      case 'list':
        return <ListTitleView />
    }
  }
  return (
    <Container>
     <HeaderCustom title={route.params.title}/>
      <Content>
        <Box>
          {components()}
        </Box>
      </Content>
    </Container>
  )
}
export default ViewAll