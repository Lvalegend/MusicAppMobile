import { Box, Text } from "native-base"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from "react-native";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import colors from "@assets/colors/global_colors";
import { Fragment } from "react";
import DownloadMusic from "@app-views/Song/components/DownloadMusic";

interface ActionComponentProps { }
const ActionComponent: React.FC<ActionComponentProps> = () => {
  return (
    <Box style={{ ...styles_c.row_between }}>
      <Fragment>
         <DownloadMusic song_url={""} type={"not_in_song"}/>
      </Fragment>
      <TouchableOpacity
        style={{
          backgroundColor: colors.blue_primary,
          padding: 10,
          borderRadius: 20
        }}>
        <Text color={colors.white} style={{ ...styles_c.font_text_16_600 }}>PHÁT NGẪU NHIÊN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Box alignItems={'center'}>
          <AntDesign
            name="pluscircleo"
            size={sizes._24sdp}
            color={colors.black}
          />
          <Text>Thêm bài</Text>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
export default ActionComponent