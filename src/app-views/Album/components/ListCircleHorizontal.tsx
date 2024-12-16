import { Box, Text } from "native-base";
import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import colors from "@assets/colors/global_colors";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import { useDispatch, useSelector } from "react-redux";
import { getSingerData } from "@redux/features/singerSlice";
import { getSingerAlbumData } from "@redux/features/singerAlbumSlice";
import URL_API from "@app-helper/urlAPI";
import { LOGOAPP } from "@app-uikits/image";

interface ListCircleHorizontalProps {
  title: string;
  data: any;
  routeData?: any
  album_id?: number;
}

const ListCircleHorizontal: React.FC<ListCircleHorizontalProps> = ({ title, data, routeData, album_id }) => {
  const dataSinger = data
    ?.filter((item: any) => item.filterAlbumId === album_id)
    .flatMap((item: any) => item?.data || []);
    console.log('datassssssssssssinger', dataSinger)
    console.log("album_iddddddddđ", album_id)
  return (
    <Box>
      <TouchableOpacity>
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
        {dataSinger?.map((item: any, index: number) => (
          <TouchableOpacity key={index}>
            <Box w={sizes._150sdp} maxHeight={sizes._220sdp}>
              <Box style={{ width: '100%', height: sizes._150sdp, borderRadius: 99999, overflow: 'hidden' }}>
                <Image
                  source={item?.album_image ? { uri: `${URL_API}image/${item?.album_image}` } : LOGOAPP}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                />
              </Box>
              <Box marginTop={'10px'} style={{...styles_c.col_center}}>
                <Text color={colors.text_black}>{item?.singer_name}</Text>
              </Box>
              <Box marginTop={'10px'} style={{...styles_c.col_center}}>
                <Text color={colors.text_gray}>{item?.total_favourite || 0} quan tâm</Text>
              </Box>
            </Box>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            padding: 10
          }}
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

export default ListCircleHorizontal;
