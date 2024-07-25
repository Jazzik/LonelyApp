import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { Image, View } from "react-native"; // Import the correct component for Image
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: Colors.dark.upper_background },
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: Colors.dark.upper_background },
        }}
      />
      <Stack.Screen
        name="tasks"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: Colors.dark.upper_background },
          headerBackTitle: "Back",
          headerBackTitleStyle: { fontSize: 20 },
        }}
      />
     
    </Stack>
  );
}
