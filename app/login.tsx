import React, { useState } from "react";
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
  Modal,
  Image,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
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
import {ipManager} from "../apiv1/ip";
import {sendDeviceToken} from "../apiv1/tokens"
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
  const [modalVisible, setModalVisible] = useState(false);
  const [serverAdress,setServerAdress] = useState("");
  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      style={loginStyles.loginScrollView}
    >
      <TouchableOpacity
            style={{
              position: "absolute",
              top: "10%",
              left: "90%",
              width: 40,
              height: 40,
              alignItems: "center",
            }}
            onPress={() => setModalVisible(true)}
          >
          <FontAwesome name="cog" size={24} color={Colors.light.text}/>

          </TouchableOpacity>
      <SafeAreaView style={loginStyles.loginContainer}>


          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
             console.log(await succesfullLogin(values))
             await sendDeviceToken()
             websocketService.socketConnection(db)
            }}>
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <View
                style={{
                  width: "80%",
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  borderBlockColor: "black",
                  padding: 20,
                }}
              >
                <TextInput
                  style={{ ...loginStyles.loginItem}}
                  placeholder="Enter the server adress"
                  onChangeText={setServerAdress}
                  value={serverAdress}

                />
              <TouchableOpacity
                  style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: "#007bff",
                    borderRadius: 5,
                  }}
                    onPress={() => {
                      ipManager.setIp(serverAdress)
                      if(serverAdress!=""){
                        setModalVisible(!modalVisible)
                      }
                      console.log(ipManager.getIp())
                      
                    }}
                  >
    
                  <Text style={{ color: "#fff", textAlign: "center" }}>
                    Set IP
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: "#007bff",
                    borderRadius: 5,
                  }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={{ color: "#fff", textAlign: "center" }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>


      </SafeAreaView>
  </Animated.ScrollView>
  );
}
