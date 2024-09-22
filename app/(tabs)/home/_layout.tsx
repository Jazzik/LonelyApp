import { downloadFile } from "@/api/apiv1";
import { Colors } from "@/constants/Colors";
import { getUserId } from "@/utils/storageActions";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { storeDataToStorage } from "@/utils/storageActions";
import { use } from "i18next";

export default function HomeLayout() {
  


  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          animation: Platform.OS === "android" ? "slide_from_right" : "default",
          headerBackTitle: "Back",
          headerBackButtonMenuEnabled: true,
          headerBackTitleVisible: true,
          headerBackVisible: true,
          // headerBackButtonMenuEnabled: true,
          headerShown: false,
          // animation: "slide_from_bottom",
        }}
      />

      <Stack.Screen
        name="tasks"
        options={{
          animation: Platform.OS === "android" ? "slide_from_right" : "default",
          // presentation: "containedModal",
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
