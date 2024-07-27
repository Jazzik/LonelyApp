import React from "react";
import { Button, Modal, View, Text, StyleSheet } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { useLocalSearchParams, useRouter } from "expo-router";
import StatusBar from "expo-status-bar";
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import CircleButton from "@/components/CircleButton";
import { CustomBackButton } from "@/components/navigation/custiomBackButton";
import TasksHeader from "@/components/headerItems/TasksHeader";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTasksByGroup } from "@/api/apiv1";
export default function Tasks() {
  const [data, setData] = useState([])
  const [modalVisible, setVisible] = useState(false)
  const {tasksGroupName} = useLocalSearchParams();
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
    setData(await getTasksByGroup(tasksGroupName))


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
        <TasksHeader tasksGroupName={tasksGroupName} navigation={navigation} />
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
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {setVisible(false)}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>{data.}</Text>
            <Button title="Close" onPress={() => {setVisible(false)}} />
          </View>
        </View>
      </Modal>
            {data.map((item,index)=>(<View key={item["number"]} style={{ flex: 1, alignItems: locateButton(item["number"]), height: 150 }}>
              <CircleButton
                onPress={() => { 
                  setVisible(true)
                }}
  
                text={item["number"]}
                key={item["number"]}
              />
            </View>))}


            
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
        <CustomBackButton navigation={navigation} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
});
