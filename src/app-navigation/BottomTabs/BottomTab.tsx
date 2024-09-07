import { Text } from 'native-base';
import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, View, Platform } from 'react-native';
import styles from './NavigationBottom.styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles_c from '@assets/styles/styles_c';
import sizes from '@assets/styles/sizes';
interface TabProps {
  isActive?: boolean;
  accessibilityLabel?: string;
  icon?: any;
  onPress?: () => void;
  onLongPress?: () => void;
  index?: any;
  name?: string;
}

EStyleSheet.build({
  $mainColor: '#9B4DE0', // Define your main color here
  // Define other variables here if needed
  $brandSecondary: 'black'
});

const BottomTab: React.FC<TabProps> = ({
  isActive,
  accessibilityLabel,
  icon,
  onLongPress,
  onPress,
  index,
  name,
}) => {
  return (
    <TouchableWithoutFeedback
      accessibilityRole="button"
      accessibilityState={isActive ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}>
      <View
        style={{
          ...styles.btnBottom,
        }}>
        <View
          style={{
            height: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isActive && (
            <Text
              color={EStyleSheet.value('$mainColor')}
              style={{ fontSize: 20 }}>
              •
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 9 }}>{icon}</View>
        <View style={{ marginBottom: 8 }}>
          <Text
            color={isActive ? EStyleSheet.value('$mainColor') : 'black'}
            style={{ fontSize: sizes._12sdp, fontWeight: '500' }}>
            {name}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BottomTab;
