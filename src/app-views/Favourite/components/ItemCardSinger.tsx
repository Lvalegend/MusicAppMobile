import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { Box, Text } from "native-base";
import { Image } from 'expo-image'
import { TouchableOpacity } from "react-native";
import colors from "@assets/colors/global_colors";
import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import URL_API from "@app-helper/urlAPI";
import { LOGOAPP } from "@app-uikits/image";

interface ItemCardSingerProps {
  item?: any
}

const ItemCardSinger: React.FC<ItemCardSingerProps> = ({ item }) => {
  const { goToSingerScreen } = useNavigationComponentApp()
  return (
    <Box style={{ ...styles_c.row_between }}>
      <TouchableOpacity
        style={{ gap: 20}}
        onPress={() => goToSingerScreen(
          {
            singer_id: item?.singer_id,
            singer_name: item?.singer_name,
            singer_avatar: item?.singer_avatar,
            description: item?.description,
            date_of_birth: item?.date_of_birth,
            total_favourite: item?.total_favourite,
            singer_entity_id: item?.singer_entity_id
          })}
      >
        <Box style={{ ...styles_c.row_direction_align_center, gap: 15 }}>
          <Box style={{
            width: sizes._70sdp,
            height: sizes._70sdp,
            borderRadius: 50,
            overflow: 'hidden'
          }}>
            <Image
              source={item?.singer_avatar ? { uri: `${URL_API}image/${item?.singer_avatar}` } : LOGOAPP}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 7
              }}
            />
          </Box>
          <Box>
            <Text fontWeight={'600'} fontSize={sizes._18sdp}>{item?.singer_name}</Text>
          </Box>
        </Box>
      </TouchableOpacity>
      <Box>
        <TouchableOpacity style={{ padding: 5 }}>
          <MaterialIcons
            name="favorite"
            size={sizes._20sdp}
            color={colors.purple}
          />
        </TouchableOpacity>
      </Box>
    </Box>
  );
}
export default ItemCardSinger