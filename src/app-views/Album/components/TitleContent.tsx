import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { Image } from "expo-image"
import { Box, Text } from "native-base"

interface TitleContentProps {
   title: string,
   image: any
   songQuantity: number
 }
const TitleContent: React.FC<TitleContentProps> = ({title, image, songQuantity}) => {
  return (
    <Box style={{...styles_c.col_center, gap:10}}>
       <Image
        source={image}
        style={{width: sizes._200sdp, height:sizes._200sdp, borderRadius:5 }}/>
        <Box marginTop={1}>
          <Text color={colors.black} style={{...styles_c.font_text_20_600}}>{title}</Text>
        </Box>
        <Box>
          <Text color={colors.gray_primary}>{songQuantity || 0} bài hát</Text>
        </Box>
    </Box>
  )
}
export default TitleContent