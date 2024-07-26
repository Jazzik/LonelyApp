import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import StatusBar from "expo-status-bar";
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import CircleButton from "@/components/CircleButton";
export default function Tasks() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        // onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        <Animated.View>
          <Animated.View
            // entering={FadeIn.duration(100)}
            // exiting={FadeOut.duration(1000)}
            style={styles.container}
          >
            <View style={{ flex: 1, alignItems: "flex-start", height: 150 }}>
              <CircleButton
                onPress={() => navigation.navigate("settings")}
                text="1"
              />
            </View>

            <View style={{ flex: 1, alignItems: "flex-end", height: 150 }}>
              <CircleButton
                onPress={() => navigation.navigate("settings")}
                text="2"
              />
            </View>

            <View style={{ flex: 1, alignItems: "flex-start", height: 150 }}>
              <CircleButton
                onPress={() => navigation.navigate("settings")}
                text="3"
              />
            </View>

            <View style={{ flex: 1, alignItems: "flex-end", height: 150 }}>
              <CircleButton
                onPress={() => navigation.navigate("settings")}
                text="3"
              />
            </View>

            <View style={{ flex: 1, alignItems: "flex-start", height: 150 }}>
              <CircleButton
                onPress={() => navigation.navigate("settings")}
                text="3"
              />
            </View>

            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <CircleButton
                onPress={() => navigation.navigate("settings")}
                text="3"
              />
            </View>
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
});
