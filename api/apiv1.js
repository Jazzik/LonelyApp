import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "@/ip.json";
import { isExpired } from "@/utils/token";
import EventEmitter from "events";
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

      // Assuming the JWT is in response.data.token
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      flag = true;
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
export const eventEmitter = new EventEmitter();
export async function socketConnection() {
  const token = await AsyncStorage.getItem("accessToken");
  const auth = "Bearer " + token;

  const ws = new WebSocket(`ws://${ip}:8080/ws/messages`, [], { headers: {Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJLYWtveXRvTHV0aXlFbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE3MjM2NTEzOTYsImV4cCI6MTcyNDI1MTM5Nn0.nUV41uHyLDG_bg-TF1wLm7i70od-Z-5PQ9-CJzfTQx4'} });
 // const ws = new WebSocket(`ws://${ip}:8080/ws/messages`);

  ws.onopen = () => {
    console.log("WebSocket connected");
  };

  ws.onmessage = async (event) => {
    
    // console.log("emted")
    // await AsyncStorage.removeItem('messages');
    // console.log("Received message:", event.data);
    // Retrieve existing messages from AsyncStorage
    const storedMessages = await AsyncStorage.getItem("messages");
    // console.log("Stored messages: ", storedMessages);
    if (storedMessages) {
      let messagesArray = storedMessages;
      // console.log("array0", messagesArray);
      // Add new message to the array
      const newMessage = messagesArray + "," + event.data;
      // console.log("arrayafter", newMessage);

      // Store updated messages array back to AsyncStorage
      await AsyncStorage.setItem("messages", newMessage);
      eventEmitter.emit("message", "New_message");
    }
    else {
      // Store the first message to AsyncStorage
      await AsyncStorage.setItem("messages", event.data);
      eventEmitter.emit("message", "New_message");
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket closed");
  };
}
