import Animated, {FadeIn, FadeOut, useAnimatedStyle,useAnimatedScrollHandler, useSharedValue ,withSpring} from 'react-native-reanimated';
import CircleButton from '../../components/CircleButton';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ChallengeBar } from '@/components/ChallengeBar';


export default function Tab() {
  const { width, height } = Dimensions.get('window');
  const translationY = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
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
            style={styles.container}
          > 
            <ChallengeBar title="example title" progress={50}></ChallengeBar>
            <Animated.View style={[styles.buttonContainer, { top: height * 0.1, left: width * 0.3 }]}>
          
              <CircleButton onPress={() => {}} text = '1' />
            </Animated.View>

            <Animated.View style={[styles.buttonContainer, { top: height * 0.4, left: width * 0.1 }]}>
              <CircleButton onPress={() => {}} text = '2'/>
            </Animated.View>

            <Animated.View style={[styles.buttonContainer, { top: height * 0.7, left: width * 0.6 }]}>
              <CircleButton onPress={() => {}} text = '3'/>
            </Animated.View>

          </Animated.View>

        </Animated.View>

      </Animated.ScrollView>
      <StatusBar style='light'/>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#221240",
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