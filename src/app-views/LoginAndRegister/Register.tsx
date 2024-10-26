import ButtonBase from "@app-components/ButtonBase/ButtonBase";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { Box, Text, Checkbox } from "native-base";
import { Fragment, memo, useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Formik } from "formik";
import { Image } from 'expo-image';
import { registerSchema } from "./schema/validationForm";
import { useNavigationMainApp } from "@app-helper/navigateToScreens";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@redux/features/registerSlice";
import AppLoading from "@app-components/AppLoading/AppLoading";
import ServiceStorage, { KEY_STORAGE } from "@app-services/service-storage";

interface RegisterProps { }

const Register: React.FC<RegisterProps> = () => {
  const {goToLogin} = useNavigationMainApp()
  const dispatch = useDispatch();
  const { loading, error, response } = useSelector((state: any) => state.register);
  
  const [formData, setFormData] = useState({
    user_name: '',
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
              role: response?.role
            }
          )
      })()
    }
  }, [response])

  const handleTextChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = () => {
    dispatch(registerUser(formData)); // Gửi yêu cầu đăng ký
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginVertical: 20 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={registerSchema}
          onSubmit={(values) => {

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
                <Text fontSize={sizes._12sdp} color={'#25123E'}>
                  Welcome to Lvalegend Music
                </Text>
              </Box>
              <Box>
                <Text fontSize={sizes._20sdp}>
                  Create your account
                </Text>
              </Box>
              <Box w={'90%'} style={{ gap: 10 }}>
                <Box style={{ gap: 2 }}>
                  <Text color={errors.name ? 'red' : 'black'}>Name</Text>
                  <TextInput
                    style={[styles.text_input_style, { borderColor: errors.name ? 'red' : undefined, borderWidth: errors.name ? 1 : 0 }]}
                    placeholder="Enter Name"
                    value={formData.user_name}
                    onChangeText={(text) => { handleTextChange('user_name', text); setFieldValue('name', text); }}
                    onBlur={() => handleBlur('name')}
                  />
                  {errors.name && (
                    <Box marginTop={2}>
                      <Text color={'#FF0707'} fontSize={sizes._10sdp}>
                        {errors.name}
                      </Text>
                    </Box>
                  )}
                </Box>
                <Box style={{ gap: 2 }}>
                  <Text>Email</Text>
                  <TextInput
                    style={[styles.text_input_style, { borderColor: errors.email ? 'red' : undefined, borderWidth: errors.email ? 1 : 0 }]}
                    placeholder="Enter Email"
                    value={formData.email}
                    onChangeText={(text) => { handleTextChange('email', text); setFieldValue('email', text); }}
                    onBlur={() => handleBlur('email')}
                  />
                  {errors.email && (
                    <Box marginTop={2}>
                      <Text color={'#FF0707'} fontSize={sizes._10sdp}>
                        {errors.email}
                      </Text>
                    </Box>
                  )}
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
                <Box style={{ gap: 22, marginTop: 5 }}>
                  <Box>
                    <ButtonBase
                      title="Sign Up"
                      onPress={handleSubmitForm}
                    />
                  </Box>
                  <Box style={{ ...styles_c.row_center, gap: 5 }}>
                    <Text fontSize={sizes._13sdp}>
                      Do you have an account?
                    </Text>
                    <TouchableOpacity onPress={() => goToLogin()}>
                      <Text fontSize={sizes._13sdp} color={'#1890FF'} fontWeight={'bold'}>
                        Sign In
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Formik>
      </ScrollView>
      <Fragment>
         {loading && <AppLoading loading={loading}/>}
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

export default memo(Register);
