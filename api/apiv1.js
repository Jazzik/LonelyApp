import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "@/ip.json";
import { isExpired } from "@/utils/token";
export async function getGroups(lang){
    await refreshTokenIfExpired()
    const token = await AsyncStorage.getItem("accessToken");
    return await axios
      .get(`http://${ip}:8080/api/v1/tasks/groups/${lang}`, {
        headers: { Authorization: "Bearer " + token }})

}

export async function refreshTokenIfExpired(){
    const token = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if(isExpired(token)){
    console.log(refreshToken)

        const data = {
            accessToken: token,
            refreshToken: refreshToken 
          };

         resp = await fetch(`http://${ip}:8080/api/v1/tokens/refresh`, {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
              },
            body: JSON.stringify(data) // Convert the data to a JSON string
            
          })
          const responseData = await resp.json(); // Await the promise here
          const newAccessToken = responseData.accessToken;
          console.log(responseData.accessToken)
          await AsyncStorage.setItem("accessToken", newAccessToken);


    }


}