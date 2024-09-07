import { Box, Text } from "native-base";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from "expo-image";
import styles_c from "@assets/styles/styles_c";
import sizes from "@assets/styles/sizes";
import colors from "@assets/colors/global_colors";
import { TouchableOpacity } from "react-native";

interface PlaylistViewProps { }

export const PlaylistView: React.FC<PlaylistViewProps> = () => {
  return (
    <Box style={{ gap: 20, marginTop: 15 }}>
      <TouchableOpacity style={{ ...styles_c.row_direction_align_center, gap: 15 }}>
        <Box
          style={{
            width: sizes._70sdp,
            height: sizes._70sdp,
            ...styles_c.col_center,
            borderRadius: 7,
          }}
          bgColor={colors.white_gray}
        >
          <AntDesign name="plus" size={24} color="black" />
        </Box>
        <Text>Thêm playlist</Text>
      </TouchableOpacity>
      <Box style={{ ...styles_c.row_direction_align_center, gap: 15 }}>
        <Box style={{ 
          width: sizes._70sdp, 
          height: sizes._70sdp, 
          borderRadius: 7, 
          overflow: 'hidden' 
        }}>
          <Image 
            source={require('@assets/images/Chúa_tể_an.png')}
            style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: 7
            }} 
          />
        </Box>
        <Box style={{gap:5}}>
          <Text fontWeight={'600'} fontSize={sizes._18sdp}>Playlist 1</Text>
          <Text color={colors.text_gray}>Lê Văn An</Text>
        </Box>
      </Box>
    </Box>
  );
}


interface AlbumListViewProps { }

export const AlbumListView: React.FC<AlbumListViewProps> = () => {
  return (
    <Box style={{ gap: 20, marginTop: 15 }}>
      <Box style={{ ...styles_c.row_direction_align_center, gap: 15 }}>
        <Box style={{ 
          width: sizes._70sdp, 
          height: sizes._70sdp, 
          borderRadius: 7, 
          overflow: 'hidden' 
        }}>
          <Image 
            source={require('@assets/images/Chúa_tể_an.png')}
            style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: 7
            }} 
          />
        </Box>
        <Box style={{gap:5}}>
          <Text fontWeight={'600'} fontSize={sizes._18sdp}>Album 1</Text>
          <Text color={colors.text_gray}>Lê Văn An</Text>
        </Box>
      </Box>
    </Box>
  );
}

interface SingerListViewProps { }

export const SingerListView: React.FC<SingerListViewProps> = () => {
  return (
    <Box style={{ gap: 20, marginTop: 15 }}>
      <Box style={{ ...styles_c.row_direction_align_center, gap: 15 }}>
        <Box style={{ 
          width: sizes._70sdp, 
          height: sizes._70sdp, 
          borderRadius: 50, 
          overflow: 'hidden' 
        }}>
          <Image 
            source={require('@assets/images/Chúa_tể_an.png')}
            style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: 7
            }} 
          />
        </Box>
        <Box>
          <Text fontWeight={'600'} fontSize={sizes._18sdp}>Lê Văn An</Text>
        </Box>
      </Box>
    </Box>
  );
}


