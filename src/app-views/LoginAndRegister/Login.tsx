import ButtonBase from "@app-components/ButtonBase/ButtonBase";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { Box, Text, Checkbox } from "native-base";
import { memo, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Formik } from "formik";
import { Image } from 'expo-image';
import { loginSchema } from "./schema/validationForm";
import { useNavigationMainApp } from "@app-helper/navigateToScreens";

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { goToRegister, goToBottomContainer } = useNavigationMainApp()


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Formik
          initialValues={{
            email: email,
            password: password
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
                    value={email}
                    onChangeText={(text) => { setEmail(text); setFieldValue('email', text); }}
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
                    value={password}
                    secureTextEntry
                    onChangeText={(text) => { setPassword(text); setFieldValue('password', text); }}
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
                  <TouchableOpacity>
                    <Text fontSize={sizes._11sdp} color={'#1890FF'} fontWeight={'500'}>
                      Forgot your password?
                    </Text>
                  </TouchableOpacity>
                </Box>
                <Box>
                  <ButtonBase
                    title="Sign In"
                    onPress={goToBottomContainer}
                  />
                </Box>
                <Box style={{ ...styles_c.row_center, gap: 5 }}>
                  <Text fontSize={sizes._13sdp}>
                    You don't have an account?
                  </Text>
                  <TouchableOpacity onPress={goToRegister}>
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
