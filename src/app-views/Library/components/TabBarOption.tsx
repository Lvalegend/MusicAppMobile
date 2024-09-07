import { Box, Pressable, Text } from "native-base"
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import styles_c from "@assets/styles/styles_c";
import { TouchableOpacity, View } from "react-native";
import sizes from "@assets/styles/sizes";
import colors from "@assets/colors/global_colors";
import React, { useEffect, useState } from "react";
import { AlbumListView, PlaylistView, SingerListView } from "./ViewTabBarOption";
import ModalFindAndFilter from "@app-views/Modal/ModalFindAndFilter/ModalFindAndFilter";


interface TabBarOptionProps { }
const TabBarOption: React.FC<TabBarOptionProps> = () => {
  const [option, setOption] = useState('Playlist')

  const Optionals = () => {
    switch (option) {
      case 'Playlist':
        return <PlaylistView />
      case 'Album':
        return <AlbumListView />
      case 'Singer':
        return <SingerListView />
      default:
        return null
    }
  }

  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const closeModal = () => {
    setIsVisibleModal(false)
  }
  return (
    <Box>
      <Box
        style={{
          ...styles_c.row_between,
        }}>
        <Box
          style={{
            ...styles_c.row_direction_align_center,
            gap: 15
          }}>
          <TouchableOpacity
            style={{
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => setOption('Playlist')}>
            <Text
              fontWeight={option === 'Singer' ? '600' : '500'}
              fontSize={sizes._20sdp}
              color={option === 'Playlist' ? colors.text_blue_primary : colors.text_black}
            >
              Playlist
            </Text>
            {option === 'Playlist' &&
              <View
                style={{
                  width: '50%',
                  height: sizes._3sdp,
                  backgroundColor: colors.blue_primary,
                  borderRadius: 8
                }}
              />
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => setOption('Album')}>
            <Text
              fontWeight={option === 'Singer' ? '600' : '500'}
              fontSize={sizes._20sdp}
              color={option === 'Album' ? colors.text_blue_primary : colors.text_black}
            >
              Album
            </Text>
            {option === 'Album' &&
              <View
                style={{
                  width: '50%',
                  height: sizes._3sdp,
                  backgroundColor: colors.blue_primary,
                  borderRadius: 8
                }}
              />
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => setOption('Singer')}>
            <Text
              fontWeight={option === 'Singer' ? '600' : '500'}
              fontSize={sizes._20sdp}
              color={option === 'Singer' ? colors.text_blue_primary : colors.text_black}>
              Singer
            </Text>
            {option === 'Singer' &&
              <View
                style={{
                  width: '50%',
                  height: sizes._3sdp,
                  backgroundColor: colors.blue_primary,
                  borderRadius: 8
                }}
              />
            }
          </TouchableOpacity>
        </Box>
        <TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsVisibleModal(true)}
            style={{ paddingVertical: 5, paddingLeft: 5 }}
          >
            <SimpleLineIcons
              name="options-vertical"
              size={sizes._20sdp}
              color="black"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Box>
      <React.Fragment>
        {Optionals()}
      </React.Fragment>
      <React.Fragment>
        <ModalFindAndFilter isVisible={isVisibleModal} closeModal={closeModal} />
      </React.Fragment>
    </Box>
  )
}
export default TabBarOption