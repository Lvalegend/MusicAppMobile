import URL_API from "@app-helper/urlAPI";
import { LOGOAPP } from "@app-uikits/image";
import responsive_screen from "@assets/styles/responsive";
import sizes from "@assets/styles/sizes";
import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, StyleSheet, Platform } from 'react-native';
import { useSelector } from "react-redux";

interface CircleImageRotatingProps {
  
 }
const CircleImageRotating: React.FC<CircleImageRotatingProps> = () => {
  const {listOptionTabDataCurrent}= useSelector((state:any) => state.songScreen)
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bắt đầu hiệu ứng xoay
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 10000, // Thời gian cho một vòng quay (millisecond)
        useNativeDriver: true, // Tăng hiệu suất với useNativeDriver
      })
    ).start();
  }, [spinValue]);

  // Biến đổi giá trị spin thành giá trị xoay
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View>
      <Animated.Image
        source={listOptionTabDataCurrent[0]?.data[0]?.song_image ? {uri: `${URL_API}image/${listOptionTabDataCurrent[0]?.data[0]?.song_image}`} : LOGOAPP}
        style={[styles.image, { transform: [{ rotate: spin }] }]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: responsive_screen.h_bigger_767px(sizes._350sdp , sizes._300sdp),
    height: responsive_screen.h_bigger_767px(sizes._350sdp , sizes._300sdp),
    borderRadius: 9999,
    resizeMode: 'cover'
  },
});
export default CircleImageRotating