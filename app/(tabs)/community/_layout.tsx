import { Tabs } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import { Octicons } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
const AnimatedOctions = Animated.createAnimatedComponent(Octicons);
const AnimatedFontisto = Animated.createAnimatedComponent(Fontisto);
const AnimatedFontAwesome6 = Animated.createAnimatedComponent(FontAwesome6);
export default function CommunityLayout() {
  return (
    <Tabs
        screenOptions={{
         
          tabBarStyle: {
            // height: 50,  // Adjust the height to your desired size
            backgroundColor: Colors.dark.third_color,  // Set the background color
            alignItems: "center",  // Center content horizontally
            justifyContent: "center",  // Center content vertically
            // padding: -50,  // Remove any padding
            margin: -20,   // Remove any margin
          },
          
          tabBarActiveTintColor: Colors.dark.text,
          tabBarInactiveTintColor: Colors.light.text,
          }}
    >

        
      
      
      <Tabs.Screen  name="friends"
      options={{
        
        headerShown: false,
        tabBarIcon: ({ color }) => (
        <Fontisto name="hipchat" size={24} color={Colors.light.text} />

        )
      }
    }
       />
      <Tabs.Screen name="threads" 
      options={{
         headerShown: false,
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="hashtag" size={24} color={Colors.light.text}/>
        )
      }}
      />
    </Tabs>
  );
}
