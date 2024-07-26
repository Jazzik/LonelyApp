import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import {styles} from "@/constants/Style"

export default function UserProfile() {
  return (
    <View style={styles.container}>
      <Animated.ScrollView >
        <Text>Profile of user page</Text>
      </Animated.ScrollView>
    </View>
  );
}
