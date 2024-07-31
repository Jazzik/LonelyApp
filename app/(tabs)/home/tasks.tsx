import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import TaskButton from "@/components/TaskButton";
import { CustomBackButton } from "@/components/navigation/custiomBackButton";
import CircleButton from "@/components/CircleButton";
import TasksHeader from "@/components/headerItems/TasksHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTasksByGroup } from "@/api/apiv1";
import CustomModal from "@/components/CustomModal";
import { styles } from "@/constants/Style";
import { CustomBackButton } from "@/components/navigation/custiomBackButton";
export default function Tasks() {
  const [data, setData] = useState([]);
  const [modalVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [taskNumber, setTaskNumber] = useState(0);
  const getDataIfLoaded = (index: number, key: string) => {
    if (data.length > 0) {
      return data[index][key];
    } else {
      return 'no data';
  const [data, setData] = useState([]);
  const [modalVisible, setVisible] = useState(false);
  const [taskNumber, setTaskNumber] = useState(0);
  const getDataIfLoaded = (index: number, key: string) => {
    if (data.length > 0) {
      return data[index][key];
    } else {
      return "no data";
    }
  };
  const { tasksGroupName } = useLocalSearchParams();
  };
  const { tasksGroupName } = useLocalSearchParams();
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

  const fetchData = async () => {
    setData(await getTasksByGroup(tasksGroupName));
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
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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

          {data.map((item, index) => (
            <View key={item["number"]} style={{ flex: 1, alignItems: locateButton(item["number"]), height: 150 }}>
              <CircleButton
                press={() => {
                  setVisible(true);
                  setTaskNumber(index);
                }}
                text={item["number"]}
                key={item["number"]}
              />
            </View>
          ))}
        </Animated.View>
        </Animated.ScrollView>
      </Animated.View>
      )}
      
      {/* <View
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
      </View> */}
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