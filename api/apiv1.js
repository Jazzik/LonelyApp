import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "@/ip.json";
import { isExpired } from "@/utils/token";
export async function getGroups(lang) {
  await refreshTokenIfExpired();
  const token = await AsyncStorage.getItem("accessToken");
  return await axios.get(`http://${ip}:8080/api/v1/tasks/groups/${lang}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

export async function getTasksByGroup(group) {
  await refreshTokenIfExpired();
  const token = await AsyncStorage.getItem("accessToken");
  const req =  await axios.get(`http://${ip}:8080/api/v1/tasks/group/${group}`, {
    headers: { Authorization: "Bearer " + token },
  });
  const dat = await req.data
  dat.sort((a, b) => a.number - b.number);
  return dat

}
export async function refreshTokenIfExpired() {
  const token = await AsyncStorage.getItem("accessToken");
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (isExpired(token)) {
    console.log("refreshtoken: ", refreshToken);

    await axios
      .post(`http://${ip}:8080/api/v1/tokens/refresh`, {
        accessToken: token,
        refreshToken: refreshToken,
      })
      .then(async (response) => {
        const newAccessToken = response.data.accessToken;
        await AsyncStorage.setItem("accessToken", newAccessToken);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
