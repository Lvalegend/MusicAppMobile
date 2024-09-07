export const ListStackScreens: Record<string, any> = {
  MainHome: {
    name: 'MainHome',
    component: require('@app-views/Home/MainHome')
      .default,
  },
  MainSearch: {
    name: 'MainSearch',
    component: require('@app-views/Search/MainSearch')
      .default,
  },
  MainLibrary: {
    name: 'MainLibrary',
    component: require('@app-views/Library/MainLibrary')
      .default,
  },
  MainPersonal: {
    name: 'MainPersonal',
    component: require('@app-views/Personal/MainPersonal')
      .default,
  },
  MainRanking: {
    name: 'MainRanking',
    component: require('@app-views/Ranking/MainRanking')
      .default,
  },
  Splash: {
    name: 'Splash',
    component: require('@app-views/Splash/Splash')
      .default,
  },
  Login: {
    name: 'Login',
    component: require('@app-views/LoginAndRegister/Login')
      .default,
  },
  Register: {
    name: 'Register',
    component: require('@app-views/LoginAndRegister/Register')
      .default,
  },
  BottomContainer: {
    name: 'BottomContainer',
    component: require('@app-navigation/BottomTabs/BottomContainer')
      .default,
  },
  SongScreen: {
    name: 'SongScreen',
    component: require('@app-views/Song/SongScreen')
      .default,
  },
}
