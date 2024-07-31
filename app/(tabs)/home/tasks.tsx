import React from "react";
import { Button, Modal, View, Text, StyleSheet } from "react-native";
import ConfettiCannon from 'react-native-confetti-cannon'
import { useLocalSearchParams, useRouter } from "expo-router";
import StatusBar from "expo-status-bar";
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import TaskButton from "@/components/TaskButton";
import { CustomBackButton } from "@/components/navigation/custiomBackButton";
import TasksHeader from "@/components/headerItems/TasksHeader";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTasksByGroup } from "@/api/apiv1";
import CustomModal from "@/components/CustomModal";
export default function Tasks() {
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
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, []);
  const locateButton = (index: number) => {
    if (index % 2 == 1) {
      return "flex-start";
    } else {
      return "flex-end";
    }
  };
  const fetchData = async () => {
    setData(await getTasksByGroup(tasksGroupName));
  };
  return (
    <View style={styles.container}>
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
      
      <Animated.ScrollView
        // onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        
        
        <Animated.View>
        
          <Animated.View
            // entering={FadeIn.duration(100)}
            // exiting={FadeOut.duration(1000)}
            style={styles.container}
          >
            <ConfettiCannon 
                fadeOut={true}
            autoStart={true}
            fallSpeed={1500}
            explosionSpeed={900}
            count={20} origin={{x: 0, y: 0}} />

            <CustomModal
              visible={modalVisible}
              title={getDataIfLoaded(taskNumber, "title")}
              description={getDataIfLoaded(taskNumber, "description")}
              onClose={() => {
                setVisible(false);
              }}
            />
           
            {data.map((item, index) => (
              <View
                key={item["number"]}
                style={{
                  flex: 1,
                  alignItems: locateButton(item["number"]),
                  height: 150,
                }}
              > 
                
                <TaskButton
                  press={() => {
                    setVisible(true);
                    setTaskNumber(index);
                  }}
                  text={item["number"]}
                  key={item["number"]}
                  accessible={true}
                />
                
              </View>
            ))}
            
            {data.map((item, index) => (
              <View
                key={item["number"]}
                style={{
                  flex: 1,
                  alignItems: locateButton(item["number"]),
                  height: 150,
                }}
              >
                <TaskButton
                  press={() => {
                    setVisible(true);
                    setTaskNumber(index);
                  }}
                  text={item["number"]}
                  key={item["number"]}
                  accessible={false}
                />
              </View>
            ))}
            
          </Animated.View>
        </Animated.View>
      </Animated.ScrollView>
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

const styles = StyleSheet.create({
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
