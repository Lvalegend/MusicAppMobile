import { useNavigation } from '@react-navigation/native';
import { useOnEventCallback } from './hooks';



export const useNavigationMainApp = () => {
  const navigation: any = useNavigation();

  const goToRegister = useOnEventCallback(() => {
    navigation.navigate('Register');
  });

  const goToLogin = useOnEventCallback(() => {
    navigation.navigate('Login');
  });

  const goToMainSearch = useOnEventCallback(() => {
    navigation.navigate('MainSearch');
  });

  const goToMainHome = useOnEventCallback(() => {
    navigation.navigate('MainHome');
  });

  const goToMainLibrary = useOnEventCallback(() => {
    navigation.navigate('MainLibrary');
  });

  const goToMainPersonal = useOnEventCallback(() => {
    navigation.navigate('MainPersonal');
  });

  const goToMainRanking = useOnEventCallback(() => {
    navigation.navigate('MainRanking');
  });

  const goToSplash = useOnEventCallback(() => {
    navigation.navigate('Splash');
  });
  const goToBottomContainer = useOnEventCallback(() => {
    navigation.navigate('BottomContainer');
  })

  return {
    goToRegister,
    goToLogin,
    goToMainSearch,
    goToMainHome,
    goToMainLibrary,
    goToMainPersonal,
    goToMainRanking,
    goToSplash,
    goToBottomContainer
  };
};

export const useNavigationComponentApp = () => {
  const navigation: any = useNavigation();

  const goToSongScreen = useOnEventCallback(() => {
    navigation.navigate('SongScreen');
  });
  return {
    goToSongScreen
  }
}

export const useNavigationServices = () => {
  const navigation: any = useNavigation();
  
  const goToBack = useOnEventCallback(() => {
    navigation.goBack();
  });
  return {
    goToBack
  }
}

