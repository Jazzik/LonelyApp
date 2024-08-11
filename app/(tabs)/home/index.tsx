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
import { RefreshControl } from "react-native";
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

  const orderList = () => {
    let act = Object.keys(active);
    let inact: string[] = [];
    Object.keys(inactive).forEach((key) => {
      if (!act.includes(key)) {
        inact.push(key);
      }
    });

    return act.concat(inact);
  };
  const getProgressRatio = (groupName: string) => {
    if (
      active &&
      inactive &&
      active[groupName] !== undefined &&
      inactive[groupName] !== undefined
    ) {
      const ratio =
        Object.keys(active[groupName]).length /
        Object.keys(inactive[groupName]).length;
      return ratio * 100;
    }

    return 0;
  };
  const fetchData = async () => {
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
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const DATA = orderList();
  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.dark.text} />
        </View>
      ) : isInternetError ? (
        <Animated.ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: 600,
          }}
        >
          <Punkboy1 />
          <CheckInternetConnection />
          <Button title="Retry" onPress={fetchData} />
        </Animated.ScrollView>
      ) : (
        <FlashList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              // colors={[Colors.dark.text]}  // For Android
              tintColor={Colors.dark.text} // For iOS
            />
          }
          estimatedItemSize={20}
          data={DATA}
          renderItem={({ item }) => (
            <ChallengeBar progress={getProgressRatio(item)} title={item} />
          )}
        />
      )}

      <StatusBar style="light" />
    </View>
  );
}
