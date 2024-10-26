import { useNavigationServices } from "@app-helper/navigateToScreens";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Box, Text } from "native-base";
import { TouchableOpacity } from "react-native";

interface HeaderCustomProps {
   title: any
 }
const HeaderCustom: React.FC<HeaderCustomProps> = ({title}) => {
  const { goToBack } = useNavigationServices()
  return (
    <Box style={{ ...styles_c.row_between }}>
      <TouchableOpacity onPress={goToBack} style={{ padding: 10 }}>
        <Ionicons name="arrow-back-outline" size={sizes._25sdp} color={colors.black} />
      </TouchableOpacity>
      <Box marginRight={'40px'}>
        <Text color={colors.black} style={{ ...styles_c.font_text_18_600 }}>{title}</Text>
      </Box>
      <Box />
    </Box>
  )
}
export default HeaderCustom