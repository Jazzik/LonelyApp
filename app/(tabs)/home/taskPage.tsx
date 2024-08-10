import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native";
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
export default function Tasks() {
  const [data, setData] = useState([]);
  const { taskName } = useLocalSearchParams();

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
        const tasks = await AsyncStorage.getItem("ActiveTaskGroups");
        
  };

  return (
    <View style={styles1.container}>
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

          <Animated.View style={styles1.container}>

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