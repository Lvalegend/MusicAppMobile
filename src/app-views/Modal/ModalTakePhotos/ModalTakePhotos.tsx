import ModalCustom from "@app-components/CustomModal/ModalCustom";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { Box, Text } from "native-base";
import { useEffect, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";

interface ModalTakePhotosProps {
  isVisible: boolean;
  onClose: any;
  receiveImage: any
}
const ModalTakePhotos: React.FC<ModalTakePhotosProps> = ({ isVisible, onClose, receiveImage }) => {
  const [image, setImage] = useState<any>(null)
   
  useEffect(() => {
    if(image){
      receiveImage(image)
    }
  }, [image])

  const pickImage = async () => {
    // Ask for permission to access the gallery
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onClose()
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Ask for permission to access the camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    // Launch the camera
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onClose()
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ModalCustom
      isVisible={isVisible}
      onClose={onClose}
      isScroll={true}
    >
      <Box>
        <TouchableOpacity onPress={pickImage} style={{ padding: 10 }}>
          <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
            <FontAwesome name="photo" size={sizes._28sdp} color={colors.black} />
            <Text style={{ ...styles_c.font_text_18_600 }}>Chọn ảnh từ thư viện</Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={{ padding: 10 }}>
          <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
            <Entypo name="camera" size={sizes._28sdp} color={colors.black} />
            <Text style={{ ...styles_c.font_text_18_600 }}>Chụp ảnh</Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </ModalCustom>
  )
}
export default ModalTakePhotos