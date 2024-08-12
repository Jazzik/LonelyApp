import React from "react";
import { Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import { HeaderItems } from "@/components/headerItems/HeaderItems";
import { Platform, Vibration } from "react-native";

export default function TabLayout() {
  const widthHome = useSharedValue(32);
  const widthSettings = useSharedValue(32);
  const widthCommunity = useSharedValue(36);

  const handleHomePress = () => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }if (Platform.OS === "android") {
      Vibration.vibrate([0, 10, 200, 0]);
    }
    widthHome.value = withSpring(36); // Adjust the increment as needed
    setTimeout(() => {
      widthHome.value = withTiming(32); // Return to initial width after a short delay
    }, 300);
  };

  const handleSettingsPress = () => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }if (Platform.OS === "android") {
      Vibration.vibrate([0, 10, 200, 0]);
    }
    widthSettings.value = withSpring(36); // Adjust the increment as needed
    setTimeout(() => {
      widthSettings.value = withTiming(32); // Return to initial width after a short delay
    }, 300);
  };

  const handleCommunityPress = () => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }if (Platform.OS === "android") {
      Vibration.vibrate([0, 10, 200, 0]);
    }
    widthCommunity.value = withSpring(40); // Adjust the increment as needed
    setTimeout(() => {
      widthCommunity.value = withTiming(36); // Return to initial width after a short delay
    }, 300);
  };
  const AnimatedOctions = Animated.createAnimatedComponent(Octicons);

  const animatedStyleHome = useAnimatedStyle(() => {
    return {
      fontSize: widthHome.value,
    };
  });

  const animatedStyleSettings = useAnimatedStyle(() => {
    return {
      fontSize: widthSettings.value,
    };
  });

  const animatedStyleCommunity = useAnimatedStyle(() => {
    return {
      fontSize: widthCommunity.value,
    };
  });

  const userValues = {
    dartValue: 100,
    goldValue: 150,
    diamondValue: 60,
    userPhotoIsLoaded: true,
  };

  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: Colors.dark.upper_background },
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        headerStyle: {
          height: 100,
          backgroundColor: Colors.dark.upper_background,
        },
        headerTitleAlign: "left",

        headerRight: () => (
          <HeaderItems
            dartValue={userValues.dartValue}
            goldValue={userValues.goldValue}
            diamondValue={userValues.diamondValue}
            userPhotoIsLoaded={userValues.userPhotoIsLoaded}
          />
        ),
        headerTitle: () => <></>,
      }}
    >
      <Tabs.Screen /* Initializing home button */
        name="home"
        options={{
          
         
          title: "home",
          tabBarIcon: ({ color }) => (
            <AnimatedOctions
              name="home"
              size={widthHome.value}
              color={color}
              style={animatedStyleHome}
            />
          ),
          headerShown: true,
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleHomePress();
          },
        })}
      />

      <Tabs.Screen // initializing community button
        name="community"
        options={{
          unmountOnBlur: true,
          title: "Community",
          tabBarIcon: ({ color }) => (
            <AnimatedOctions
              name="people"
              size={widthCommunity.value}
              color={color}
              style={animatedStyleCommunity}
            />
          ),
          headerShown: true,
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleCommunityPress();
          },
        })}
      />

      <Tabs.Screen // initializing settings button
        name="settings"
        options={{
          unmountOnBlur: true,
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <AnimatedOctions
              name="gear"
              size={widthSettings.value}
              color={color}
              style={animatedStyleSettings}
            />
          ),
          headerShown: false,
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleSettingsPress();
          },
        })}
      />
      
    </Tabs>

    
  );
}
