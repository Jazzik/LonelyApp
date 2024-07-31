import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";
export default function HomeLayout() {
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

      <Stack.Screen
        name="tasks"
        options={{
          
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.dark.upper_background,
          },
          headerBackTitle: "Back",
          headerBackTitleStyle: { fontSize: 20 },
          
          headerBackTitleVisible: false,
          
        }}
      />
    </Stack>
  );
}
