import Animated, {FadeIn, FadeOut, useAnimatedStyle,useAnimatedScrollHandler, useSharedValue ,withSpring} from 'react-native-reanimated';
import CircleButton from '../../components/CircleButton';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ChallengeBar } from '@/components/ChallengeBar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
export default function Tab() {
  const { width, height } = Dimensions.get('window');
  const translationY = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;

  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const token = await AsyncStorage.getItem("userToken")
        console.log(token)
        const response = await axios.get('http://10.30.14.146:8080/tasks/groups',{"headers":{"Authorization":"Bearer "+ token}})
        const result = await response.data;
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[]);



  const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ translateY: -scrollY.value }],
  };
  });


  return (

    <View style={styles.container}>
      <Animated.ScrollView
      
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        
        <Animated.View style={[styles.content, animatedStyle]}>
          
          <Animated.View 
            entering={FadeIn.duration(300)} 
            // exiting={FadeOut.duration(1000)} 
            style={styles.container}>

          {data.map((item) => (
            <ChallengeBar title={item} progress={50}></ChallengeBar>
          ))}
            

          </Animated.View>

        </Animated.View>

      </Animated.ScrollView>
      <StatusBar style='light'/>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    flex: 1,
    position: 'relative', // Ensure the container is relative
  },
  buttonContainer: {
    position: 'absolute',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  item: {
    height: 100,
    marginBottom: 20,
    backgroundColor: '#f9c2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});