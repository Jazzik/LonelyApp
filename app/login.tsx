import React from "react";
import {
  Alert,
  TouchableOpacity,
  Text,
  Button,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Platform,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { websocketService } from "@/messenger/webSockets";
import * as AppleAuthentication from "expo-apple-authentication";
import { Formik } from "formik";
import * as Yup from "yup";
import i18n from "@/locales/i18n";
import { loginStyles } from "@/constants/Style";
console.log("login.tsx");
import { useSQLiteContext } from "expo-sqlite";
import { succesfullLogin } from "@/apiv1/authorization";
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t("wrong_email"))
    .required(i18n.t("required_field")),
  password: Yup.string()
    .min(6, i18n.t("password_min"))
    .required(i18n.t("required_field")),
});

export default function LoginScreen() {
  const db = useSQLiteContext();
  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      style={loginStyles.loginScrollView}
    >
      <SafeAreaView style={loginStyles.loginContainer}>
        <View>
        
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
             await succesfullLogin(values)
             websocketService.socketConnection(db)
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={loginStyles.loginBox}>
                <TextInput
                  placeholderTextColor="#000"
                  style={{
                    ...loginStyles.loginItem,
                    borderTopStartRadius: 20,
                    borderTopEndRadius: 20,
                  }}
                  autoComplete="email"
                  keyboardType="email-address"
                  inputMode="email"
                  placeholder={i18n.t("email")}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Text style={loginStyles.loginErrorText}>{errors.email}</Text>
                ) : null}
                <TextInput
                  placeholderTextColor="#000"
                  style={{ ...loginStyles.loginItem, borderTopWidth: 1 }}
                  secureTextEntry={true}
                  autoComplete="current-password"
                  placeholder={i18n.t("password")}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
               
                {errors.password && touched.password ? (
                  <Text style={loginStyles.loginErrorText}>
                    {errors.password}
                  </Text>
                ) : null}
                <View style={{ borderTopWidth: 1 }}>
                  <Button
                    onPress={() => handleSubmit()}
                    title={i18n.t("login")}
                  />
                </View>
              </View>
            )}
          </Formik>
          {Platform.OS === "ios" && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={30}
              style={loginStyles.loginButton}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  // Handle successful sign-in
                } catch (e) {
                  // Handle errors
                }
              }}
            />
          )}
           
        </View>
      </SafeAreaView>
    </Animated.ScrollView>
  );
}
