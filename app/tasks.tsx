import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import StatusBar from "expo-status-bar";
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
export default function Tasks() {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        // onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        <Animated.View style={[styles.content]}>
          <Animated.View
            // entering={FadeIn.duration(100)}
            // exiting={FadeOut.duration(1000)}
            style={styles.container}
          >
            <Text>sdfghjklasd.;adka</Text>
          </Animated.View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
