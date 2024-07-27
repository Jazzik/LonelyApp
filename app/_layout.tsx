import { HeaderItems } from "@/components/headerItems/HeaderItems";
import { CustomBackButton } from "@/components/navigation/custiomBackButton";
import { Colors } from "@/constants/Colors";
import { Stack, useNavigation } from "expo-router";
import { Image, View } from "react-native"; // Import the correct component for Image

export default () => {
  return (
    <Stack screenOptions={{}}>
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
        name="user_profile"
        options={{
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: Colors.dark.upper_background,
          },

          headerBackButtonMenuEnabled: true,
          headerBackTitleVisible: true,
          headerBackVisible: false,
          // headerBackButtonMenuEnabled: true,
          headerShown: true,
          headerLeft: () => (
        
              <CustomBackButton navigation={useNavigation()} />
         
          ),
        }}
      />
    </Stack>
  );
};
