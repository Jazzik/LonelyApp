import { Stack } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function UserProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerBackTitle: "Back",
          headerBackButtonMenuEnabled: true,
          headerBackTitleVisible: true,
          headerBackVisible: true,
          // headerBackButtonMenuEnabled: true,
          headerShown: false,
        }}
      />
      
    </Stack>
  );
}
