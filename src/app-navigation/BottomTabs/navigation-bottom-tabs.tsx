import { useOnEventCallback } from '@app-helper/hooks';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { find } from 'lodash';
import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import BottomTab from './BottomTab';
import styles from './NavigationBottom.styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Box } from 'native-base';
import { FontAwesome6, MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import sizes from '@assets/styles/sizes';

const Tab = createBottomTabNavigator();

EStyleSheet.build({
  $mainColor: '#3498db', // Define your main color here
  // Define other variables here if needed
  $brandSecondary: 'black'
});

enum MainTab {
  Home = 'Trang chủ',
  Ranking = 'Xếp hạng',
  Libary = 'Thư viện',
  Search = 'Tìm kiếm',
  Personal = 'Cá nhân',
}

const Tabs = [
  {
    name: MainTab.Libary,
    screen: require('@app-views/Library/MainLibrary')
      .default,
    icon: (color:any) => <MaterialIcons name='library-music' color={color} size={sizes._24sdp} />
  },
  {
    name: MainTab.Search,
    screen: require('@app-views/Search/MainSearch')
      .default,
    icon: (color:any) => <AntDesign name='search1' color={color} size={sizes._24sdp} />
  },
  {
    name: MainTab.Home,
    screen: require('@app-views/Home/MainHome')
      .default,
    icon: (color:any) => <Entypo name='home' color={color} size={sizes._24sdp} />
  },
  {
    name: MainTab.Ranking,
    screen: require('@app-views/Ranking/MainRanking')
      .default,
    icon: (color:any) => <FontAwesome6 name='ranking-star' color={color} size={sizes._24sdp} />
  },
  {
    name: MainTab.Personal,
    screen: require('@app-views/Personal/MainPersonal')
      .default,
    icon: (color:any) => <AntDesign name='user' color={color} size={sizes._24sdp} />
  },
];
type Props = {
  route: any;
  navigation: any;
};
const BottomTabs: React.FC<Props> = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const initialScreenName = route?.params?.screenName || MainTab.Home;

  const CustomTabar = useOnEventCallback((props: BottomTabBarProps) => {
    const { descriptors, navigation, state } = props;
    return (
      <Box
        style={{ borderRadius: 50 }}
        height={Platform.OS === 'ios' ? '85px' : '70px'}
        shadow={9}
        borderTopLeftRadius={'16px'}
        borderTopRightRadius={'16px'}>
        <Box style={styles.container}>
          <SafeAreaView style={styles.viewTab}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const screen_name = route.name as MainTab;
              const tab = find(Tabs, ['name', screen_name]);

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };
              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
              const color = isFocused
                ? EStyleSheet.value('$mainColor')
                : 'black';

              return (
                <BottomTab
                  key={route.key}
                  icon={tab?.icon(color)}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  isActive={isFocused}
                  onLongPress={onLongPress}
                  onPress={onPress}
                  index={index}
                  name={route.name}
                />
              );
            })}
          </SafeAreaView>
        </Box>
      </Box>
    );
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialScreenName} // Sử dụng tên route ban đầu được đặt động
      tabBar={CustomTabar}>
      {Tabs.map(screen => {
        return (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.screen}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabs;
