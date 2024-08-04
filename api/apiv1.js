import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "@/ip.json";
import { isExpired } from "@/utils/token";
export async function getGroups(lang) {
  await refreshTokenIfExpired();
  const token = await AsyncStorage.getItem("accessToken");
  const req = await axios.get(`http://${ip}:8080/api/v1/tasks/groups/${lang}`, {
    headers: { Authorization: "Bearer " + token },
  });
  const dat = await req.data
  // console.log(dat);
  return dat
}

export async function getTasksByGroup(group) {
  await refreshTokenIfExpired();
  const token = await AsyncStorage.getItem("accessToken");
  const req =  await axios.get(`http://${ip}:8080/api/v1/tasks/group/${group}`, {
    headers: { Authorization: "Bearer " + token },
  });
  const dat = await req.data
  dat.sort((a, b) => a.number - b.number);
  console.log(dat[0]['title'])
  return dat

}
export async function getProgress(){
  if(await refreshTokenIfExpired()){
  const token = await AsyncStorage.getItem("accessToken");
  console.log(token)
  var req =  await axios.get(`http://${ip}:8080/api/v1/progress`, {
    headers: { Authorization: "Bearer " + token },
  })
    .catch((error)=>{console.log(error," getProgress")});
  console.log("requested")
  const resp = await req.data
  return resp
}
}
export async function refreshTokenIfExpired() {
  const token = await AsyncStorage.getItem("accessToken");
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (isExpired(token)) {
   var flag  
   const req = await axios
      .post(`http://${ip}:8080/api/v1/tokens/refresh`, {
        accessToken: token,
        refreshToken: refreshToken,
      }).then(async (response)=>{
        console.log("Updated token")
        const newAccessToken = response.data.accessToken;
        flag = true
        await AsyncStorage.setItem("accessToken", newAccessToken);})
        .catch((error)=>{
          console.log(error)
          flag = false
        })
    return flag
    
  }
  return true
}
