import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
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
