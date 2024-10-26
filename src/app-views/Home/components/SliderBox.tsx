import GradientComponent from "@app-components/LinearGradientComponent.tsx/GradientProps";
import { useNavigationComponentApp } from "@app-helper/navigateToScreens";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Box, Text } from "native-base";
import React from "react";
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

interface SliderBoxProps {
  title: string
  data: any
  routeData?: any
}
const SliderBox: React.FC<SliderBoxProps> = ({ title, data, routeData }) => {
  const { goToListTitleView } = useNavigationComponentApp()
  return (
    <Box>
      <TouchableOpacity onPress={() => goToListTitleView(routeData)}>
        <Box
          style={{
            ...styles_c.row_direction_align_center,
            gap: 10,
            marginBottom: 10
          }}>

          <Text
            fontSize={sizes._26sdp}
            color={colors.black}
            fontWeight={'bold'}
          >
            {title}
          </Text>

          <Entypo
            name={'chevron-thin-right'}
            size={sizes._18sdp}
            color={colors.black}
          />
        </Box>
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 10 }}
        style={{ width: '100%', flexDirection: 'row' }}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item: any, index: number) => (
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
        <TouchableOpacity style={{ alignSelf: 'center', padding: 10 }} onPress={() => goToListTitleView(routeData)}>
          <Box justifyContent={'center'} alignItems={'center'} style={{ gap: 10 }}>
            <Feather name="arrow-right-circle" size={sizes._30sdp} color={colors.black} />
            <Text color={colors.text_gray}>Xem tất cả</Text>
          </Box>
        </TouchableOpacity>
      </ScrollView>
    </Box>
  )
}
export default SliderBox