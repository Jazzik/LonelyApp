import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { ActivityIndicator } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import TaskButton from "@/components/TaskButton";
import { CustomBackButton } from "@/components/navigation/custiomBackButton";
import TasksHeader from "@/components/headerItems/TasksHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTasksByGroup } from "@/api/apiv1";
import CustomModal from "@/components/CustomModal";
import { styles } from "@/constants/Style";
import { Dict } from "i18n-js";
export default function Tasks() {
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState<Dict>({});
  const [loading, setLoading] = useState(true);
  const { tasksGroupName }: { tasksGroupName: string } = useLocalSearchParams();
  const isActive = (key: number) => {
    let flag = true;
    if (progress && progress[key] !== undefined) {
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
      return "150deg";
    }
  };
  const fetchData = async () => {
    setData(await getTasksByGroup(tasksGroupName));
    const progressData = await AsyncStorage.getItem("ActiveTaskGroups");
    if (progressData !== null) {
      console.log("progressData", JSON.parse(progressData)[tasksGroupName]);
      setProgress(JSON.parse(progressData)[tasksGroupName]);
    }

    setLoading(false);
  };

  return (
    <View style={styles1.container}>
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
        <Animated.View>
          <Animated.View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0)",
              marginTop: 5,
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            <TasksHeader tasksGroupName={tasksGroupName} />
          </Animated.View>
          <Animated.ScrollView>
            <Animated.View style={styles1.container}>
              {data.map((item) => (
                <View
                  key={item["number"]}
                  style={{
                    flex: 1,
                    alignItems: locateButton(item["number"]),
                    height: 150,
                    // backgroundColor: "orange",
                  }}
                >
                  <TaskButton
                    accessible={isActive(item["id"])}
                    press={() => {
                      router.push({
                        pathname: "./taskPage",
                        params: { taskName: item["title"] },
                      });
                    }}
                    text={item["number"]}
                    key={item["number"]}
                  />
                  <View
                    style={{
                      transform: [{ rotate: arrangeLine(item["number"]) }],
                      position: "absolute",
                      zIndex: -3,
                      backgroundColor: "black",
                      top: 120,
                      padding: 2,
                      width: "70%",
                      left: 50,
                      // marginLeft: 50,
                      
                    }}
                  ></View>
                </View>
              ))}

              <ConfettiCannon
                count={20}
                explosionSpeed={0}
                fallSpeed={1500}
                fadeOut={true}
                origin={{ x: -50, y: 0 }}
              />
              <View style={{ padding: 10 }} />
            </Animated.View>
          </Animated.ScrollView>
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
      
          <CustomBackButton press={()=>setLoading(true)}/>
        
      
      </View>
    </View>
  );
}
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
