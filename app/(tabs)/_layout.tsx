import React from 'react';
import { View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, FadeIn, FadeOut } from 'react-native-reanimated';
export default function TabLayout(){

  const widthHome = useSharedValue(40);
  const widthSettings = useSharedValue(28);
  const widthCommunity = useSharedValue(32);

  const handleHomePress = () => {
    widthHome.value = withSpring(46); // Adjust the increment as needed
    setTimeout(() => {
      widthHome.value = withTiming(40); // Return to initial width after a short delay
    }, 300);
  };

  const handleSettingsPress = () => {
    widthSettings.value = withSpring(36); // Adjust the increment as needed
    setTimeout(() => {
      widthSettings.value = withTiming(32); // Return to initial width after a short delay
    }, 300);
  };

  const handleCommunityPress = () => {
    widthCommunity.value = withSpring(32); // Adjust the increment as needed
    setTimeout(() => {
      widthCommunity.value = withTiming(28); // Return to initial width after a short delay
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

  const animatedStyleCommunity = useAnimatedStyle(() => {
    return {
      fontSize: widthCommunity.value,
    };
  });

  return (

    <Tabs screenOptions={{ tabBarStyle: { backgroundColor: '#442380'},
    tabBarActiveTintColor: 'white',
    tabBarShowLabel: false}} >
      
      <Tabs.Screen /* Initializing home button */
        name="home"
        options={{
          unmountOnBlur:true,
          title: 'home',
          tabBarIcon: ({ color }) => (
            <AnimatedFontAwesome
              name="home"
              size={widthHome.value}
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

      <Tabs.Screen // initializing community button
        name="community"
        options={{
          unmountOnBlur:true,
          title: 'Community',
          tabBarIcon: ({ color }) => (
            <AnimatedFontAwesome
              name="group"
              size={widthCommunity.value}
              color={color}
              style={animatedStyleCommunity}
            />
          ),
          headerShown: false,
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
