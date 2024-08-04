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
import { getGroups, getProgress } from "@/api/apiv1";
import { styles } from "@/constants/Style";
import { Dict } from "i18n-js";
export let tasksName = "Task Group Name";
import {
  storeDataInStorage as storeDataToStorage,
  getDataFromStorage,
  deleteDataInStorage as deleteDataFromStorage,
  isStoredDataExpired
} from "@/utils/storageActions";

export default function Tab() {
  const [inactive, setInactive] = useState<string[]>([]);
  const [active, setActive] = useState<string[]>([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInternetError, setIsInternetError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await AsyncStorage.getItem("accessToken");

    // console.log(await AsyncStorage.getItem("tasksGroups"))
    if (
      (await AsyncStorage.getItem("ActiveTaskGroups")) != null &&
      (await AsyncStorage.getItem("InactiveTaskGroups")) != null &&
      !(await isStoredDataExpired(10800)) 
    ) {
      console.log("loading from storage");
      setLoading(false);
      setIsInternetError(false);
      setActive(await getDataFromStorage("ActiveTaskGroups"));
      setInactive(await getDataFromStorage("InactiveTaskGroups"));
  
    }else{
      console.log("loading from api");
      setLoading(true);
      setIsInternetError(false); // Reset internet error state
      let data = await getProgress();

      let activegroups: string[] = [];
      data.map((item: Dict, index: number) => {
        console.log(item, "active");
        if (!activegroups.includes(item.tgroup)) {
          activegroups.push(item.tgroup);
        }
      });
      storeDataToStorage("ActiveTaskGroups", activegroups);
      
      setActive(activegroups);
      setLoading(false);
      await getGroups("en-en")
        .then((response) => {
          const result = response.data;
          console.log(result, "inactive");
          storeDataToStorage("InactiveTaskGroups", result);
          setInactive(result);
          tasksName = result;
        })
        .catch((error) => {
          setIsInternetError(true);
          console.error(error);
          // console.log(JSON.stringify(error));  // for full error data
        })
        .finally(() => {
          setLoading(false);
        });
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
      if (event.contentOffset.y < -150) {
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
                <View style={{ transform: [{ translateY: -120 }], height: 0 }}>
                  <ActivityIndicator size="large" color={Colors.dark.text} />
                </View>
                {active.map((item, index) => (
                  <ChallengeBar
                    key={index}
                    title={item}
                    progress={90}
                  ></ChallengeBar>
                ))}
                {inactive.map((item, index) => (
                  <ChallengeBar
                    key={index}
                    title={item}
                    progress={0}
                  ></ChallengeBar>
                ))}
              </Animated.View>
            </Animated.View>
          )}
        </Animated.ScrollView>
      )}
      <StatusBar style="light" />
    </View>
  );
}
