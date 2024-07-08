import React from 'react';
import { View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, FadeIn, FadeOut } from 'react-native-reanimated';
export default function TabLayout(){
  const widthHome = useSharedValue(28);
  const widthSettings = useSharedValue(28);

  const handleHomePress = () => {
    widthHome.value = withSpring(widthHome.value + 5); // Adjust the increment as needed
    setTimeout(() => {
      widthHome.value = withTiming(28); // Return to initial width after a short delay
    }, 300);
  };

  const handleSettingsPress = () => {
    widthSettings.value = withSpring(widthSettings.value + 5); // Adjust the increment as needed
    setTimeout(() => {
      widthSettings.value = withTiming(28); // Return to initial width after a short delay
    }, 300);
  };

  const AnimatedFontAwesome = Animated.createAnimatedComponent(FontAwesome);
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

  return (

    <Tabs screenOptions={{ tabBarStyle: { backgroundColor: '#442380' }}} >
      <Tabs.Screen
        name="home"
        options={{
          unmountOnBlur:true,
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <AnimatedFontAwesome
              name="home"
              color={color}
              style={animatedStyleHome}
            />
          ),
          headerShown: false,
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleHomePress();
          },
        })}
      />
      <Tabs.Screen
        name="settings"
        options={{
          unmountOnBlur:true,
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <AnimatedFontAwesome
              name="cog"
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
};
