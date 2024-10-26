import { Box, Text } from "native-base";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import colors from "@assets/colors/global_colors";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import { useSelector } from "react-redux";
import URL_API from "@app-helper/urlAPI";
import { LOGOAPP } from "@app-uikits/image";

interface SliderOneRowSmallProps {
  title: string;
  data: any;
  routeData: any
}

const SliderOneRowSmall: React.FC<SliderOneRowSmallProps> = ({ title, data, routeData }) => {
  const { goToGridView, goToAlbumScreen } = useNavigationComponentApp()
  const { loading, error, paginationResponse } = useSelector((state: any) => state.singerAlbum);
  const displayData = paginationResponse?.data?.slice(0,4)
  return (
    <Box>
      <TouchableOpacity onPress={() => goToGridView({title: title, data: paginationResponse?.data})}>
        <Box style={{ ...styles_c.row_direction_align_center, gap: 10, marginBottom: 10 }}>
          <Text fontSize={sizes._26sdp} color={'black'} fontWeight={'bold'}>{title}</Text>
          <Entypo
            name={'chevron-thin-right'}
            size={sizes._18sdp}
            color={'black'}
          />
        </Box>
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 10 }}
        style={{ width: '100%', flexDirection: 'row' }}
        showsHorizontalScrollIndicator={false}
      >
        {displayData?.map((item: any, index: number) => (
          <TouchableOpacity 
          key={index}
          onPress={() =>
            goToAlbumScreen({
              album_id: item?.album_id,
              title: item?.album_name,
              image: item?.album_image,
              singer_id: item?.singer_id
            })}>
            <Box w={sizes._150sdp} maxHeight={sizes._220sdp}>
              <Box style={{ width: '100%', height: sizes._150sdp, borderRadius: 5, overflow: 'hidden' }}>
                <Image
                  source={item?.album_image ? { uri: `${URL_API}image/${item?.album_image}` } : LOGOAPP}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                />
                <Box position="absolute" bottom={0} left={0} right={0} padding={2} backgroundColor="rgba(0,0,0,0.5)">
                  <Text color={'white'}>{item?.album_name}</Text>
                </Box>
              </Box>
              <Box marginTop={'10px'}>
                <Text color={colors.text_gray}>{item?.singer_name}</Text>
              </Box>
            </Box>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            padding: 10
          }}
          onPress={() => goToGridView({title: title, data: paginationResponse?.data})}
        >
          <Box justifyContent={'center'} alignItems={'center'} style={{ gap: 10 }}>
            <Feather name="arrow-right-circle" size={sizes._30sdp} color={'black'} />
            <Text color={colors.text_gray}>Xem tất cả</Text>
          </Box>
        </TouchableOpacity>
      </ScrollView>
    </Box>
  );
};

export default SliderOneRowSmall;
