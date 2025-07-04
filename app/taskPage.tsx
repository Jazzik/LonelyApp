import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { CustomBackButton } from "@/components/navigation/custiomBackButton";
import TasksHeader from "@/components/headerItems/TasksHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dict } from "i18n-js";
import { styles } from "@/constants/Style";
export default function Tasks() {
  const [data, setData] = useState<Dict>({});
  const { taskName }: { taskName: string } = useLocalSearchParams();
  const { groupName }: { groupName: string } = useLocalSearchParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const tasks = await AsyncStorage.getItem("InactiveTaskGroups");
    if (tasks) {
      setData(JSON.parse(tasks)[groupName][taskName]);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View>
        <Animated.View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            marginTop: 5,
            marginLeft: 15,
            marginRight: 15,
          }}
        >
          <TasksHeader tasksGroupName={taskName} />
        </Animated.View>
        <Animated.ScrollView>
          <Animated.View style={styles.container}>
            <View
              style={{
                padding: "10%",
                margin: "5%",
                backgroundColor: Colors.dark.third_color,
              }}
            >
              <Text>{data["description"]}</Text>
            </View>
          </Animated.View>
        </Animated.ScrollView>
      </Animated.View>

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
        <CustomBackButton />
      </View>
    </View>
  );
}
