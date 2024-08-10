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
import { transform } from "@babel/core";

export default function Tab() {
  const [inactive, setInactive] = useState<Dict>({});
  const [active, setActive] = useState<Dict>({});
  const [loading, setLoading] = useState(true);
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
        setActive(activeTaskGroups);
        storeDataToStorage("ActiveTaskGroups", activeTaskGroups);
        storeDataToStorage("UserPhoto", getUserPhoto); // boolean to str
        setInactive(InactiveTaskGroups);
        storeDataToStorage("InactiveTaskGroups", InactiveTaskGroups);
        // setIsInternetError(true);
        // console.log(groups["Socialization"].length);
        // console.log(progr["Socialization"].length);
        setLoading(false);
      } catch (error) {
        setIsInternetError(true);
        setLoading(false);
        return;
      }
    }
  };

  const retryConnection = () => {
    fetchData();
  };
  const scrollY = useSharedValue(0);
  const debounce = (func: Function, delay: number) => {
    let debounceTimer: string | number | NodeJS.Timeout | undefined;
    return () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(), delay);
    };
  };
  const refreshPage = () => {
    // Logic to refresh the page
    console.log("Refreshing page...");
    deleteDataFromStorage("ActiveTaskGroups");
    deleteDataFromStorage("InactiveTaskGroups");
    fetchData();
  };
  const debouncedRefreshPage = debounce(refreshPage, 500);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      if (event.contentOffset.y < -100) {
        // Threshold for triggering refresh
        runOnJS(debouncedRefreshPage)();

        //wait 1 second async before allowing another refresh
      }
    },
  });
  return (
    <View style={styles.container}>
      {loading ? (
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={styles.loadingContainer}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={Colors.dark.text} />
          </View>
        </Animated.ScrollView>
      ) : (
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {isInternetError ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: 600,
              }}
            >
              <Punkboy1 />
              <CheckInternetConnection />
              <Button title="Retry" onPress={retryConnection} />
            </View>
          ) : (
            <Animated.View style={[styles.content]}>
              <Animated.View
                entering={FadeIn.duration(100)}
                style={styles.container}
              >
                <View style={{ transform: [{ translateY: -100 }], height: 0 }}>
                  <ActivityIndicator size="large" color={Colors.dark.text} />
                </View>
                {Object.entries(active).map(([key, value]: [string, any]) => {
                  if (key in inactive) {
                    return (
                      <ChallengeBar
                        key={key}
                        title={key}
                        progress={
                          (Object.keys(value).length /
                            Object.keys(inactive[key]).length) *
                          100
                        }
                      ></ChallengeBar>
                    );
                  }
                })}
                {Object.entries(inactive).map(([key, value]: [string, any]) => {
                  if (!(key in active)) {
                    return (
                      <ChallengeBar
                        key={key}
                        title={key}
                        progress={0}
                      ></ChallengeBar>
                    );
                  }
                })}
              </Animated.View>
            </Animated.View>
          )}
        </Animated.ScrollView>
      )}
      <StatusBar style="light" />
    </View>
  );
}
