import Animated, {
  FadeIn,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { StatusBar } from "expo-status-bar";
import React from "react";
import {  View,  Button } from "react-native";
import { ChallengeBar } from "@/components/ChallengeBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import CheckInternetConnection from "@/components/CheckInternetConnection";
import { ip } from "@/ip.json";
import { Punkboy1 } from "@/components/characters/punkboy/punkboy";
import { ActivityIndicator } from "react-native";
import { isExpired } from "@/utils/token";
import { getGroups, getProgress } from "@/api/apiv1";
import {styles} from "@/constants/Style"
import { Dict } from "i18n-js";
export let tasksName = "Task Group Name";
      
export default function Tab() {
  const scrollY = useSharedValue(0);
  const [inactive, setInactive] = useState([]);
  const [active, setActive] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isInternetError, setIsInternetError] = useState(false);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    
    setLoading(true);
    setIsInternetError(false); // Reset internet error state
    let data = await getProgress()
    let activegroups: string[] = []
    data.map((item:Dict, index:number)=>{
      console.log(item)
      if(!activegroups.includes(item.tgroup)){
      activegroups.push(item.tgroup)}
  })

    setActive(activegroups)
    setLoading(false)
    // await getGroups("en-en")
    //   .then((response) => {
    //     const result = response.data;
    //     console.log(result);
    //     setInactive(result);
    //     tasksName = result
        
    //   })
    //   .catch((error) => {
    //     setIsInternetError(true);
    //     console.error(error);
    //     // console.log(JSON.stringify(error));  // for full error data
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
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
              {active.map((item, index) => (
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


