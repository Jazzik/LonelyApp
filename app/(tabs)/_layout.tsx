import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Octicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";

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
import { Image, View, Text, Pressable } from "react-native";
import { HeaderItems } from "@/components/headerItems/HeaderItems";

export default function TabLayout() {
  const widthHome = useSharedValue(32);
  const widthSettings = useSharedValue(32);
  const widthCommunity = useSharedValue(36);

  const handleHomePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    widthHome.value = withSpring(36); // Adjust the increment as needed
    setTimeout(() => {
      widthHome.value = withTiming(32); // Return to initial width after a short delay
    }, 300);
  };

  const handleSettingsPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    widthSettings.value = withSpring(36); // Adjust the increment as needed
    setTimeout(() => {
      widthSettings.value = withTiming(32); // Return to initial width after a short delay
    }, 300);
  };

  const handleCommunityPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
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

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.dark.upper_background },
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        headerStyle: {
          height: 120,
          backgroundColor: Colors.dark.upper_background,
        },
        headerTitleAlign: "left",

        headerRight: () => (
          <HeaderItems
            dartValue={100}
            goldValue={150}
            diamondValue={60}
            userPhotoIsLoaded={true}
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
