import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Box, Text } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import sizes from '@assets/styles/sizes';
import styles_c from '@assets/styles/styles_c';
import colors from '@assets/colors/global_colors';
import { useNavigationComponentApp } from '@app-helper/navigateToScreens';
import ModalOptionSong from '@app-views/Modal/ModalOptionSong/ModalOptionSong';
import { useSelector } from 'react-redux';
import URL_API from '@app-helper/urlAPI';
import { LOGOAPP } from '@app-uikits/image';

interface SliderGridProps {
  title: string
  data: any
}

const SliderGrid: React.FC<SliderGridProps> = ({ title, data }) => {
  const { goToSongScreen } = useNavigationComponentApp()
  const [isVisibleModalOptionSong, setIsVisibleModalOptionSong] = useState(false)
  const onCloseModalOptionSong = () => {
    setIsVisibleModalOptionSong(false)
  }
  const lastSixElements = data?.slice(-6);
  

  const renderItem = (item: any) => (
    <TouchableWithoutFeedback onPress={() => goToSongScreen({song_id: item?.song_id, song_name: item?.song_name})}>
      <Box style={{ ...styles_c.row_between }} w={'full'} h={sizes._70sdp}>
        <View style={{ ...styles_c.row_center, gap: 10 }}>
          <Image
            source={item?.song_image ? { uri: `${URL_API}image/${item?.song_image}` } : LOGOAPP}
            style={{
              width: sizes._65sdp,
              height: sizes._65sdp,
              borderRadius: 8
            }}
            contentFit="cover"
            transition={1000}
          />
          <Box w={sizes._170sdp}>
            <Text
              fontSize={sizes._15sdp}
              color={colors.text_black}
              fontWeight={'600'}
              numberOfLines={2}
              ellipsizeMode='tail'
            >
              {item?.song_name}
            </Text>
            <Text
              fontSize={sizes._14sdp}
              color={colors.text_gray}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {item?.singer_name}
            </Text>
          </Box>
        </View>
        <TouchableOpacity onPress={() => setIsVisibleModalOptionSong(true)}>
          <SimpleLineIcons name={'options-vertical'} size={sizes._18sdp} color={colors.gray_primary} />
        </TouchableOpacity>
        <React.Fragment>
          <ModalOptionSong
            isVisible={isVisibleModalOptionSong}
            closeModal={onCloseModalOptionSong}
            song_id={item?.song_id}
            song_url={item?.song_url}
          />
        </React.Fragment>
      </Box>
    </TouchableWithoutFeedback>
  );

  const createRows = (data: any[]) => {
    const rows = [];
    for (let i = 0; i < data?.length; i += 3) {
      rows.push(
        <Row key={i} style={styles.row}>
          <Col>
            {renderItem(data[i])}
          </Col>
          {data[i + 1] && (
            <Col>
              {renderItem(data[i + 1])}
            </Col>
          )}
          {data[i + 2] && (
            <Col>
              {renderItem(data[i + 2])}
            </Col>
          )}
        </Row>
      );
    }
    return rows;
  };

  return (
    <Box marginTop={5}>
      <Box style={{ ...styles_c.row_between }}>
        <Box>
          <Text color={colors.text_gray}>Bắt đầu nghe từ một bài hát</Text>
          <Text fontSize={sizes._28sdp} color={'black'} fontWeight={'bold'}>{title}</Text>
        </Box>
        <TouchableOpacity style={styles.buttonStyle}>
          <MaterialIcons name={'restart-alt'} size={sizes._18sdp} color={'black'} />
          <Text fontSize={sizes._13sdp}>Làm mới</Text>
        </TouchableOpacity>
      </Box>
      <Box marginY={'10px'}>
        <ScrollView horizontal style={{ width: '100%' }} showsHorizontalScrollIndicator={false}>
          <Grid>
            {createRows(lastSixElements)}
          </Grid>
        </ScrollView>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderColor: '#D4D4D4'
  },
  row: {
    marginBottom: 5,
    gap: 15
  }
});

export default SliderGrid;
