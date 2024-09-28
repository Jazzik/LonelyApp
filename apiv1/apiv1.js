import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "@/ip.json";
import { isExpired } from "@/utils/token";

import * as FileSystem from "expo-file-system";



export async function refreshTokenIfExpired() {
  const token = await AsyncStorage.getItem("accessToken");
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (isExpired(token)) {
    var flag;
    const req = await axios
      .post(`http://${ip}:8080/api/v1/tokens/refresh`, {
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





