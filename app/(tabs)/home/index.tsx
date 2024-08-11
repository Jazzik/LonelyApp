import Animated, {
  FadeIn,
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { View, Button, ActivityIndicator } from "react-native";
import { ChallengeBar } from "@/components/ChallengeBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import CheckInternetConnection from "@/components/CheckInternetConnection";
import { Punkboy1 } from "@/components/characters/punkboy/punkboy";
import { getGroups, getProgress, getTasksByGroup, getPhoto } from "@/api/apiv1";
import { styles } from "@/constants/Style";
import { Dict } from "i18n-js";
export let tasksName = "Task Group Name";
import {
  storeDataInStorage as storeDataToStorage,
  getDataFromStorage,
  deleteDataInStorage as deleteDataFromStorage,
  isStoredDataExpired,
} from "@/utils/storageActions";
import { FlashList } from "@shopify/flash-list";

export default function Tab() {
  const [inactive, setInactive] = useState<Dict>({});
  const [active, setActive] = useState<Dict>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // not same loading
  const [isInternetError, setIsInternetError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // console.log(await AsyncStorage.getItem("tasksGroups"))
    if (
      (await AsyncStorage.getItem("ActiveTaskGroups")) != null &&
      (await AsyncStorage.getItem("InactiveTaskGroups")) != null &&
      !(await isStoredDataExpired(1))
    ) {
      console.log("loading from storage");
      setLoading(false);
      setIsInternetError(false);
      setActive(await getDataFromStorage("ActiveTaskGroups"));
      setInactive(await getDataFromStorage("InactiveTaskGroups"));
    } else {
      setLoading(true);
      console.log("loading from api");
      setIsInternetError(false); // Reset internet error state
      try {
        const activeTaskGroups = await getProgress();
        const getUserPhoto = await getPhoto();
        const InactiveTaskGroups = await getGroups("en-en");
        console.log(activeTaskGroups);
        setActive(activeTaskGroups);
        storeDataToStorage("ActiveTaskGroups", activeTaskGroups);
        storeDataToStorage("UserPhoto", getUserPhoto); // boolean to str
        setInactive(InactiveTaskGroups);
        storeDataToStorage("InactiveTaskGroups", InactiveTaskGroups);
        setLoading(false);
      } catch (error) {
        setIsInternetError(true);
        setLoading(false);
        return;
      }
    }
  };
const handleRefresh = () => {
  setRefreshing(true);
  // fetchData();
  setTimeout(() => {
    setRefreshing(false);
  }, 1000);
}
  // const refreshPage = () => {
  //   // Logic to refresh the page
  //   console.log("Refreshing page...");
  //   deleteDataFromStorage("ActiveTaskGroups");
  //   deleteDataFromStorage("InactiveTaskGroups");
  //   fetchData();
  // };
  const DATA = [{ key: "a" }, { key: "b" }, { key: "c" }];
  return (
    <View style={styles.container}>
      <FlashList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={DATA}
        renderItem={() => <ChallengeBar 
        progress={100}
        title="Task Group Name"
        />}
      ></FlashList>
      <StatusBar style="light" />
    </View>
  );
}
