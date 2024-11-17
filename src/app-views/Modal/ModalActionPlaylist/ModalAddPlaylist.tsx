import SwitchCustom from "@app-components/SwitchCustom/SwitchCustom";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { Box, Text } from "native-base";
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Modal } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createPlaylist } from "@redux/features/playlistSlice";
import ServiceStorage, { KEY_STORAGE } from "@app-services/service-storage";

interface ModalAddPlaylistProps {
  isVisible: boolean;
  onClose: any;
}
const ModalAddPlaylist: React.FC<ModalAddPlaylistProps> = ({ isVisible, onClose }) => {
  const [inputText, setInputText] = useState("");
  const [disableButtonAddPlaylist, setDisableButtonAddPlaylist] = useState(true);

  useEffect(() => {
    if (inputText !== "") {
      setDisableButtonAddPlaylist(false);
    } else {
      setDisableButtonAddPlaylist(true);
    }
  }, [inputText]);

  const [token, setToken] = useState<any>(null)
  useEffect(() => {
     (async() => {
       const token = await ServiceStorage.getString(KEY_STORAGE.USER_TOKEN)
       setToken(token)
     })()
  },[])

  const dispatch = useDispatch()
  const createNewPlaylist = (token: any, namePlaylist: string) => {
    if(token){
      dispatch(createPlaylist({token: token, playlist_name: namePlaylist}))
    }
  }

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="fade">
      <KeyboardAvoidingView
        style={{ flex: 1, position: "relative" }}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box marginY={"15px"} flex={1}>
            <TouchableOpacity onPress={onClose} style={{ padding: 10 }}>
              <AntDesign name="close" size={sizes._28sdp} color="black" />
            </TouchableOpacity>
            <Box marginX={"10px"} marginY={5} style={{ gap: 10 }}>
              <Box>
                <Text style={{ ...styles_c.font_text_20_600 }}>Tên Playlist</Text>
              </Box>
              <TextInput
                onChangeText={(text) => setInputText(text)}
                value={inputText}
                placeholder="Nhập tên của Playlist"
                style={{
                  width: "100%",
                  borderBottomWidth: 2,
                  borderColor: colors.blue_primary,
                  height: sizes._70sdp,
                  fontSize: sizes._25sdp,
                }}
                focusable={true}
              />
              <Box style={{ ...styles_c.row_between, marginTop: 10 }}>
                <Text style={{ ...styles_c.font_text_16_400 }}>Phát tuần tự</Text>
                <SwitchCustom
                  widthOuter={sizes._30sdp}
                  heightOuter={sizes._20sdp}
                  widthInner={sizes._15sdp}
                  heightInner={sizes._15sdp}
                />
              </Box>
            </Box>
            {/* Nút tạo playlist luôn ở dưới cùng */}
            <Box marginX={"20px"} position={"absolute"} bottom={0} left={0} right={0}>
              <TouchableOpacity
                style={{
                  backgroundColor: disableButtonAddPlaylist ? colors.white_gray : colors.blue_primary,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 20,
                }}
                disabled={disableButtonAddPlaylist}
                onPress={async () => { await createNewPlaylist(token, inputText), await onClose()}}
              >
                <Text color={colors.white} fontWeight={"bold"}>
                  TẠO PLAYLIST
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};
export default ModalAddPlaylist;
