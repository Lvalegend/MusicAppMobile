import ButtonBase from "@app-components/ButtonBase/ButtonBase";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { Box, Text, Checkbox } from "native-base";
import { Fragment, memo, useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Formik } from "formik";
import { Image } from 'expo-image';
import { loginSchema } from "./schema/validationForm";
import { useNavigationMainApp, useNavigationServices } from "@app-helper/navigateToScreens";
import ServiceStorage, { KEY_STORAGE } from "@app-services/service-storage";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from "@app-components/AppLoading/AppLoading";
import { loginUser } from "@redux/features/loginSlice";

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const [isChecked, setChecked] = useState(false);
  const { goToRegister, goToBottomContainer } = useNavigationMainApp()
  const {replaceScreen} = useNavigationServices()
  const dispatch = useDispatch();
  const { loading, error, response } = useSelector((state: any) => state.login);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (response?.success === true) {
      (async () => {
        console.log('token', response?.token);
        await ServiceStorage.setString(KEY_STORAGE.USER_TOKEN, response?.token)
        await ServiceStorage.setObject
          (
            KEY_STORAGE.ACCOUNT_DATA,
            {
              user_name: response?.user_name,
              user_avatar: response?.user_avatar,
              role: response?.role,
              email: response?.email,
              password: response?.password
            }
          )
          // await goToBottomContainer({screenName: 'Thư viện'})
          await replaceScreen('BottomContainer')
      })()
    }
  }, [response])



  const handleTextChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = () => {
    dispatch(loginUser(formData)); // Gửi yêu cầu đăng nhập
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            // Xử lý submit ở đây
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <Box justifyContent={'center'} alignItems={'center'} flex={1} style={{ marginHorizontal: 15, gap: 12 }}>
              <Image
                source={require('@assets/images/logoLvalegend.png')}
                style={{ width: sizes._80sdp, height: sizes._82sdp }}
                contentFit="cover"
                transition={1000}
              />
              <Box>
                <Text fontSize={sizes._15sdp} color={'#25123E'}>
                  Listen To Music
                </Text>
              </Box>
              <Box>
                <Text fontSize={sizes._20sdp}>
                  Sign in to your account
                </Text>
              </Box>
              <Box w={'90%'} style={{ gap: 20 }}>
                <Box style={{ gap: 2 }}>
                  <Text>Email</Text>
                  <TextInput
                    style={[styles.text_input_style, { borderColor: errors.email ? 'red' : undefined, borderWidth: errors.email ? 1 : 0 }]}
                    placeholder="Enter Email"
                    value={formData.email}
                    onChangeText={(text) => { handleTextChange('email', text); setFieldValue('email', text); }}
                    onBlur={() => handleBlur('email')}
                  />
                  {errors.email ? (
                    <Box marginTop={2}>
                      <Text color={'#FF0707'} fontSize={sizes._10sdp}>
                        {errors.email}
                      </Text>
                    </Box>
                  ) : null}
                </Box>
                <Box style={{ gap: 2 }}>
                  <Text>Password</Text>
                  <TextInput
                    style={[styles.text_input_style, { borderColor: errors.password ? 'red' : undefined, borderWidth: errors.password ? 1 : 0 }]}
                    placeholder="Enter Password"
                    value={formData.password}
                    secureTextEntry
                    onChangeText={(text) => { handleTextChange('password', text); setFieldValue('password', text); }}
                    onBlur={() => handleBlur('password')}
                  />
                  {errors.password && (
                    <Box marginTop={2}>
                      <Text color={'#FF0707'} fontSize={sizes._10sdp}>
                        {errors.password}
                      </Text>
                    </Box>
                  )}
                </Box>
                <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Box flexDirection={'row'} alignItems={'center'}>
                    <Checkbox
                      shadow={2}
                      value="test"
                      accessibilityLabel="This is a dummy checkbox"
                      isChecked={isChecked}
                      onChange={() => setChecked(!isChecked)}
                    >
                      <Box></Box>
                    </Checkbox>
                    <TouchableWithoutFeedback onPress={() => setChecked(!isChecked)}>
                      <Text fontSize="11">
                        Remember me
                      </Text>
                    </TouchableWithoutFeedback>
                  </Box>
                  <TouchableOpacity onPress={() => {}}>
                    <Text fontSize={sizes._11sdp} color={'#1890FF'} fontWeight={'500'}>
                      Forgot your password?
                    </Text>
                  </TouchableOpacity>
                </Box>
                <Box>
                  <ButtonBase
                    title="Sign In"
                    onPress={handleSubmitForm}
                  />
                </Box>
                <Box style={{ ...styles_c.row_center, gap: 5 }}>
                  <Text fontSize={sizes._13sdp}>
                    You don't have an account?
                  </Text>
                  <TouchableOpacity onPress={() => goToRegister()}>
                    <Text fontSize={sizes._13sdp} color={'#1890FF'} fontWeight={'bold'}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>
          )}
        </Formik>
      </ScrollView>
      <Fragment>
        {loading && <AppLoading loading={loading} />}
      </Fragment>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text_input_style: {
    width: '100%',
    padding: 9,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
});

export default memo(Login);
