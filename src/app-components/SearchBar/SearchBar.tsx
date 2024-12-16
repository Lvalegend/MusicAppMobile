import { Box, Text } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import { TextInput, TouchableOpacity } from "react-native";
import styles_c from "@assets/styles/styles_c";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";

interface SearchBarProps {
  recieveText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ recieveText }) => {
  const {goToSpeechToText} = useNavigationComponentApp()
  const [text, setText] = useState<string>('');
  const [debouncedText] = useDebounce(text, 500);

  useEffect(() => {
    if (debouncedText !== '') {
      recieveText(debouncedText);
    }
    else {
      recieveText(debouncedText);
    }
  }, [debouncedText]);

  return (
    <Box>
      <Box
        backgroundColor={colors.white_gray}
        w={'full'}
        style={{
          gap: 10,
          borderRadius: 8,
          ...styles_c.row_direction_align_center,
          padding: 5,
        }}
      >
        <Box w={'10%'}>
          <TouchableOpacity style={{ padding: 5 }} onPress={() => goToSpeechToText()}>
          <FontAwesome name="microphone" size={sizes._24sdp} color={colors.black} />
          </TouchableOpacity>
        </Box>
        <Box w={'78%'}>
          <TextInput
            placeholder="Tìm kiếm"
            value={text}
            onChangeText={(newText) => setText(newText)}
          />
        </Box>
        {text !== '' && (
          <Box w={'12%'} position={'relative'}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: -12,
                right: 25,
              }}
              onPress={() => setText('')}
            >
              <AntDesign name="closecircle" color={colors.text_gray} size={sizes._23sdp} />
            </TouchableOpacity>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchBar;
