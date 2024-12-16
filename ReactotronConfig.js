import Reactotron from 'reactotron-react-native';

Reactotron
  .configure() // sets up connection to reactotron
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!


export default Reactotron;
