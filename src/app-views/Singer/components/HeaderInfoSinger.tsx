import URL_API from "@app-helper/urlAPI"
import { LOGOAPP } from "@app-uikits/image"
import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import { setListCheckSingerFavourite } from "@redux/features/components/singerScreenSlice"
import { getUserSingerData, addFavouriteSingerForUser, deleteFavouriteSingerForUser } from "@redux/features/userSingerSlice"
import { ImageBackground } from "expo-image"
import { Box, Text } from "native-base"
import { useEffect, useMemo, useState } from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"

interface HeaderInfoSingerProps {
  singer_avatar: string
  singer_name: string,
  total_favourite: number
  singer_id: number
}
const HeaderInfoSinger: React.FC<HeaderInfoSingerProps> = ({ singer_avatar, singer_name, total_favourite, singer_id }) => {
  const { listCheckSingerFavourite } = useSelector((state: any) => state.singerScreenId)
  const dispatch = useDispatch()
  const { paginationUserAndSingerResponse } = useSelector((state: any) => state.userSinger)
  const { token } = useSelector((state: any) => state.authToken)
  const [favourite, setFavourite] = useState(false)


  const existingFavourite = useMemo(() => {
    return listCheckSingerFavourite?.find(item => item?.singer_id === singer_id);
  }, [listCheckSingerFavourite, singer_id]);

  // Xử lý khi trạng thái bài hát thay đổi hoặc lần đầu vào bài hát
  useEffect(() => {
    if (singer_id) {
      if (existingFavourite) {
        // Nếu đã có trong `listCheckSingerFavourite`, set trạng thái yêu thích từ Redux
        setFavourite(existingFavourite.is_favourite);
      } else {
        // Nếu chưa có trong `listCheckSingerFavourite`, kiểm tra `paginationUserAndSingerResponse`
        const singerData = paginationUserAndSingerResponse?.find(
          item => item?.filterSingerId === singer_id
        );

        if (singerData) {
          const isFavourite = singerData?.data?.length > 0; // Kiểm tra nếu `data` không rỗng
          setFavourite(isFavourite);

          // Thêm dữ liệu mới vào Redux
          dispatch(setListCheckSingerFavourite({ singer_id: singer_id, is_favourite: isFavourite }));
        } else {
          // Nếu không tìm thấy dữ liệu, gọi API để cập nhật `paginationUserAndSingerResponse`
          dispatch(getUserSingerData({ page: 1, limit: 1, singer_id: singer_id, token: token }));
        }
      }
    }
  }, [singer_id, existingFavourite, paginationUserAndSingerResponse]);
  console.log('favourite', favourite)

  // Hàm xử lý khi người dùng bấm yêu thích hoặc bỏ yêu thích
  const onPressFavouriteSinger = () => {
    if (token && singer_id) {
      if (!favourite) {
        // Thêm yêu thích
        dispatch(addFavouriteSingerForUser({ token: token, singer_id: singer_id }));
        dispatch(setListCheckSingerFavourite({ singer_id: singer_id, is_favourite: true }));
        setFavourite(true);
      } else {
        // Bỏ yêu thích
        dispatch(deleteFavouriteSingerForUser({ token: token, singer_id: singer_id }));
        dispatch(setListCheckSingerFavourite({ singer_id: singer_id, is_favourite: false }));
        setFavourite(false);
      }
    }
  };
  return (
    <Box w={'full'}>
      <ImageBackground
        source={singer_avatar ? { uri: `${URL_API}/image/${singer_avatar}` } : LOGOAPP}
        style={{ width: '100%', height: sizes._300sdp }}
      >
        <Box style={{ justifyContent: 'flex-end', flex: 1, padding: 10, gap: 10 }}>
          <Box>
            <Text style={{ ...styles_c.font_text_30_400, color: colors.white }}>{singer_name || ''}</Text>
          </Box>
          <Box>
            <Text style={{ ...styles_c.font_text_14_400, color: colors.white_gray }}>{total_favourite || 0} theo dõi</Text>
          </Box>
          <Box style={{ ...styles_c.row_between, gap: 10 }}>
            <TouchableOpacity
              style={[styles.buttonImageStyle, { backgroundColor: colors.black }]}
              onPress={onPressFavouriteSinger}>
              <Box>
                <Text style={{ ...styles_c.font_text_16_400, color: colors.white }}>{favourite === true ? 'BỎ THEO DÕI' : 'THEO DÕI'}</Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonImageStyle, { backgroundColor: colors.purple }]}>
              <Box>
                <Text style={{ ...styles_c.font_text_16_400, color: colors.white }}>PHÁT NHẠC</Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  )
}
const styles = StyleSheet.create({
  buttonImageStyle: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 99999,
    flex: 1,
    ...styles_c.col_center
  },
  boxInfoStyle: {
    ...styles_c.row_direction_align_center,
    width: '100%',
    gap: 20
  },
  textStyle: {
    ...styles_c.font_text_16_400,
    flexWrap: 'wrap',
    color: colors.text_gray
  }
})
export default HeaderInfoSinger