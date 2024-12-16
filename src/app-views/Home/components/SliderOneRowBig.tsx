import React, { useEffect } from 'react';
import { Text, Box } from "native-base";
import { View, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Image } from 'expo-image';
import sizes from "@assets/styles/sizes";
import ColorChangingText from "@app-components/ColorChangeText/ColorChangeText";
import { useNavigationComponentApp } from '@app-helper/navigateToScreens';
import colors from '@assets/colors/global_colors';
import URL_API from '@app-helper/urlAPI';
import { LOGOAPP } from '@app-uikits/image';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumData } from '@redux/features/albumSlice';
import { useNavigation } from '@react-navigation/native';

interface SliderOneRowBigProps {
  title?: string;
  data: any;
}

const SliderOneRowBig: React.FC<SliderOneRowBigProps> = ({ title, data }) => {
  const { goToAlbumScreen } = useNavigationComponentApp()

  return (
    <Box>
      {title && (
        <Box marginBottom={'10px'}>
          <Text fontSize={sizes._26sdp} color={colors.black} fontWeight={'bold'}>
            {title}
          </Text>
        </Box>
      )}
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {data?.map((value: any, index: number) => (
          <TouchableWithoutFeedback key={index}
            onPress={() =>
              goToAlbumScreen({
                album_id: value?.album_id,
                title: value?.album_name,
                image: value?.album_image
              })}>
            <Box
              style={{
                width: sizes._270sdp,
                height: sizes._330sdp,
                borderRadius: 5,
                overflow: 'hidden'
              }}
            >
              <Image
                source={value?.album_image ? { uri: `${URL_API}image/${value?.album_image}` } : LOGOAPP}
                style={{ flex: 1 }}
                contentFit="fill"
              />
              <Box
                justifyContent={'space-between'}
                flex={1}
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                marginY={5}
                marginX={5}
              >
                <Box>
                  <ColorChangingText
                    text={value?.description}
                    colors={[colors.white_gray, colors.white]}
                  />
                </Box>
                <Box>
                  <Text color={colors.white} fontSize={sizes._25sdp}>
                    {value?.album_name}
                  </Text>
                  <Text color={colors.white_gray}>
                    {value?.more_description}
                  </Text>
                </Box>
              </Box>
            </Box>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </Box>
  );
}

export default SliderOneRowBig;
