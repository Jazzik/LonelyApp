import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ipManager } from "./ip";
import { isExpired } from "../utils/token";
import * as Notifications from 'expo-notifications';
export async function refreshTokenIfExpired() {
  const token = await AsyncStorage.getItem("accessToken");
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (isExpired(token)) {
    var flag;
    const req = await axios
      .post(`http://${ipManager.getIp()}:8080/api/v1/tokens/refresh`, {
        accessToken: token,
        refreshToken: refreshToken,
      })
      .then(async (response) => {
        console.log("Updated token");
        const newAccessToken = response.data.accessToken;
        flag = true;
        await AsyncStorage.setItem("accessToken", newAccessToken);
      })
      .catch((error) => {
        console.log(error);
        flag = false;
      });
    return flag;
  }
  return true;
}
export async function sendDeviceToken() {
  console.log('token')
  const deviceToken = (await Notifications.getDevicePushTokenAsync()).data;
  const token = await AsyncStorage.getItem("accessToken");
  if (!isExpired(token)) {
    console.log("Sending device token");
    const req = await axios.post(
      `http://${ipManager.getIp()}:8080/api/v1/tokens/device`,
      {
        deviceToken: deviceToken
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}




