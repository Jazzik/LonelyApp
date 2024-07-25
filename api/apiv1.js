import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "@/ip.json";
import { isExpired } from "@/utils/token";
export async function getGroups(lang){
    refreshTokenIfExpired()
    const token = await AsyncStorage.getItem("accessToken");
    return await axios
      .get(`http://${ip}:8080/api/v1/tasks/groups/${lang}`, {
        headers: { Authorization: "Bearer " + token }})

}

export async function refreshTokenIfExpired(){
    const token = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    console.log(isExpired(token))
    if(isExpired(token)){
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
            
          }).then(data => {
            console.log('Success:', data.accessToken)})
        console.log(resp)
    }


}