import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { CustomBackButton } from "@/components/navigation/custiomBackButton";
import { useNavigation } from "expo-router";
import { getUserId } from "@/utils/storageActions";
export default function UserProfileLayout() {
  const [id, setId] = useState<String>("0");
  const getId = async () => {
    setId(await getUserId());
  };

  useEffect(() => {
    getId();
  }, []);
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
          headerShown: true,
          title: `ID: ${id}`,
        }}
      />
    </Stack>
  );
}
