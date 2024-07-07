import Animated, {FadeIn, FadeOut, useAnimatedStyle,useAnimatedScrollHandler, useSharedValue ,withSpring} from 'react-native-reanimated';
import CircleButton from '../../components/CircleButton';

import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
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
export default function Tab() {
  return (

    <View style={styles.container}>
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={styles.scrollView}
    >
      <Animated.View style={[styles.content, animatedStyle]}>
      <Animated.View 
      entering={FadeIn.duration(1000)} 
      exiting={FadeOut.duration(1000)} 
      style={styles.container}
    >
      <Animated.View style={[styles.buttonContainer, { top: height * 0.1, left: width * 0.3 }]}>
        <CircleButton onPress={() => {}} />
      </Animated.View>
      <Animated.View style={[styles.buttonContainer, { top: height * 0.4, left: width * 0.5 }]}>
        <CircleButton onPress={() => {}} />
      </Animated.View>
      <Animated.View style={[styles.buttonContainer, { top: height * 0.7, left: width * 0.6 }]}>
        <CircleButton onPress={() => {}} />
      </Animated.View>
    </Animated.View>
      </Animated.View>
    </Animated.ScrollView>
  </View>

  );
}

const styles = StyleSheet.create({
  container: {
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