import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import { Box, Text } from "native-base"
import { View, TouchableOpacity } from "react-native"
import { Image } from 'expo-image';
import Feather from '@expo/vector-icons/Feather';
import styles_c from "@assets/styles/styles_c";

interface PersonInfoProps { }
const PersonInfo: React.FC<PersonInfoProps> = () => {
  return (
    <Box style={{...styles_c.row_between, marginTop:10}}>
      <Box flexDirection={'row'} alignItems={'center'} style={{ gap: 10 }}>
        <Box>
          <Image
            source={require('@assets/images/Chúa_tể_an.png')}
            style={{ width: sizes._80sdp, height: sizes._80sdp, borderRadius: 50 }}
            contentFit="cover"
            transition={1000}
            />
        </Box>
        <Box>
          <Text
            color={colors.black}
            fontWeight={'600'}
            fontSize={sizes._20sdp}
          >
            Lê Văn An
          </Text>
          <Box
            backgroundColor={colors.text_gray}
            paddingX={'10px'}
            borderRadius={50}
            paddingY={'3px'}
          >
            <Text
              color={colors.white}
              fontWeight={'bold'}
              fontSize={sizes._10sdp}
            >
              NORMAL ACCOUNT
            </Text>
          </Box>
        </Box>
      </Box>
      <TouchableOpacity style={{padding:5}}>
        <Feather name='edit' size={sizes._25sdp}/>
      </TouchableOpacity>
    </Box>
  )
}
export default PersonInfo