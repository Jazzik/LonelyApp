import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { ipManager } from "./ip";
//import * as Notifications from 'expo-notifications';
export const succesfullLogin = async (values) => {
    try{
      const response = await axios.post(`http://${ipManager.getIp()}:8080/api/v1/auth/login`, values)
        console.log("succesfull login");
        console.log("accessToken: ", response.data.accessToken);
        console.log("refreshToken: ", response.data.refreshToken);
        console.log("userId: ", response.data.userid);
  
        // Assuming the JWT is in response.data.token
        await AsyncStorage.setItem("accessToken", response.data.accessToken);
        await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
        await AsyncStorage.setItem("userId", String(response.data.userid));
        router.replace("/home");
        return true
    }
    catch(error){
      console.log(error);
      if (error.response && error.response.status === 404) {
        console.log("redirect to register");
        succesfullRegister(values);
      }

      if (error.response && error.response.status === 401) {
        console.log("incorrect email or password");
        Alert.alert(
          i18n.t("Login_failed"),
          i18n.t("Incorrect_email_or_password")
        );
      }
      return false
    }
    }
    // axios
    //   .post(`http://${ipManager.getIp()}:8080/api/v1/auth/login`, values)
    //   .then(async (response) => {
    //     console.log("succesfull login");
    //     console.log("accessToken: ", response.data.accessToken);
    //     console.log("refreshToken: ", response.data.refreshToken);
    //     console.log("userId: ", response.data.userid);
  
    //     // Assuming the JWT is in response.data.token
    //     await AsyncStorage.setItem("accessToken", response.data.accessToken);
    //     await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
    //     await AsyncStorage.setItem("userId", String(response.data.userid));
    //     router.replace("/home");
    //     return true
    // })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.response && error.response.status === 404) {
    //       console.log("redirect to register");
    //       succesfullRegister(values);
    //     }
  
    //     if (error.response && error.response.status === 401) {
    //       console.log("incorrect email or password");
    //       Alert.alert(
    //         // get this device language
  
    //         i18n.t("Login_failed"),
    //         i18n.t("Incorrect_email_or_password")
    //       );
    //     }
    //   });
    // return flag;
  
  export const succesfullRegister = (values) => {
    axios
      .post(`http://${ipManager.getIp()}:8080/api/v1/auth/register`, values)
      .then((response) => {
        succesfullLogin(values);
      })
      .catch((error) => {
        console.log("error login");
  
        console.error(error);
      });
  };