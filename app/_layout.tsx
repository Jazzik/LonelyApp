import TaskPtogressBar from "@/components/headerItems/TaskPtogressBar";
import { Colors } from "@/constants/Colors";
import { Stack, useNavigation } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Platform } from "react-native";
export default () => {
  return (
    <SQLiteProvider databaseName="messages.db" >
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          //animation: Platform.OS === "android" ? "fade" : "default",
          headerShown: false,
          headerStyle: { backgroundColor: Colors.dark.upper_background },
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          //animation: Platform.OS === "android" ? "slide_from_right" : "default",
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
          //animation: Platform.OS === "android" ? "slide_from_right" : "default",
          // presentation: "transparentModal",
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
        
              <></>
         
          ),
        }}
      />
      <Stack.Screen
        name="taskPage"
        options={{
          animation:"slide_from_bottom",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.dark.upper_background,
          },
          headerTitle: () => (
            <TaskPtogressBar/>
        ),
          headerBackTitle: "Back",
          headerBackTitleStyle: { fontSize: 20 },
          
          headerBackTitleVisible: false,
          
        }}
      />
    </Stack>
  </SQLiteProvider>
  );
};
