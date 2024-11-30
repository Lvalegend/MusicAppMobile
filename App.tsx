import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/app-navigation/navigation-container';
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@app-components/CustomToast/ToatConfig';
import { SafeAreaView } from 'react-native';
import { APIProvider } from 'src/app-context/ContextProvider';
import './ReactotronConfig';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs(); 

export default function App() {
  return (
    <Provider store={store}>
      <APIProvider>
        <NativeBaseProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <AppNavigator />
              <Toast config={toastConfig} />
          </GestureHandlerRootView>
        </NativeBaseProvider>
      </APIProvider>
    </Provider>
  );
}
