import GradientComponent from "@app-components/LinearGradientComponent.tsx/GradientProps";
import { useNavigationServices } from "@app-helper/navigateToScreens";
import { Container, Content } from "@app-layout/Layout";
import ModalOptionSong from "@app-views/Modal/ModalOptionSong/ModalOptionSong";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Box, Text } from "native-base";
import React, { memo, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import ListOptionTab, { Props } from "./components/ListOptionTab";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getSingerSongData } from "@redux/features/singerSongSlice";
import { setListOptionTabData, setListOptionTabDataCurrent } from "@redux/features/components/songScreenSlice";
import _ from "lodash";
import { getCommentData } from "@redux/features/commentSlice";

interface SongScreenProps { }
const SongScreen: React.FC<SongScreenProps> = () => {
  const { goToBack } = useNavigationServices()
  const route: any = useRoute()
  const { song_id, album_id, album_name, song_name, song_url } = route.params
  console.log('song_idddddddddddddddd', song_id)
  const [isVisibleModalOptionSong, setIsVisibleModalOptionSong] = useState(false)
  const { listOptionTabData, listOptionTabDataCurrent } = useSelector((state: any) => state.songScreen)
  const onCloseModalOptionSong = () => {
    setIsVisibleModalOptionSong(false)
  }
  const dispatch = useDispatch()

  console.log('listOptionTabData', listOptionTabData)
  console.log('listOptionTabDataCurrent', listOptionTabDataCurrent)
  useEffect(() => {
    if (!listOptionTabData.find(existingItem => existingItem.song_id === song_id)) {
      console.log('re-renderrrrrrrrrrrrrrrrr')
      dispatch(getSingerSongData({ song_id: song_id }))
      dispatch(getCommentData({ page: 1, limit: 15, filterColumn: 'song_id', filterValue: song_id }))
    }
  }, [song_id])

  const { songRelationshipNoSingerResponse } = useSelector((state: any) => state.singerSong)
  const data = songRelationshipNoSingerResponse ?
    songRelationshipNoSingerResponse
      .map(response => response?.data?.filter(
        song => song?.song_id === song_id
      )).flat() : []

  const mergedData = data.reduce((acc, current) => {
    const existing = acc.find(item => item.song_id === current.song_id);

    if (existing) {
      existing.singers.push({
        singer_id: current.singer_id,
        singer_name: current.singer_name,
        singer_avatar: current.singer_avatar,
        description: current.description,
        date_of_birth: current.date_of_birth,
        singer_entity_id: current.singer_entity_id
      });
      existing.total_view += current.total_view;
      existing.total_favourite += current.total_favourite;
    } else {
      acc.push({
        song_id: current.song_id,
        song_name: current.song_name,
        song_url: current.song_url,
        song_image: current.song_image,
        release_date: current.release_date,
        song_entity_id: current.song_entity_id,
        total_view: current.total_view,
        total_favourite: current.total_favourite,
        singers: [{
          singer_id: current.singer_id,
          singer_name: current.singer_name,
          singer_avatar: current.singer_avatar,
          description: current.description,
          date_of_birth: current.date_of_birth,
          singer_entity_id: current.singer_entity_id
        }]
      });
    }

    return acc;
  }, []);

  console.log('datasssssssssssssss', JSON.stringify(mergedData))


  useEffect(() => {
    if (mergedData && song_id) {
      const props: Props = {
        song_id: song_id,
        album_id: album_id,
        album_name: album_name,
        song_name: song_name,
        data: mergedData
      }
      dispatch(setListOptionTabData(props));
      if (!_.isEqual(listOptionTabDataCurrent[0], props)) {
        console.log('rrrrrrrrrrrre-render')
        dispatch(setListOptionTabDataCurrent(props));
      }
    }
  }, [mergedData, song_id]);


  return (
    <Container>
      <Content>
        <GradientComponent colors={[colors.white_gray, colors.gray_primary]} style={{ width: '100%', height: sizes._screen_height }}>
          <Box flex={1}>
            <Box style={{ ...styles_c.row_between }} marginX={'20px'} marginY={'5px'} h={'5%'}>
              <TouchableOpacity onPress={goToBack}>
                <Entypo name="chevron-thin-down" size={sizes._24sdp} color={colors.white} />
              </TouchableOpacity>
              <Box>
                <Text fontSize={sizes._20sdp} color={colors.white} fontWeight={'600'}>Bài hát</Text>
              </Box>
              <TouchableOpacity onPress={() => setIsVisibleModalOptionSong(true)}>
                <SimpleLineIcons name="options" size={sizes._24sdp} color={colors.white} />
              </TouchableOpacity>
            </Box>
            <Box w={'full'} h={'95%'}>
              <ListOptionTab />
            </Box>
          </Box>
        </GradientComponent>
        <React.Fragment>
          <ModalOptionSong
            isVisible={isVisibleModalOptionSong}
            closeModal={onCloseModalOptionSong}
            showIconComments={true}
            song_id={song_id}
            song_url={song_url}
          />
        </React.Fragment>
      </Content>
    </Container>
  )
}
export default memo(SongScreen)