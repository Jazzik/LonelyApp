import Animated, {
  FadeIn,
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Button } from "react-native";
import { ChallengeBar } from "@/components/ChallengeBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import CheckInternetConnection from "@/components/CheckInternetConnection";
import { Punkboy1 } from "@/components/characters/punkboy/punkboy";
import { ActivityIndicator } from "react-native";
import { getGroups, refreshTokenIfExpired } from "@/api/apiv1";
import { styles } from "@/constants/Style";
export let tasksName = "Task Group Name";

export default function Tab() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInternetError, setIsInternetError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await AsyncStorage.getItem("accessToken");
    setLoading(true);
    setIsInternetError(false); // Reset internet error state

    await getGroups("en-en")
      .then((response) => {
        const result = response.data;
        console.log(result);
        setData(result);
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
  };

  const retryConnection = () => {
    fetchData();
  };
  const scrollY = useSharedValue(0);
  const refreshPage = () => {
    // Logic to refresh the page
    console.log("Refreshing page...");
    fetchData();
  };
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      if (event.contentOffset.y < -150) {
        // Threshold for triggering refresh
        runOnJS(refreshPage)();
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
                {data.map((item, index) => (
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
