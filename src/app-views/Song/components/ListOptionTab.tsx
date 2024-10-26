import React, { Fragment, useState } from 'react';
import { Box, Text, Pressable } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Dimensions, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '@assets/colors/global_colors';
import sizes from '@assets/styles/sizes';
import styles_c from '@assets/styles/styles_c';
import CircleImageRotating from './CircleImageRotating';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MusicPlayer from './MusicPlayer';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import responsive_screen from '@assets/styles/responsive';
import InfoCard from './InfoCard';
import VerticalList from './VerticalList';
import { useSelector } from 'react-redux';
import ModalChat from '@app-views/Modal/ModalChat/ModalChat';

type Props = {
  song_id?: number
  album_id?: number,
  album_name?: string
}

const TabBarCustom = ({ navigationState, jumpTo }: any) => {
  return (
    <Box flexDirection="row" style={{ ...styles_c.row_center, gap: 5, marginBottom: 10 }}>
      {navigationState.routes.map((route: any, index: number) => {
        const isFocused = navigationState.index === index;

        return (
          <Pressable
            key={route.key}
            onPress={() => jumpTo(route.key)}
          >
            <Box
              backgroundColor={isFocused ? colors.rgba_gray_translucent : colors.white_gray}
              height={sizes._1sdp}
              w={sizes._5sdp}
              borderRadius={'5px'}
              alignItems="center"
              justifyContent="center"
            >
            </Box>
          </Pressable>
        );
      })}
    </Box>
  );
};


const FirstRoute = (props: Props) => {
  const { response } = useSelector((state: any) => state.singerSong)
  const data = response?.data ? response?.data.filter((item: any) => item?.song_id === props?.song_id) : null
  return (
    <Box flex={1} mx={'20px'}>
      <Box w={'full'}>
        <InfoCard item={data[0]} album_name={props?.album_name} />
      </Box>
      <Box>
        <VerticalList title='Có thể bạn muốn nghe' />
      </Box>
    </Box>
  );
};

const SecondRoute = (props: Props) => {
  const [favourite, setFavourite] = useState(false)
  const [isVisibleModalChat, setIsVisibleModalChat] = useState(false)
  const onCloseModalChat = () => {
    setIsVisibleModalChat(false)
  }
  const [loop, setLoop] = useState(false)
  const { response } = useSelector((state: any) => state.singerSong)
  const data = response?.data ? response?.data.filter((item: any) => item?.song_id === props?.song_id) : null
  return (
    <Box flex={1} mx={'20px'}>
      <Box flex={3} justifyContent={'center'} alignItems={'center'}>
        <CircleImageRotating image_url={data[0]?.song_image} />
      </Box>
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <Box style={{ ...styles_c.row_between, width: '100%' }} flex={1}>
          <TouchableOpacity onPress={() => setLoop(!loop)}>
            <MaterialIcons name="loop" size={sizes._26sdp} color={loop === true ? colors.blue_primary : colors.white} />
          </TouchableOpacity>
          <Box style={{ alignItems: 'center', gap: 10, marginVertical: 10 }}>
            <Text fontSize={sizes._20sdp} fontWeight={'600'} color={colors.white}>{data[0]?.song_name}</Text>
            <Text color={colors.text_gray} fontSize={sizes._12sdp}>{data[0]?.singer_name}</Text>
          </Box>
          <TouchableOpacity onPress={() => setFavourite(!favourite)}>
            <AntDesign name="hearto" size={sizes._24sdp} color={favourite === true ? colors.blue_primary : colors.white} />
          </TouchableOpacity>
        </Box>
      </Box>
      <Box flex={1} justifyContent={'center'} alignItems={'center'} mt={'10px'}>
        <MusicPlayer song_url={data[0]?.song_url} />
      </Box>
      <Box
        style={{ ...styles_c.row_between, marginBottom: responsive_screen.h_less_768px(10, 0) }}
        w={'full'}
        flex={1}
      >
        <TouchableOpacity style={{ padding: 5 }} onPress={() => setIsVisibleModalChat(true)}>
          <Box>
            <AntDesign name="message1" size={sizes._28sdp} color={colors.white} />
          </Box>
        </TouchableOpacity>
        <Box>
          <MaterialIcons name="playlist-add" size={sizes._30sdp} color={colors.white} />
        </Box>
        <Box>
          <Feather name="download" size={sizes._28sdp} color={colors.white} />
        </Box>
        <Box>
          <MaterialCommunityIcons name="playlist-music" size={sizes._28sdp} color={colors.white} />
        </Box>
      </Box>
      <Fragment>
        <ModalChat
          isVisible={isVisibleModalChat}
          onClose={onCloseModalChat}
        />
      </Fragment>
    </Box>
  );
};

const ThirdRoute = () => {
  return (
    <Box flex={1} backgroundColor={colors.purple} justifyContent="center" alignItems="center">
      <Text>gfgfdg</Text>
    </Box>
  );
}

interface ListOptionTabProps {
  song_id?: number
  album_id?: number,
  album_name?: string
}
const ListOptionTab: React.FC<ListOptionTabProps> = ({ song_id, album_id, album_name }) => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },

  ]);

  const props: Props = {
    song_id: song_id,
    album_id: album_id,
    album_name: album_name
  }

  const renderScene = SceneMap({
    first: () => FirstRoute(props),
    second: () => SecondRoute(props),
    third: ThirdRoute
  });

  return (
    <Box w={'full'} h={'full'}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: sizes._screen_width }}
        renderTabBar={(props) => <TabBarCustom {...props} />}
      />
    </Box>
  );
};

export default ListOptionTab;
