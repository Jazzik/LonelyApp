import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import { isExpired } from "@/utils/token";
import { refreshTokenIfExpired } from "@/apiv1/tokens";
import { socketConnection } from "@/messenger/webSockets";
import LottieView from "lottie-react-native";
import { useSQLiteContext } from "expo-sqlite";
import { createTable } from "@/messenger/sql";
const checkLoginStatus = async () => {
  console.log("check");
  const token = await AsyncStorage.getItem("accessToken");
  if (token && !isExpired(token) ) {
    console.log("Succesfuly authentified");
    return "/home";
  } else  if(!token) {
    console.log("token not found");
    return "/login";
  }else{
    console.log(await refreshTokenIfExpired())
    if(!await refreshTokenIfExpired()){
      console.log("Wasn't able to refresh returning to login")
      return "/login";
    }
    else{
      console.log("Succesfuly authentified");
      return "/home"}
  }
};

export default function HomeScreen() {
  const db = useSQLiteContext();
  socketConnection(db);
  createTable(db);
  const [url, setUrl] = useState<"/home" | "/login" | null>(null);
  useEffect(() => {
    const fetchUrl = async () => {
      
      const url = await checkLoginStatus();
      setUrl(url);
    };
    fetchUrl();
  }, []);

  if (!url) {
    return (
      <LottieView
                  source={require("@/assets/Animations/owl2.json")}
                  autoPlay={true}
                  loop={true}
                  resizeMode="contain"
                  style={{ width: 150, height: 150 }}
                />
      
     
    );
  }

  return <Redirect href={url} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
