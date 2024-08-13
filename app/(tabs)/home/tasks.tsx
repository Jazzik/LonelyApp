import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { CustomBackButton } from "@/components/navigation/custiomBackButton";
import TasksHeader from "@/components/headerItems/TasksHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "@/constants/Style";
import { Dict } from "i18n-js";
import UniversalButton from "@/components/UniversalButton";
export default function Tasks() {
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState<Dict>({});
  const [loading, setLoading] = useState(true);
  const { tasksGroupName }: { tasksGroupName: string } = useLocalSearchParams();
  const isActive = (key: number) => {
    let flag = true;
    console.log(progress, key)
    if (progress && progress[key] !== undefined) {
      console.log(flag)
      flag = false;
    }

    return flag;
  };

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const locateButton = (index: number) => {
    if (index % 2 === 1) {
      return "flex-start";
    } else {
      return "flex-end";
    }
  };
  const arrangeLine = (index: number) => {
    if (index % 2 === 1) {
      return "30deg";
    } else {
      return "155deg";
    }
  };
  const fetchData = async () => {
    const data = await AsyncStorage.getItem("InactiveTaskGroups");
    if (data) {
      setData(JSON.parse(data)[tasksGroupName]);
    }
    const progressData = await AsyncStorage.getItem("ActiveTaskGroups");
    if (progressData !== null) {
      setProgress(JSON.parse(progressData)[tasksGroupName]);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Animated.ScrollView
          scrollEventThrottle={16}
          style={styles.scrollView} // Corrected style object reference
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={Colors.dark.text} />
          </View>
        </Animated.ScrollView>
      ) : (
        <Animated.View style={{flex: 1,}}>
          
          <Animated.View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0)",
              marginTop: 5,
              marginLeft: 15,
              marginRight: 15,
              // make at least 99% of the screen
              
            }}
          >
            <TasksHeader tasksGroupName={tasksGroupName} />
          </Animated.View>
          <Animated.ScrollView>
            <Animated.View style={styles.container}>
              {Object.entries(data).map(([taskname, taskdata]) => {
                return (
                  <View
                    key={taskdata["id"]}
                    style={{
                      flex: 1,
                      alignItems: locateButton(taskdata["number"]),
                      height: 150,
                    }}
                  >
                    <View
                      style={{
                        transform: [
                          { rotate: arrangeLine(taskdata["number"]) },
                        ],
                        position: "absolute",
                        zIndex: -3,
                        backgroundColor:isActive(taskdata["id"]) ? "gray" : "green",
                        top: 140,
                        padding: 2,
                        width: "70%",
                        left: 50,
                        // marginLeft: 50,
                      }}
                    />
                    <View style={{marginHorizontal: 40}}>
                      <UniversalButton
                        text={taskdata["number"]}
                        accessible={isActive(taskdata["id"])}
                        press={() => {
                          router.push({
                            pathname: "/taskPage",
                            params: {
                              taskName: taskname,
                              groupName: tasksGroupName,
                            },
                          });
                        }}
                      />
                    </View>
                  </View>
                );
              })}

              
              <View style={{ padding: 10 }} />
            </Animated.View>
            
          </Animated.ScrollView>
          <ConfettiCannon
                count={20}
                explosionSpeed={0}
                fallSpeed={1500}
                fadeOut={true}
                origin={{ x: -50, y: 0 }}
              />
        </Animated.View>
      )}

      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          bottom: 0,
          paddingLeft: 15,
          paddingBottom: 35,
          backgroundColor: "rgba(0,0,0,0.0)",
        }}
      >
        <CustomBackButton press={() => setLoading(true)} />
      </View>
    </View>
  );
}
