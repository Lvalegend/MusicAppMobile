import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import { Box, Text } from "native-base"
import { View, TouchableOpacity, ScrollView } from "react-native"
import { Image } from 'expo-image';
import styles_c from "@assets/styles/styles_c";

interface SliderHorizontalProps {
  title: string
  data?: any
}
const SliderHorizontal: React.FC<SliderHorizontalProps> = ({ title, data }) => {
  return (
    <Box w={'full'}>
      <Box style={{ ...styles_c.row_between }}>
        <Box>
          <Text
            color={colors.text_black}
            fontWeight={'bold'}
            fontSize={sizes._20sdp}
          >
            {title}
          </Text>
        </Box>
        <TouchableOpacity>
          <Box
            backgroundColor={colors.gray_primary}
            paddingX={'10px'}
            borderRadius={50}
            paddingY={'5px'}
          >
            <Text
              color={colors.text_white}
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
          <Box key={index} style={{ gap: 5 }}>
            <Image
              source={item.image}
              style={{
                width: sizes._120sdp,
                height: sizes._120sdp,
                borderRadius: 8
              }}
              contentFit="cover"
              transition={1000}
            />
            <Box w={sizes._120sdp} marginTop={'5px'}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                fontSize={sizes._16sdp}
                fontWeight={'500'}
                color={colors.text_black}
              >
                {item?.namePlaylist || item?.nameSong}
              </Text>
            </Box>
            {item?.singer &&
              <Box w={sizes._160sdp}>
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
        ))}
      </ScrollView>
    </Box>
  )
}
export default SliderHorizontal