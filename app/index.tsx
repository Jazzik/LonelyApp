import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
console.log("index.tsx");
import { isExpired } from "@/utils/token";
import { refreshTokenIfExpired } from "@/api/apiv1";
const checkLoginStatus = async () => {
  console.log("check");
  const token = await AsyncStorage.getItem("accessToken");
  
  // let token = false;
  if (token && !isExpired(token) ) {
    console.log("Succesfuly authentified");
    // Optionally validate the token
    // Navigate to the home screen or wherever appropriate
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
      <View>
        <Text>Loading...</Text>
      </View>
    ); // Or any other loading state
  }

  return <Redirect href={url} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
  },
});
