import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import * as Haptics from 'expo-haptics';
import { useNavigation } from "expo-router";

export function ChallengeBar({ progress, title }: { progress: number; title: string }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const scale = useSharedValue(1);
  const navigation = useNavigation();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  return (

    <Pressable 
    onPressIn={() => {
      navigation.navigate("tasks")
      scale.value = 0.95;
    }}
    onPressOut={() => {
 
      scale.value = 1;
     
    }}
    onLongPress={() => {

      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scale.value = 0.95;
      setTimeout(() => {
        scale.value = 0.93;
      }, 100);
      setTimeout(() => {
        scale.value = 0.91;
      }, 100);
      setTimeout(() => {
        scale.value = 0.89;
      }, 100);
      setTimeout(() => {
        scale.value = 0.87;
      }, 100);

    }}
    onPress={() => {
  
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scale.value = 0.90;
      
      //wait 1 second
      setTimeout(() => {
        scale.value = 1;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, 30);
      
    }}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={styles.label}>{title}</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${progress}%` },
              { backgroundColor: isEnabled ? Colors.dark.text : Colors.dark.background },
            ]}
          />
        </View>

        
        
     
    </Animated.View>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.dark.third_color,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.dark.text,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: Colors.dark.text,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  switchLabel: {
    fontSize: 16,
  },
})