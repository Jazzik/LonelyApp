import { Pressable, Text, View, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { CustomBackButton } from "../navigation/custiomBackButton";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import { use } from "i18next";
import {Animated as ReactAnimated} from "react-native"

interface TasksProps {
  tasksGroupName: string|string[]|undefined;
  navigation: any;
}
export default function TasksHeader(props: TasksProps) {
  // give an array
  const { tasksGroupName, navigation } = props;

  const scaleName = useSharedValue(1);

  const scaleButton = useSharedValue(1);
  const translateXButton = useSharedValue(0);
  const translateYButton = useSharedValue(0);
  const rotateButton = useSharedValue('0deg');

  

  const animatedStyleName = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleName.value }],
    };
  });
  const animatedStyleButton = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scaleButton.value },
        { translateX: translateXButton.value }, // Translate 10 pixels along the X axis
        { translateY: translateYButton.value }, // Translate 20 pixels along the Y axis
        { rotate: rotateButton.value }
      ],
    };
  });
  
  const startWiggleAnimation = () => {
    translateXButton.value = withSequence(
      withTiming(3, { duration: 50 }), // Move right
      withTiming(-3, { duration: 50 }), // Move left
      withTiming(3, { duration: 50 }), // Move right
      withTiming(0, { duration: 50 }) // Return to starting position
    );
  };
  return (
    <Pressable
      onPressIn={() => {
        scaleButton.value = 0.95;
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      }}
      onPressOut={() => {
        scaleButton.value = 1;
        //wiggle effect

        startWiggleAnimation();
        
      }}
    >
      <Animated.View // header container
        style={[
          {
            // flex: 1,
            flexDirection: "row",
            // alignItems: "center",
            // justifyContent: "",
            // backgroundColor: "red",
            backgroundColor: Colors.dark.third_color,
            gap: 10,
            paddingBottom: 5,
            // marginBottom: 10,
            borderRadius: 15,
            height: 50,
          },
          animatedStyleButton,
        ]}
      >
        <View
          style={{
            paddingLeft: 10,
            justifyContent: "center",
            // backgroundColor: "red"
          }}
        >
          <CustomBackButton navigation={navigation} />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "left",
            paddingLeft: 20,
          }}
        >
          
            <Animated.View style={[animatedStyleName]}>
              <Text style={{ color: "white", fontSize: 26 }}>
                {tasksGroupName}
              </Text>
            </Animated.View>
        
        </View>
      </Animated.View>
    </Pressable>
  );
}
