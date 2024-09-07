import { Box, Text } from "native-base"
import { FontAwesome6, MaterialIcons, AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import { TextInput, TouchableOpacity } from "react-native";
import styles_c from "@assets/styles/styles_c";
import { useState } from "react";
interface SearchBarProps { }
const SearchBar: React.FC<SearchBarProps> = () => {
  const [text, setText] = useState('')
  return (
    <Box>
      <Box backgroundColor={colors.white_gray} w={'full'} style={{ gap: 10, borderRadius: 8, ...styles_c.row_direction_align_center, padding: 10 }}>
        <Box w={'10%'}>
          <TouchableOpacity style={{ padding: 5 }}>
            <AntDesign name='search1' color={colors.black} size={sizes._24sdp} />
          </TouchableOpacity>
        </Box>
        <Box w={'79%'}>
          <TextInput
            placeholder="Tìm kiếm"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        </Box>
        {text !== '' &&
          <Box w={'11%'} position={'relative'}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: -12,
                right: 17
              }}
              onPress={() => setText('')}
            >
              <AntDesign name="closecircle" color={colors.text_gray} size={sizes._23sdp} />
            </TouchableOpacity>
          </Box>
        }
      </Box>
    </Box>
  )
}
export default SearchBar