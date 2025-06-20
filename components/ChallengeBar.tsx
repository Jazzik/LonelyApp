import { Colors } from "@/constants/Colors";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  Pressable,
  Vibration,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Platform } from "react-native";

export function ChallengeBar({
  progress,
  title,
  
}: {
  progress: number;
  title: string;
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const scale = useSharedValue(1);
  const router = useRouter();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  return (
    <Pressable
      onPressIn={() => {
        scale.value = 0.95;
      }}
      
      onPressOut={() => {
        scale.value = 1;
      }}
      onPress={() => {
        scale.value = 0.9;
        //check
        //wait 1 second
        setTimeout(() => {
          scale.value = 1;
          if (Platform.OS === "ios") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }if (Platform.OS === "android") {
            Vibration.vibrate([0, 10, 200, 0]);
          }
        }, 30);
        console.log("title:", title);
        router.push({
          pathname: "../home/tasks",
          params: { tasksGroupName: title },
        });
      }}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={styles.label}>{title}</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${progress}%` },
              {
                backgroundColor: isEnabled
                  ? Colors.dark.text
                  : Colors.dark.background,
              },
            ]}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
}

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
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.dark.text,
  },
  progressBarContainer: {
    width: "100%",
    height: 10,
    backgroundColor: Colors.dark.text,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBar: {
    height: "100%",
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 16,
  },
});
