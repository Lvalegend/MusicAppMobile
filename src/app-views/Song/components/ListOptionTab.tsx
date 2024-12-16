import React, { Fragment, memo, useEffect, useMemo, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import ModalChat from '@app-views/Modal/ModalChat/ModalChat';
import { getSingerSongData } from '@redux/features/singerSongSlice';
import ModalSelectPlaylist from '@app-views/Modal/ModalActionPlaylist/ModalSelectPlaylist';
import DownloadMusic from './DownloadMusic';
import { addFavouriteSongForUser, deleteFavouriteSongForUser, getUserSongData, removeSongById } from '@redux/features/userSongSlice';
import ServiceStorage, { KEY_STORAGE } from '@app-services/service-storage';
import { setListCheckFavourite } from '@redux/features/components/songScreenSlice';

export type Props = {
  song_id?: number
  album_id?: number,
  album_name?: string,
  song_name?: string
  data?: any[]
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


const FirstRoute = memo(() => {
  return (
    <Box flex={1} mx={'20px'}>
      <Box w={'full'}>
        <InfoCard />
      </Box>
      <Box>
        <VerticalList title='Có thể bạn muốn nghe' />
      </Box>
    </Box>
  );
});

const SecondRoute = memo(() => {
  const { listOptionTabDataCurrent, listCheckFavourite } = useSelector((state: any) => state.songScreen)
  const { paginationUserAndSongResponse } = useSelector((state: any) => state.userSong)
  console.log('paginationUserAndSongResponseeee', JSON.stringify(paginationUserAndSongResponse))
  console.log('listOptionTabDataCurrent', JSON.stringify(listOptionTabDataCurrent))
  const { token } = useSelector((state: any) => state.authToken)
  const [favourite, setFavourite] = useState(false)
  const [isVisibleModalChat, setIsVisibleModalChat] = useState(false)
  const onCloseModalChat = () => {
    setIsVisibleModalChat(false)
  }
  const [isVisibleModalSelectPlaylist, setIsVisibleModalSelectPlaylist] = useState(false)
  const onCloseModalSelectPlaylist = () => {
    setIsVisibleModalSelectPlaylist(false)
  }
  const [loop, setLoop] = useState(false)
  const allSingerNames = listOptionTabDataCurrent[0]?.data ?
    listOptionTabDataCurrent[0]?.data
      .flatMap(song => song?.singers?.map(singer => singer?.singer_name))
      .join(", ") : ''

  const dispatch = useDispatch()

  const currentSongId = listOptionTabDataCurrent?.[0]?.data?.[0]?.song_id;

  const existingFavourite = useMemo(() => {
    return listCheckFavourite?.find(item => item?.song_id === currentSongId);
  }, [listCheckFavourite, currentSongId]);

  // Xử lý khi trạng thái bài hát thay đổi hoặc lần đầu vào bài hát
  useEffect(() => {
    if (currentSongId) {
      if (existingFavourite) {
        // Nếu đã có trong `listCheckFavourite`, set trạng thái yêu thích từ Redux
        setFavourite(existingFavourite.is_favourite);
      } else {
        // Nếu chưa có trong `listCheckFavourite`, kiểm tra `paginationUserAndSongResponse`
        const songData = paginationUserAndSongResponse?.find(
          item => item?.filterSongId === currentSongId
        );

        if (songData) {
          const isFavourite = songData?.data?.length > 0; // Kiểm tra nếu `data` không rỗng
          setFavourite(isFavourite);

          // Thêm dữ liệu mới vào Redux
          dispatch(setListCheckFavourite({ song_id: currentSongId, is_favourite: isFavourite }));
        } else {
          // Nếu không tìm thấy dữ liệu, gọi API để cập nhật `paginationUserAndSongResponse`
          dispatch(getUserSongData({ page: 1, limit: 1, song_id: currentSongId, token: token }));
        }
      }
    }
  }, [currentSongId, existingFavourite, paginationUserAndSongResponse]);
  console.log('favourite', favourite)

  // Hàm xử lý khi người dùng bấm yêu thích hoặc bỏ yêu thích
  const onPressFavouriteSong = () => {
    if (token && currentSongId) {
      if (!favourite) {
        // Thêm yêu thích
        dispatch(addFavouriteSongForUser({ token: token, song_id: currentSongId }));
        dispatch(setListCheckFavourite({ song_id: currentSongId, is_favourite: true }));
        setFavourite(true);
      } else {
        // Bỏ yêu thích
        dispatch(deleteFavouriteSongForUser({ token: token, song_id: currentSongId }));
        dispatch(setListCheckFavourite({ song_id: currentSongId, is_favourite: false }));
        setFavourite(false);
      }
    }
  };

  return (
    <Box flex={1} mx={'20px'}>
      <Box flex={3} style={{ ...styles_c.col_center }}>
        <CircleImageRotating />
      </Box>
      <Box flex={1} style={{ ...styles_c.col_center }}>
        <Box style={{ ...styles_c.row_between, width: '100%' }} flex={1}>
          <TouchableOpacity onPress={() => setLoop(!loop)}>
            <MaterialIcons name="loop" size={sizes._26sdp} color={loop === true ? colors.blue_primary : colors.white} />
          </TouchableOpacity>
          <Box style={{ alignItems: 'center', gap: 10, marginVertical: 10 }}>
            <Box maxWidth={sizes._300sdp}>
              <Text
                fontSize={sizes._20sdp}
                fontWeight={'600'}
                color={colors.white}
                flexWrap={'wrap'}
                textAlign={'center'}
                ellipsizeMode='tail'
                numberOfLines={2}
              >
                {listOptionTabDataCurrent[0]?.data[0]?.song_name}
              </Text>
            </Box>
            <Text color={colors.text_gray} fontSize={sizes._12sdp}>{allSingerNames}</Text>
          </Box>
          <TouchableOpacity onPress={() => { onPressFavouriteSong() }}>
            <AntDesign name="hearto" size={sizes._24sdp} color={favourite === true ? colors.blue_primary : colors.white} />
          </TouchableOpacity>
        </Box>
      </Box>
      <Box flex={1} style={{ ...styles_c.col_center }} mt={'10px'}>
        <MusicPlayer />
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
        <TouchableOpacity style={{ padding: 5 }} onPress={() => setIsVisibleModalSelectPlaylist(true)}>
          <Box>
            <MaterialIcons name="playlist-add" size={sizes._30sdp} color={colors.white} />
          </Box>
        </TouchableOpacity>
        <Fragment>
          <DownloadMusic type={'in_song'} />
        </Fragment>
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
      <Fragment>
        <ModalSelectPlaylist
          isVisible={isVisibleModalSelectPlaylist}
          closeModal={onCloseModalSelectPlaylist}
          song_id={listOptionTabDataCurrent[0]?.song_id}
        />
      </Fragment>
    </Box>
  );
});

const ThirdRoute = () => {
  return (
    <Box flex={1} backgroundColor={colors.purple} justifyContent="center" alignItems="center">
      <Text>gfgfdg</Text>
    </Box>
  );
}

export interface ListOptionTabProps {

}
const ListOptionTab: React.FC<ListOptionTabProps> = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },

  ]);

  const renderScene = SceneMap({
    first: () => <FirstRoute />,
    second: () => <SecondRoute />,
    third: ThirdRoute
  });

  return (
    <Box w={'full'} h={'full'}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        lazy={true}
        initialLayout={{ width: sizes._screen_width }}
        renderTabBar={(props) => <TabBarCustom {...props} />}
      />
    </Box>
  );
};

export default memo(ListOptionTab);
