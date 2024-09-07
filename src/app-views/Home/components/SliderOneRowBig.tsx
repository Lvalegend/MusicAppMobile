import React from 'react';
import { Text, Box } from "native-base";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import sizes from "@assets/styles/sizes";
import ColorChangingText from "@app-components/ColorChangeText/ColorChangeText";

interface SliderOneRowBigProps {
  title?: string;
  data: any;
}

const SliderOneRowBig: React.FC<SliderOneRowBigProps> = ({ title, data }) => {
  return (
    <Box>
      {title && (
        <Box marginBottom={'10px'}>
          <Text fontSize={sizes._26sdp} color={'black'} fontWeight={'bold'}>
            {title}
          </Text>
        </Box>
      )}
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((value: any, index: number) => (
          <TouchableOpacity key={index}>
            <Box
              style={{ width: sizes._270sdp, height: sizes._330sdp, borderRadius: 5, overflow: 'hidden' }}
            >
              <Image
                source={value.image}
                style={{ flex: 1 }}
                contentFit="cover"
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
                    text={value.status}
                    colors={['#A9A9A9', 'white']}
                  />
                </Box>
                <Box>
                  <Text color={'white'} fontSize={sizes._25sdp}>
                    {value.title}
                  </Text>
                  <Text color={'#A9A9A9'}>
                    {value.else}
                  </Text>
                </Box>
              </Box>
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Box>
  );
}

export default SliderOneRowBig;
