import { Box, Text } from "native-base";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from "expo-image";
import styles_c from "@assets/styles/styles_c";
import sizes from "@assets/styles/sizes";
import colors from "@assets/colors/global_colors";
import { FlatList, TouchableOpacity } from "react-native";
import { Fragment, useEffect, useState } from "react";
import ModalAddPlaylist from "@app-views/Modal/ModalActionPlaylist/ModalAddPlaylist";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import { useDispatch, useSelector } from "react-redux";
import ServiceStorage, { KEY_STORAGE } from "@app-services/service-storage";
import { getListPlaylistOfUser } from "@redux/features/playlistSlice";
import LoadingBase from "@app-components/LoadingBase/LoadingBase";
import { addSongInPlaylist } from "@redux/features/songPlaylistSlice";

interface PlaylistViewProps {
  type?: 'select' | 'view',
  song_id?: number,
  closeModal? : any
}

export const PlaylistView: React.FC<PlaylistViewProps> = ({ type, song_id, closeModal }) => {
  const { goToListTitleView, goToViewPlaylist} = useNavigationComponentApp()
  const [isVisibleModalAddPlaylist, setIsVisibleModalAddPlaylist] = useState(false)
  const closeModalAddPlaylist = () => {
    setIsVisibleModalAddPlaylist(false)
  }
  const dispatch = useDispatch()
  const { paginationPlaylistData, allPlaylistData, playlistDataSendResponse, loading, error } = useSelector((state: any) => state.playlist)

  const [token, setToken] = useState<any>(null)
  const [account, setAccount] = useState<any>()
  useEffect(() => {
    (async () => {
      const token = await ServiceStorage.getString(KEY_STORAGE.USER_TOKEN)
      const account = await ServiceStorage.getObject(KEY_STORAGE.ACCOUNT_DATA)
      setToken(token)
      setAccount(account)
    })()
  }, [])

  // useEffect(() => {
  //   if (token) {
  //     dispatch(getListPlaylistOfUser({ token: token }))
  //   }
  // }, [token])

  useEffect(() => {
    if (playlistDataSendResponse?.success && token) {
      dispatch(getListPlaylistOfUser({ token: token }))
    }
  }, [playlistDataSendResponse, token])

  const combineAllPlaylistData = allPlaylistData ? allPlaylistData?.flatMap(obj => obj?.data) : []

  const renderItem = (item: any) => {
    console.log('items', JSON.stringify(item))
    const checkTypeOnClick = () => {
      if (type === 'view') {
         goToViewPlaylist({playlist_id: item?.item?.playlist_id, playlist_name: item?.item?.playlist_name})
      }
      else if (type === 'select'){
        const songIds = []
        if (song_id && item?.item?.playlist_id) {
          songIds.push(song_id)
          dispatch(addSongInPlaylist({playlist_id: item?.item?.playlist_id, songIds: songIds}))
          closeModal()
        }
      }
    }
    return (
      <TouchableOpacity onPress={checkTypeOnClick}>
        <Box style={{ ...styles_c.row_direction_align_center, gap: 15, marginBottom: 10 }}>
          <Box style={{
            width: sizes._70sdp,
            height: sizes._70sdp,
            borderRadius: 7,
            overflow: 'hidden'
          }}>
            <Image
              source={require('@assets/images/Chúa_tể_an.png')}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 7
              }}
            />
          </Box>
          <Box style={{ gap: 5 }}>
            <Text fontWeight={'600'} fontSize={sizes._18sdp}>{item?.item?.playlist_name}</Text>
            <Text color={colors.text_gray}>{account?.user_name}</Text>
          </Box>
        </Box>
      </TouchableOpacity>
    )
  }
  return (
    <Box style={{ gap: 12, marginTop: 15 }}>
      <TouchableOpacity
        style={{ ...styles_c.row_direction_align_center, gap: 15 }}
        onPress={() => setIsVisibleModalAddPlaylist(true)}
      >
        <Box
          style={{
            width: sizes._70sdp,
            height: sizes._70sdp,
            ...styles_c.col_center,
            borderRadius: 7,
          }}
          bgColor={colors.white_gray}
        >
          <AntDesign name="plus" size={24} color={colors.black} />
        </Box>
        <Text>Thêm playlist</Text>
      </TouchableOpacity>
      <Box>
        <FlatList
          data={combineAllPlaylistData}
          renderItem={renderItem}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => (item?.playlist_id ? item.playlist_id.toString() : index.toString())}
          ListFooterComponent={loading ? <LoadingBase /> : null}
          ListEmptyComponent={error ? <Text style={{ color: 'red' }}>Error: {error}</Text> : null}
          ListFooterComponentStyle={{ paddingVertical: 20 }}
        />
      </Box>
      <Fragment>
        <ModalAddPlaylist isVisible={isVisibleModalAddPlaylist} onClose={closeModalAddPlaylist} />
      </Fragment>
    </Box>
  );
}


interface AlbumListViewProps { }

export const AlbumListView: React.FC<AlbumListViewProps> = () => {
  return (
    <Box style={{ gap: 20, marginTop: 15 }}>
      <Box style={{ ...styles_c.row_direction_align_center, gap: 15 }}>
        <Box style={{
          width: sizes._70sdp,
          height: sizes._70sdp,
          borderRadius: 7,
          overflow: 'hidden'
        }}>
          <Image
            source={require('@assets/images/Chúa_tể_an.png')}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 7
            }}
          />
        </Box>
        <Box style={{ gap: 5 }}>
          <Text fontWeight={'600'} fontSize={sizes._18sdp}>Album 1</Text>
          <Text color={colors.text_gray}>Lê Văn An</Text>
        </Box>
      </Box>
    </Box>
  );
}

interface SingerListViewProps { }

export const SingerListView: React.FC<SingerListViewProps> = () => {
  const { goToSingerScreen } = useNavigationComponentApp()
  return (
    <Box>
      <TouchableOpacity style={{ gap: 20, marginTop: 15 }} onPress={() => goToSingerScreen()}>
        <Box style={{ ...styles_c.row_direction_align_center, gap: 15 }}>
          <Box style={{
            width: sizes._70sdp,
            height: sizes._70sdp,
            borderRadius: 50,
            overflow: 'hidden'
          }}>
            <Image
              source={require('@assets/images/Chúa_tể_an.png')}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 7
              }}
            />
          </Box>
          <Box>
            <Text fontWeight={'600'} fontSize={sizes._18sdp}>Lê Văn An</Text>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}


