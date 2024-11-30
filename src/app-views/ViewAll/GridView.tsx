import HeaderCustom from "@app-components/HeaderCustom/HeaderCustom";
import LoadingBase from "@app-components/LoadingBase/LoadingBase";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import URL_API from "@app-helper/urlAPI";
import { Container } from "@app-layout/Layout";
import { LOGOAPP } from "@app-uikits/image";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { useRoute } from "@react-navigation/native";
import { getSingerAlbumData } from "@redux/features/singerAlbumSlice";
import { Image } from "expo-image";
import { Box, Text } from "native-base";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface GridViewProps { }

const GridView: React.FC<GridViewProps> = () => {
  const { goToAlbumScreen } = useNavigationComponentApp();
  const route: any = useRoute();
  const { title, type, singer_id } = route.params;
  const dispatch = useDispatch();
  const {
    paginationSingerAlbumResponse,
    paginationSingerNoAlbumResponse,
    hasMorePaginationSingerNoAlbumResponse,
    currentPagePaginationSingerNoAlbumResponse,
    hasFetchingPaginationSingerNoAlbumResponse,
    hasMorePaginationSingerAlbumResponse,
    currentPagePaginationSingerAlbumResponse,
    hasFetchingPaginationSingerAlbumResponse,
    loading,
    error
  } = useSelector((state: any) => state.singerAlbum);

  const combinedDataSingerAlbum = paginationSingerAlbumResponse
    ? paginationSingerAlbumResponse?.flatMap(obj => obj?.data)
    : [];
  const combinedDataSingerNoAlbum = paginationSingerNoAlbumResponse
    ? paginationSingerNoAlbumResponse?.filter((item: any) => item?.filterSingerId === singer_id)?.flatMap(obj => obj?.data)
    : [];

  const handleLoadMore = () => {
    if (type === 'random_album') {
      if (hasMorePaginationSingerAlbumResponse && !loading) {
        const nextPage = currentPagePaginationSingerAlbumResponse + 1;
        dispatch(getSingerAlbumData({ page: nextPage, limit: 8 }));
      }
    } else if (type === 'album_of_singer' && singer_id) {
      if (hasMorePaginationSingerNoAlbumResponse && !loading) {
        const nextPage = currentPagePaginationSingerNoAlbumResponse + 1;
        dispatch(getSingerAlbumData({ singer_id: singer_id, page: nextPage, limit: 8 }));
      }
    }
  };

  // Render each album item
  const renderItem = ({ item }: any) => (
    <Box style={{ flex: 1, padding: 10 }}>
      <TouchableOpacity
        style={{ gap: 5 }}
        onPress={() =>
          goToAlbumScreen({
            album_id: item?.album_id,
            title: item?.album_name,
            image: item?.album_image,
          })
        }
      >
        <Image
          source={
            item?.album_image
              ? { uri: `${URL_API}image/${item?.album_image}` }
              : LOGOAPP
          }
          style={{ height: sizes._170sdp, borderRadius: 8 }}
        />
        <Box style={{ ...styles_c.col_center }}>
          <Text>{item?.album_name}</Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );

  return (
    <Container>
      <HeaderCustom title={title} />
      <Box flex={1} height={sizes._screen_height}>
        <FlatList
          data={type === 'album_of_singer' ? combinedDataSingerNoAlbum : combinedDataSingerAlbum}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item?.id ? item?.id?.toString() : index?.toString())}
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <LoadingBase /> : null}
          ListEmptyComponent={error ? <Text style={{ color: 'red' }}>Error: {error}</Text> : null}
          ListFooterComponentStyle={{ paddingVertical: 20 }}
        />
      </Box>
    </Container>
  );
};

export default GridView;
