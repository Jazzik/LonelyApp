import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "@/ip.json";
import { isExpired } from "@/utils/token";
import { createIconSetFromFontello } from "@expo/vector-icons";
import { router } from "expo-router";


export async function getGroups(lang) {
  await refreshTokenIfExpired();
  const token = await AsyncStorage.getItem("accessToken");
  const req = await axios.get(`http://${ip}:8080/api/v1/tasks/groups/${lang}`, {
    headers: { Authorization: "Bearer " + token },
  });
  const dat = await req.data;
  return dat;
}

export async function getTasksByGroup(group) {
  await refreshTokenIfExpired();
  const token = await AsyncStorage.getItem("accessToken");
  const req = await axios.get(`http://${ip}:8080/api/v1/tasks/group/${group}`, {
    headers: { Authorization: "Bearer " + token },
  });
  const dat = await req.data;
  dat.sort((a, b) => a.number - b.number);
  return dat;
}
export async function getProgress() {
  if (await refreshTokenIfExpired()) {
    const token = await AsyncStorage.getItem("accessToken");
    var req = await axios
      .get(`http://${ip}:8080/api/v1/progress`, {
        headers: { Authorization: "Bearer " + token },
      })
      .catch((error) => {
        console.log(error, " getProgress");
      });
    const resp = await req.data;
    return resp;
  }
}

export async function getPhoto() {
  // if(await refreshTokenIfExpired()){
  // const token = await AsyncStorage.getItem("accessToken");
  // var req =  await axios.get(`http://${ip}:8080/api/v1/user/photo`, {
  //   headers: { Authorization: "Bearer " + token },
  // })
  //   .catch((error)=>{console.log(error," getPhoto")});
  // const resp = await req.data

  // if (resp.photo){
  //   return true
  // }
  // return false
  // }

  return true;
}

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

export const succesfullLogin = async (values) => {
  let flag = false;
  await axios
    .post(`http://${ip}:8080/api/v1/auth/login`, values)
    .then(async (response) => {
      console.log("succesfull login");
      console.log("accessToken: ", response.data.accessToken);
      console.log("refreshToken: ", response.data.refreshToken);
      console.log("userId: ", response.data.userid);

      // Assuming the JWT is in response.data.token
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      await AsyncStorage.setItem("userId", String(response.data.userid));
      flag = true;
      router.replace("/home");
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        console.log("redirect to register");
        succesfullRegister(values);
      }

      if (error.response && error.response.status === 401) {
        console.log("incorrect email or password");
        Alert.alert(
          // get this device language

          i18n.t("Login_failed"),
          i18n.t("Incorrect_email_or_password")
        );
      }
    });
  return flag;
};
export const succesfullRegister = (values) => {
  axios
    .post(`http://${ip}:8080/api/v1/auth/register`, values)
    .then((response) => {
      
      succesfullLogin(values);
      
    })
    .catch((error) => {
      console.log("error login");

      console.error(error);
    });
};
export async function getChats(){
  await refreshTokenIfExpired();
  const token = await AsyncStorage.getItem("accessToken");
  const req = await axios.get(`http://${ip}:8080/api/v1/account/chats`, {
    headers: { Authorization: "Bearer " + token },
  });
  const dat = await req.data;
  return dat;
}

export async function uploadAvatar(photo) {
  await refreshTokenIfExpired(); // Ensure this function is implemented
  const token = await AsyncStorage.getItem("accessToken");

  const formData = new FormData();
  formData.append('image', {
    uri: photo.uri,
    type: photo.type || 'image/jpeg', // Default to JPEG if type is missing
    name: photo.name || 'avatar.jpg', // Default file name if not provided
  });

  try {
    const req = await axios.post(`http://${ip}:8080/api/v1/photos/avatar`, formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = await req.data;
    return data;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
}