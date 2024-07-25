import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { StatusBar, StatusBarStyle } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Dimensions, Button, Text } from "react-native";
import { ChallengeBar } from "@/components/ChallengeBar";
import axios from "axios";
import { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
// import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import CheckInternetConnection from "@/components/CheckInternetConnection";
import { ip } from "@/ip.json";
import { Punkboy1 } from "@/components/characters/punkboy/punkboy";
import { ActivityIndicator } from "react-native";
import { isExpired } from "@/utils/token";
import { getGroups, refreshTokenIfExpired } from "@/api/apiv1";
export default function Tab() {
  const nav = useNavigation();
  const { width, height } = Dimensions.get("window");
  const translationY = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInternetError, setIsInternetError] = useState(false);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // await AsyncStorage.removeItem("accessToken")
    await AsyncStorage.getItem("accessToken");
    setLoading(true);
    setIsInternetError(false); // Reset internet error state

    await getGroups("en-en")
      .then((response) => {
        const result = response.data;
        console.log(result);
        setData(result);
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
                // exiting={FadeOut.duration(1000)}
                style={styles.container}
              >
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    flex: 1,
    position: "relative", // Ensure the container is relative
  },
  buttonContainer: {
    position: "absolute",
  },
  loadingContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexGrow: 1,
    padding: 20,
  },
  item: {
    height: 100,
    marginBottom: 20,
    backgroundColor: "#f9c2ff",
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
