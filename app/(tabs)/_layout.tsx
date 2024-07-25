import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Octicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import Dart from "@/assets/svg/dart-board.svg";
import Gold from "@/assets/svg/gold.svg";
import Diamond from "@/assets/svg/diamond.svg";
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
import { Image, View, Text } from "react-native";

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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              // backgroundColor: "red",
              gap: 27,
              paddingBottom: 3,
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
            >
              <Dart width={30} height={30} />
              <Text style={{ color: "white", fontSize: 26 }}>98</Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
            >
              <Gold width={30} height={30} />
              <Text style={{ color: "white", fontSize: 26 }}>112</Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
            >
              <Diamond width={30} height={30} />
              <Text style={{ color: "white", fontSize: 26 }}>112</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "red",
              }}
            >
              <View
                style={{
                  width: 60, // Circle size
                  height: 60, // Circle size
                  borderRadius: 30, // Half of the width/height to make it a circle
                  backgroundColor: Colors.dark.background, // Circle color
                  justifyContent: "center", // Center the image vertically
                  alignItems: "center", // Center the image horizontally
                }}
              >
                <Image
                  source={require("@/assets/images/user/user-photo.png")}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    borderColor: "white",
                    borderWidth: 2,
                   
                  }}
                />
              </View>
            </View>
          </View>
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
