import SwitchCustom from "@app-components/SwitchCustom/SwitchCustom";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { Box, Text } from "native-base";
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Modal, StyleSheet, ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import CommentCard from "./components/CommentCard";

interface ModalChatProps {
  isVisible: boolean;
  onClose: () => void;
}

const ModalChat: React.FC<ModalChatProps> = ({ isVisible, onClose }) => {
  const [inputText, setInputText] = useState("");
  const [disableButtonSendMessage, setDisableButtonSendMessage] = useState(true);

  useEffect(() => {
    if (inputText !== "") {
      setDisableButtonSendMessage(false);
    } else {
      setDisableButtonSendMessage(true);
    }
  }, [inputText]);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Box flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">
          <KeyboardAvoidingView
            style={styles.modalView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Box marginY={"15px"} flex={1}>
                <Box style={{ borderBottomWidth: 1, paddingBottom: 5 }}>
                  <Box style={{ marginHorizontal: 10, ...styles_c.row_between }}>
                    <Box></Box>
                    <Box paddingLeft={5}>
                      <Text textAlign={'center'}>
                        8889 Bình luận
                      </Text>
                    </Box>
                    <TouchableOpacity style={{ padding: 5 }} onPress={onClose}>
                      <AntDesign name="close" size={sizes._20sdp} color={colors.black} />
                    </TouchableOpacity>
                  </Box>
                </Box>
                <ScrollView>
                  <Box>
                    <CommentCard/>
                  </Box>
                </ScrollView>
              </Box>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: '80%',
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default ModalChat;
