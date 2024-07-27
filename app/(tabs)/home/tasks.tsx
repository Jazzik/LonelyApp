import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useLocalSearchParams, useNavigation } from "expo-router";
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
  const {tasksGroupName} = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    fetchData();
  
  }, []);
  const locateButton = (index:number)=>{
    if (index%2==1){
      return "flex-start"
    }
    else{
      return "flex-end"
    }
    
  }
  const fetchData = async () => {
    // await AsyncStorage.removeItem("accessToken")
    await AsyncStorage.getItem("accessToken");
    setData(await getTasksByGroup(tasksGroupName))


  };
  return (
    <View style={styles.container}>
      <Animated.View style={{backgroundColor: 'rgba(0, 0, 0, 0)',
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
      }}> 
        <TasksHeader tasksGroupName={tasksGroupName} navigation = {navigation}  />
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
            {data.map((item,index)=>(<View key={item["number"]} style={{ flex: 1, alignItems: locateButton(item["number"]), height: 150 }}>
              <CircleButton
                onPress={() => navigation.navigate("settings")}
                text={item["number"]}
                key={item["number"]}
              />
            </View>))}


            
          </Animated.View>
        </Animated.View>
      </Animated.ScrollView>
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
});
