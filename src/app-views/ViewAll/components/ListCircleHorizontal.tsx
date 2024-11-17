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
}

const ListCircleHorizontal: React.FC<ListCircleHorizontalProps> = ({ title, data }) => {
  const { goToSingerScreen } = useNavigationComponentApp()
  const dataSinger = data ? data?.reduce((uniqueSingers, playlist) => {
    playlist?.songs?.forEach(song => {
      song?.singers?.forEach(singer => {
        // Kiểm tra và thêm vào mảng nếu chưa tồn tại dựa trên `singer_id`
        if (!uniqueSingers?.some(existingSinger => existingSinger?.singer_id === singer?.singer_id)) {
          uniqueSingers.push(singer);
        }
      });
    });
    return uniqueSingers;
  }, []) : [];

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
        contentContainerStyle={{ gap: 10, marginBottom: 10 }}
        style={{ width: '100%', flexDirection: 'row' }}
        showsHorizontalScrollIndicator={false}
      >
        {dataSinger?.map((item: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => goToSingerScreen(
              {
                singer_id: item?.singer_id,
                singer_name: item?.singer_name,
                singer_avatar: item?.singer_avatar,
                description: item?.description,
                date_of_birth: item?.date_of_birth,
                total_favourite: item?.total_favourite,
                singer_entity_id: item?.singer_entity_id
              })}>
            <Box w={sizes._150sdp} maxHeight={sizes._220sdp}>
              <Box style={{ width: '100%', height: sizes._150sdp, borderRadius: 99999, overflow: 'hidden' }}>
                <Image
                  source={item?.singer_avatar ? { uri: `${URL_API}image/${item?.singer_avatar}` } : LOGOAPP}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                />
              </Box>
              <Box marginTop={'10px'} style={{ ...styles_c.col_center }}>
                <Text color={colors.text_black}>{item?.singer_name}</Text>
              </Box>
              <Box marginTop={'10px'} style={{ ...styles_c.col_center }}>
                <Text color={colors.text_gray}>{item?.total_favourite || 0} theo dõi</Text>
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
