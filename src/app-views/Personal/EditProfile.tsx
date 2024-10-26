import HeaderCustom from "@app-components/HeaderCustom/HeaderCustom";
import { useNavigationServices } from "@app-helper/navigateToScreens";
import { Container, Content, Footer } from "@app-layout/Layout";
import ModalTakePhotos from "@app-views/Modal/ModalTakePhotos/ModalTakePhotos";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { Image } from "expo-image";
import { Box, Text } from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface EditProfileProps { }
const EditProfile: React.FC<EditProfileProps> = () => {
  const { goToBack } = useNavigationServices()
  const [image, setImage] = useState<any>(null)
  const receiveImage = (image: any) => {
    setImage(image)
  }

  const [isVisibleModalTakePhotos, setIsVisibleModalTakePhotos] = useState(false)
  const closeModalTakePhotos = () => {
    setIsVisibleModalTakePhotos(false)
  }
  const [statusTextInputChange, setStatusTextInputChange] = useState(false)
  const [nameChange, setNameChange] = useState('Lê Văn An')
  const [statusButtonChange, setStatusButtonChange] = useState(true)
  const initialName = 'Lê Văn An'
  const initialImage = null
  useEffect(() => {
    if (image !== initialImage || nameChange !== initialName) {
      setStatusButtonChange(false)
    }
    else {
      setStatusTextInputChange(true)
    }
  }, [image, nameChange])

  return (
    <Container>
      <HeaderCustom title={'Thông tin cá nhân'} />
      <Content>
        <Box marginX={'15px'} marginY={2}>
          <Box style={{ ...styles_c.row_between }}>
            <Text style={{ ...styles_c.font_text_18_600 }}>Ảnh đại diện</Text>
            <TouchableOpacity onPress={() => setIsVisibleModalTakePhotos(true)}>
              <Text
                color={colors.blue_primary}
                style={{ ...styles_c.font_text_18_400 }}
              >
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </Box>
          <Box style={{ ...styles_c.col_center, marginVertical: 10 }}>
            <Image
              source={{ uri: image }}
              style={{
                width: sizes._120sdp,
                height: sizes._120sdp,
                borderRadius: 9999
              }}
            />
          </Box>
          <Box style={{ ...styles_c.row_between, marginVertical: 20 }}>
            <Box style={{ ...styles_c.row_direction_align_center, gap: 20 }}>
              <Text style={{ ...styles_c.font_text_18_600 }}>Tên: </Text>
              <TextInput
                style={{ ...styles_c.font_text_18_600, color: colors.text_gray }}
                value={nameChange}
                onChangeText={(text) => setNameChange(text)}
                editable={statusTextInputChange}
              />
            </Box>
            <TouchableOpacity onPress={() => setStatusTextInputChange(true)}>
              <Text
                color={colors.blue_primary}
                style={{ ...styles_c.font_text_18_400 }}
              >
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </Box>
          <Box style={{ ...styles_c.row_between, marginVertical: 10 }}>
            <Box style={{ ...styles_c.row_direction_align_center, gap: 10 }}>
              <Text style={{ ...styles_c.font_text_18_600 }}>Tài khoản: </Text>
              <Text style={{ ...styles_c.font_text_18_600 }} color={colors.text_gray}>Tài khoản thường</Text>
            </Box>
            <TouchableOpacity>
              <Text color={colors.text_purple} style={{ ...styles_c.font_text_18_400 }}>Nâng cấp</Text>
            </TouchableOpacity>
          </Box>
        </Box>
        <ModalTakePhotos
          isVisible={isVisibleModalTakePhotos}
          onClose={closeModalTakePhotos}
          receiveImage={receiveImage}
        />
      </Content>
      <Footer>
        <TouchableOpacity
          style={{
            backgroundColor: statusButtonChange ? colors.gray_primary : colors.blue_primary,
            padding: 10,
            ...styles_c.col_center,
            borderRadius: 10,
            margin: 20
          }}
          disabled={statusButtonChange}
          onPress={goToBack}
          >
          <Text
            color={colors.white}
            style={{ ...styles_c.font_text_16_600 }}
          >
            Xác nhận lưu thay đổi
          </Text>
        </TouchableOpacity>
      </Footer>
    </Container>
  )
}
export default EditProfile