import { Container, Content } from "@app-layout/Layout";
import { Box } from "native-base";
import SliderOneRowSmall from "./components/SliderOneRowSmall";
import { useRoute } from "@react-navigation/native";
import HeaderCustom from "@app-components/HeaderCustom/HeaderCustom";

interface ListTitleViewProps {}

const ListTitleView: React.FC<ListTitleViewProps> = () => {
  const route:any = useRoute()
  const { title, ...rest } = route.params

  return (
    <Container>
      <HeaderCustom title={title}/>
      <Content>
        <Box style={{ gap: 10, marginHorizontal: 13, marginBottom: 10 }}>
          {Object.keys(rest).map((key, index) => (
            <SliderOneRowSmall key={index} title={rest[key].title} data={rest[key].data} />
          ))}
        </Box>
      </Content>
    </Container>
  );
};

export default ListTitleView;
