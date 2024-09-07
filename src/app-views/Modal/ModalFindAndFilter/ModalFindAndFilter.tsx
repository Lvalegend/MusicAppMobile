import ModalCustom from "@app-components/CustomModal/ModalCustom"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { Box, Text } from "native-base"
import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface ModalFindAndFilterProps {
  isVisible: boolean
  closeModal: any
}
const ModalFindAndFilter: React.FC<ModalFindAndFilterProps> = ({
  isVisible,
  closeModal,
}) => {
  const [isVisibleModalDetails, setIsVisibleModalDetails] = useState(false)
  const closeModalDetails = () => {
    setIsVisibleModalDetails(false)
  }
  return (
    <React.Fragment>
      <React.Fragment>
        <ModalCustom
          isVisible={isVisible}
          isScroll={true}
          onClose={closeModal}>
          <Box marginX={'5px'} marginY={'5px'}>
            <TouchableOpacity
              style={{ ...styles_c.row_direction_align_center, padding: 10, gap: 15 }}
            >
              <Octicons name="search" size={sizes._24sdp} color="black" />
              <Text fontWeight={'500'}>
                Tìm kiếm playlist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {closeModal() ,setIsVisibleModalDetails(true) }}
              style={{ ...styles_c.row_direction_align_center, padding: 10, gap: 15 }}
            >
              <MaterialCommunityIcons name="arrange-send-to-back" size={sizes._24sdp} color="black" />
              <Text fontWeight={'500'}>
                Sắp xếp
              </Text>
            </TouchableOpacity>
          </Box>
        </ModalCustom>
      </React.Fragment>
      <React.Fragment>
        <ModalCustom
          isVisible={isVisibleModalDetails}
          isScroll={true}
          onClose={closeModalDetails}>
          <Box marginX={'5px'} marginY={'5px'}>
            <TouchableOpacity
              style={{ ...styles_c.row_direction_align_center, padding: 10, gap: 15 }}
            >
              <FontAwesome6 name="arrow-up-a-z" size={24} color="black" />
              <Text fontWeight={'500'}>
                Sắp xếp từ z-a
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles_c.row_direction_align_center, padding: 10, gap: 15 }}
            >
              <FontAwesome6 name="arrow-down-a-z" size={24} color="black" />
              <Text fontWeight={'500'}>
                Sắp xếp từ a-z
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles_c.row_direction_align_center, padding: 10, gap: 15 }}
            >
              <FontAwesome6 name="arrow-down-a-z" size={24} color="black" />
              <Text fontWeight={'500'}>
                Mới nhất
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles_c.row_direction_align_center, padding: 10, gap: 15 }}
            >
              <FontAwesome6 name="arrow-down-a-z" size={24} color="black" />
              <Text fontWeight={'500'}>
                Cũ nhất
              </Text>
            </TouchableOpacity>
          </Box>
        </ModalCustom>
      </React.Fragment>
    </React.Fragment>
  )
}
export default ModalFindAndFilter