import HeaderCustom from "@app-components/HeaderCustom/HeaderCustom";
import LoadingBase from "@app-components/LoadingBase/LoadingBase";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import URL_API from "@app-helper/urlAPI";
import { useLoadMoreAPI } from "@app-helper/useLoadMoreAPI";
import { Container } from "@app-layout/Layout";
import { LOGOAPP } from "@app-uikits/image";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { Box, Text } from "native-base";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";

interface GridViewProps {}

const GridView: React.FC<GridViewProps> = () => {
  const { goToAlbumScreen } = useNavigationComponentApp();
  const route: any = useRoute();
  const { title, data } = route.params;
  const { dataLoadMore, loading, hasMore, error, fetchData, page } = useLoadMoreAPI(
    `${URL_API}get-data/relationship/singer-album`,
    8
  );
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchData();
    }
  };
  

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
        <Box style={{...styles_c.col_center}}>
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
          data={dataLoadMore || []}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <LoadingBase /> : null}
          ListEmptyComponent={error ? <Text style={{ color: 'red' }}>Error: {error}</Text> : null}
          ListFooterComponentStyle={{ paddingVertical: 20 }}
        />
        {!hasMore && <Text>No more data</Text>}
      </Box>
    </Container>
  );
};

export default GridView;
