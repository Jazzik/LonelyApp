import AsyncStorage from "@react-native-async-storage/async-storage";
import {refreshTokenIfExpired} from "./tokens"
import axios from "axios";
import { ip } from "../ip.json";

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