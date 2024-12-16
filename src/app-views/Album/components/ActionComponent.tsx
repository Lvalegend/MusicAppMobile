import { Box, Text } from "native-base"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from "react-native";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import colors from "@assets/colors/global_colors";
import { Fragment, useEffect, useMemo, useState } from "react";
import DownloadMusic from "@app-views/Song/components/DownloadMusic";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import { useDispatch, useSelector } from "react-redux";
import { setListCheckAlbumFavourite } from "@redux/features/components/albumScreenSlice";
import { addFavouriteAlbumForUser, deleteFavouriteAlbumForUser, getUserAlbumData } from "@redux/features/userAlbumSlice";

interface ActionComponentProps {
  data: any[]
  album_id: number
}
const ActionComponent: React.FC<ActionComponentProps> = ({ data, album_id }) => {
  const { goToSongScreen } = useNavigationComponentApp()
  const { listCheckAlbumFavourite } = useSelector((state: any) => state.albumScreenId)
  const [random, setRandom] = useState<any>(null)

  useEffect(() => {
    if (random !== null && random !== undefined && data?.length > 0) {
      goToSongScreen(
        {
          song_id: data[random]?.song_id,
          album_id: data[random]?.album_id,
          album_name: data[random]?.album_name,
          song_name: data[random]?.song_name,
          song_url: data[random]?.song_url
        })
    }
  }, [random, data])

  useEffect(() => {
    if (data) {
      setRandom(null)
    }
  }, [data])

  const dispatch = useDispatch()
  const { paginationUserAndAlbumResponse } = useSelector((state: any) => state.userAlbum)
  const { token } = useSelector((state: any) => state.authToken)
  const [favourite, setFavourite] = useState(false)


  const existingFavourite = useMemo(() => {
    return listCheckAlbumFavourite?.find(item => item?.album_id === album_id);
  }, [listCheckAlbumFavourite, album_id]);

  // Xử lý khi trạng thái bài hát thay đổi hoặc lần đầu vào bài hát
  useEffect(() => {
    if (album_id) {
      if (existingFavourite) {
        // Nếu đã có trong `listCheckAlbumFavourite`, set trạng thái yêu thích từ Redux
        setFavourite(existingFavourite.is_favourite);
      } else {
        // Nếu chưa có trong `listCheckAlbumFavourite`, kiểm tra `paginationUserAndAlbumResponse`
        const albumData = paginationUserAndAlbumResponse?.find(
          item => item?.filterAlbumId === album_id
        );

        if (albumData) {
          const isFavourite = albumData?.result?.length > 0; // Kiểm tra nếu `data` không rỗng
          setFavourite(isFavourite);

          // Thêm dữ liệu mới vào Redux
          dispatch(setListCheckAlbumFavourite({ album_id: album_id, is_favourite: isFavourite }));
        } else {
          // Nếu không tìm thấy dữ liệu, gọi API để cập nhật `paginationUserAndAlbumResponse`
          dispatch(getUserAlbumData({ page: 1, limit: 1, album_id: album_id, token: token }));
        }
      }
    }
  }, [album_id, existingFavourite, paginationUserAndAlbumResponse]);
  console.log('favourite', favourite)

  // Hàm xử lý khi người dùng bấm yêu thích hoặc bỏ yêu thích
  const onPressFavouriteAlbum = () => {
    if (token && album_id) {
      if (!favourite) {
        // Thêm yêu thích
        dispatch(addFavouriteAlbumForUser({ token: token, album_id: album_id }));
        dispatch(setListCheckAlbumFavourite({ album_id: album_id, is_favourite: true }));
        setFavourite(true);
      } else {
        // Bỏ yêu thích
        dispatch(deleteFavouriteAlbumForUser({ token: token, album_id: album_id }));
        dispatch(setListCheckAlbumFavourite({ album_id: album_id, is_favourite: false }));
        setFavourite(false);
      }
    }
  };

  return (
    <Box style={{ ...styles_c.row_between }}>
      <Fragment>
        <DownloadMusic type={"not_in_song"} />
      </Fragment>
      <TouchableOpacity
        style={{
          backgroundColor: colors.blue_primary,
          padding: 10,
          borderRadius: 20
        }}
        disabled={data?.length === 0}
        onPress={() => setRandom(Math.floor(Math.random() * (data?.length)))}>
        <Text color={colors.white} style={{ ...styles_c.font_text_16_600 }}>PHÁT NGẪU NHIÊN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressFavouriteAlbum}>
        <Box alignItems={'center'}>
          <MaterialIcons
            name="favorite-outline"
            size={sizes._27sdp}
            color={favourite === true ? colors.blue_primary : colors.black}
          />
          <Text color={favourite === true ? colors.blue_primary : colors.black}>{favourite == true ? 'Bỏ yêu thích' : 'Yêu thích'}</Text>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
export default ActionComponent