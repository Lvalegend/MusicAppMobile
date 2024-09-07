import { Box, Text } from "native-base"
import React from "react"
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import GradientComponent from "@app-components/LinearGradientComponent.tsx/GradientProps";
import Feather from '@expo/vector-icons/Feather';

interface SliderBoxProps {
  title: string
  data: any
}
const SliderBox: React.FC<SliderBoxProps> = ({ title, data }) => {

  return (
    <Box>
      <Box
        style={{
          ...styles_c.row_direction_align_center,
          gap: 10,
          marginBottom: 10
        }}>
        <Text
          fontSize={sizes._26sdp}
          color={'black'}
          fontWeight={'bold'}
        >
          {title}
        </Text>
        <Entypo
          name={'chevron-thin-right'}
          size={sizes._18sdp}
          color={'black'}
        />
      </Box>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 10 }}
        style={{ width: '100%', flexDirection: 'row' }}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item:any, index:number) => (
          <TouchableWithoutFeedback key={index} style={{ flex: 1 }} >
            <GradientComponent
              colors={item.backgroundColor}
              style={{
                width: sizes._170sdp,
                height: sizes._85sdp,
                borderRadius: 8
              }}>
              <Box
                style={{
                  gap: 10,
                  padding: 10,
                  justifyContent: 'center'
                }}>
                <FontAwesome name="music" size={sizes._18sdp} color={'white'} />
                <Text color={'white'} fontWeight={'bold'}>{item.name}</Text>
              </Box>
            </GradientComponent>
          </TouchableWithoutFeedback>
        ))}
        <TouchableOpacity style={{ alignSelf: 'center', padding: 10 }}>
          <Box justifyContent={'center'} alignItems={'center'} style={{ gap: 10 }}>
            <Feather name="arrow-right-circle" size={sizes._30sdp} color={'black'} />
            <Text color={'#7C7C7C'}>Xem tất cả</Text>
          </Box>
        </TouchableOpacity>
      </ScrollView>
    </Box>
  )
}
export default SliderBox