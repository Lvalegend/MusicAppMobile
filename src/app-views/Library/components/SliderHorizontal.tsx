import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import { Box, Text } from "native-base"
import { View, TouchableOpacity, ScrollView } from "react-native"
import { Image } from 'expo-image';
import styles_c from "@assets/styles/styles_c";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ServiceStorage, { KEY_STORAGE } from "@app-services/service-storage";
import { getListRecentlyViewedOfUser } from "@redux/features/recentlyViewedSlice";
import URL_API from "@app-helper/urlAPI";
import { LOGOAPP } from "@app-uikits/image";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";

interface SliderHorizontalProps {
  title: string
}
const SliderHorizontal: React.FC<SliderHorizontalProps> = ({ title }) => {
  const { goToSongScreen } = useNavigationComponentApp()
  const dispatch = useDispatch()
  const { dataGetListRecentViewedResponse } = useSelector((state: any) => state.recentlyViewed)
  useEffect(() => {
    (async () => {
      const token = await ServiceStorage.getString(KEY_STORAGE.USER_TOKEN)
      await dispatch(getListRecentlyViewedOfUser({ token: token }))
    })()
  }, [])
  const dataRecentViewed = dataGetListRecentViewedResponse?.result ? dataGetListRecentViewedResponse?.result : []
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
        {dataRecentViewed?.map((item: any, index: any) => (
          <TouchableOpacity key={index} onPress={() => goToSongScreen({ song_name: item?.song_name, song_id: item?.song_id })}>
            <Box style={{ gap: 5 }}>
              <Image
                source={item?.song_image ? { uri: `${URL_API}image/${item?.song_image}` } : LOGOAPP}
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
                  {item?.song_name}
                </Text>
              </Box>
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Box>
  )
}
export default SliderHorizontal