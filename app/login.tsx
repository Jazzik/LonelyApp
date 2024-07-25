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
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Link, Stack, router } from "expo-router";
import * as AppleAuthentication from "expo-apple-authentication";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/i18n";
import { ip } from "@/ip.json";
import { Colors } from "@/constants/Colors";

console.log("login.tsx");

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t("wrong_email"))
    .required(i18n.t("required_field")),
  password: Yup.string()
    .min(6, i18n.t("password_min"))
    .required(i18n.t("required_field")),
});

export default function LoginScreen() {
  const translationY = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -scrollY.value }],
    };
  });

  interface LoginFormValues {
    email: string;
    password: string;
  }

  const succesfullLogin = async (values: LoginFormValues) => {
    axios
      .post(`http://${ip}:8080/api/v1/auth/login`, values)
      .then(async (response) => {
        console.log("succesfull login");
        console.log(response.data);
        console.log("accessToken: ", response.data.accessToken);
        console.log("refreshToken: ", response.data.refreshToken);

        // Assuming the JWT is in response.data.token
        await AsyncStorage.setItem("accessToken", response.data.accessToken);
        await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
        router.replace("/home");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          console.log("redirect to register");
          succesfullRegister(values);
        }

        if (error.response.status === 401) {
          console.log("incorrect email or password");
          Alert.alert(
            i18n.t("Login_failed"),
            i18n.t("Incorrect_email_or_password")
          );
        }
      });
  };
  const succesfullRegister = (values: LoginFormValues) => {
    axios
      .post(`http://${ip}:8080/api/v1/auth/register`, values)
      .then((response) => {
        console.log("succesfull register");
        console.log(response.data);
        succesfullLogin(values);
      })
      .catch((error) => {
        console.log("error login");

        console.error(error);
      });
  };

  return (
    <Animated.ScrollView scrollEventThrottle={16} style={styles.scrollView}>
      <SafeAreaView style={styles.container}>
        <View>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => succesfullLogin(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.loginBox}>
                <TextInput
                  placeholderTextColor="#000"
                  style={{
                    ...styles.loginItem,
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
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
                <TextInput
                  placeholderTextColor="#000"
                  style={{ ...styles.loginItem, borderTopWidth: 1 }}
                  secureTextEntry={true}
                  autoComplete="current-password"
                  placeholder={i18n.t("password")}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
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

          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={30}
            style={styles.button}
            onPress={async () => {
              try {
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });
                // signed in
              } catch (e) {
                // handle errors
              }
            }}
          />
        </View>
      </SafeAreaView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "60%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.dark.upper_background,
  },
  loginBox: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    width: 300,
    borderRadius: 20,
  },
  loginItem: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 24,
    color: "#000",
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  button: {
    width: 300,
    height: 44,
    marginTop: 20,
  },
  errorText: {
    color: "red",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
