import TasksHeader from "@/components/headerItems/TasksHeader";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import React from "react";
import { CustomBackButton } from "@/components/navigation/custiomBackButton";
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
          headerTitle: () => <TasksHeader tasksGroupName="Some name" />,
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.dark.upper_background,
          },
          headerBackTitle: "Back",
          headerBackTitleStyle: { fontSize: 20 },
          headerLeft: () => <CustomBackButton navigation={useNavigation()} />,
          headerBackTitleVisible: false,
          
        }}
      />
    </Stack>
  );
}
