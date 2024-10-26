import { Box, Text } from "native-base"
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from "react-native";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";

interface SliderOptionProps { }
const SliderOption: React.FC<SliderOptionProps> = () => {
  const {goToFavouriteScreen} = useNavigationComponentApp()
  const data = [
    { id: 1, title: 'Bài hát yêu thích', icon: <MaterialCommunityIcons name="music-clef-treble" size={24} color={colors.blue_primary} />, count: 2 },
    { id: 2, title: 'Ca sĩ yêu thích', icon: <MaterialCommunityIcons name="account-music" size={24} color={colors.purple} />, count: 1 },
    { id: 3, title: 'Album yêu thích', icon: <Entypo name="folder-music" size={24} color={colors.red} />, count: 3 },
  ]
  return (
    <Box>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 8,
              width: sizes._135sdp
            }} 
            onPress={() => goToFavouriteScreen({title: item.title})}>
            <Box style={{ gap: 5 }}>
              <Box>{item.icon}</Box>
              <Box>
                <Text style={{ ...styles_c.font_text_14_600 }}>{item.title}</Text>
              </Box>
              <Box>
                <Text color={colors.text_gray}>{item.count}</Text>
              </Box>
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Box>
  )
}
export default SliderOption