import { View, Text, Pressable, Button } from "react-native";
import Animated from "react-native-reanimated";
import {styles} from "@/constants/Style"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {  useNavigationContainerRef } from "expo-router";
import { resetStorage } from "@/utils/storageActions";
export default function UserProfile() {
  const router = useNavigationContainerRef();
const LogOutUser = async () => {
  resetStorage();
  router.reset({ index: 0, routes: [{ name: "login" }] });
}
  return (
    <View style={styles.container}>
      <Animated.ScrollView >
        <Pressable >
          <Button onPress={LogOutUser}
          title="LogOut"/>
        </Pressable>
        <Text>Profile of user page</Text>
      </Animated.ScrollView>
    </View>
  );
}
