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
    <Tabs>
      <Tabs.Screen 
      options={{tabBarIcon: ({ color }) => (
        <Fontisto name="hipchat" size={24} color={Colors.light.text} />

        )}}
      name="friends"  />
      <Tabs.Screen name="threads" 
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="hashtag" size={24} color={Colors.light.text}/>
        )
      }}
      />
    </Tabs>
  );
}
