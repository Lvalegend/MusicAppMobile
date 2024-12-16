import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import { Box, Text } from "native-base"
import { View, TouchableOpacity, ScrollView } from "react-native"
import { Image } from 'expo-image';
import styles_c from "@assets/styles/styles_c";
import { LOGOAPP } from "@app-uikits/image";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";

interface SliderHorizontalProps {
  title: string
  data?: any

}
const SliderHorizontal: React.FC<SliderHorizontalProps> = ({ title, data }) => {
  const {goToViewPlaylist} = useNavigationComponentApp()
  return (
    <Box w={'full'}>
      <Box style={{ ...styles_c.row_between }}>
        <Box>
          <Text
            color={colors.black}
            fontWeight={'bold'}
            fontSize={sizes._20sdp}
          >
            {title}
          </Text>
        </Box>
        <TouchableOpacity>
          <Box
            backgroundColor={colors.text_gray}
            paddingX={'10px'}
            borderRadius={50}
            paddingY={'5px'}
          >
            <Text
              color={colors.white}
              fontWeight={'bold'}
              fontSize={sizes._10sdp}
            >
              Xem tất cả
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 10, marginTop: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {data?.map((item: any, index: any) => (
          <TouchableOpacity 
          key={index} 
          onPress={() => goToViewPlaylist({playlist_id: item?.playlist_id, playlist_name: item?.playlist_name})}
          >
          <Box style={{ gap: 5 }}>
            <Image
              source={LOGOAPP}
              style={{
                width: sizes._160sdp,
                height: sizes._160sdp,
                borderRadius: 8
              }}
              contentFit="cover"
              transition={1000}
            />
            <Box maxWidth={sizes._160sdp} marginTop={'5px'} style={{...styles_c.col_center}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                fontSize={sizes._16sdp}
                fontWeight={'500'}
                color={colors.black}
              >
                {item?.playlist_name}
              </Text>
            </Box>
            {item?.singer &&
              <Box maxWidth={sizes._160sdp}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  fontSize={sizes._16sdp}
                  fontWeight={'400'}
                  color={colors.text_gray}
                >
                  {item?.singer}
                </Text>
              </Box>
            }
          </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Box>
  )
}
export default SliderHorizontal