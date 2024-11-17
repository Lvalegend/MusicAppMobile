import { Box, Text } from "native-base"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from "react-native";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import colors from "@assets/colors/global_colors";
import { Fragment, useEffect, useState } from "react";
import DownloadMusic from "@app-views/Song/components/DownloadMusic";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";

interface ActionComponentProps {
  data: any[]
 }
const ActionComponent: React.FC<ActionComponentProps> = ({data}) => {
  const {goToSongScreen} = useNavigationComponentApp()
  const [random, setRandom] = useState<any>(0)

  useEffect(() => {
    if(random && data){
      goToSongScreen(
        {
          song_id: data[random]?.song_id,
          album_id: data[random]?.album_id,
          album_name: data[random]?.album_name,
          song_name: data[random]?.song_name,
          song_url: data[random]?.song_url
        })
    }
  },[random, data])
  return (
    <Box style={{ ...styles_c.row_between }}>
      <Fragment>
         <DownloadMusic type={"not_in_song"}/>
      </Fragment>
      <TouchableOpacity
        style={{
          backgroundColor: colors.blue_primary,
          padding: 10,
          borderRadius: 20
        }}
        onPress={() => setRandom(Math.floor(Math.random() * (data?.length || 0)))}>
        <Text color={colors.white} style={{ ...styles_c.font_text_16_600 }}>PHÁT NGẪU NHIÊN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Box alignItems={'center'}>
          <MaterialIcons
            name="favorite-outline"
            size={sizes._27sdp}
            color={colors.black}
          />
          <Text>Yêu thích</Text>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
export default ActionComponent