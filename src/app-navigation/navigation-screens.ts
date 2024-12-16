
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
  AlbumScreen: {
    name: 'AlbumScreen',
    component: require('@app-views/Album/AlbumScreen')
      .default,
  },
  ViewAll: {
    name: 'ViewAll',
    component: require('@app-views/ViewAll/ViewAll')
      .default,
  },
  ViewAccountPackage: {
    name: 'ViewAccountPackage',
    component: require('@app-views/ViewAll/ViewAccountPackage')
      .default,
  },
  ViewPlaylist: {
    name: 'ViewPlaylist',
    component: require('@app-views/ViewAll/ViewPlaylist')
      .default,
  },
  GridView: {
    name: 'GridView',
    component: require('@app-views/ViewAll/GridView')
      .default,
  },
  ListTitleView: {
    name: 'ListTitleView',
    component: require('@app-views/ViewAll/ListTitleView')
      .default,
  },
  EditProfile: {
    name: 'EditProfile',
    component: require('@app-views/Personal/EditProfile')
      .default,
  },
  FavouriteScreen: {
    name: 'FavouriteScreen',
    component: require('@app-views/Favourite/FavouriteScreen')
      .default,
  },
  SingerScreen: {
    name: 'SingerScreen',
    component: require('@app-views/Singer/SingerScreen')
      .default,
  },
  SpeechToText: {
    name: 'SpeechToText',
    component: require('@app-views/Voice/SpeechToText')
      .default,
  },
}
