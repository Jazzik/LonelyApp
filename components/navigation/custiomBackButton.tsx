import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { Pressable, TouchableOpacity, View, StyleSheet} from "react-native";
import { useRouter } from "expo-router";


export const CustomBackButton = ()=> {
  const router = useRouter();
  return (
  <View style={styles.circleButtonContainer}>
    <Pressable
      style={({ pressed }) => [
        styles.circleButton,
        {
          backgroundColor: pressed ? "#fff" : "#fff",
          shadowOffset: pressed
            ? { width: 0, height: 0 }
            : { width: 0, height: 3 },
          // shadowOpacity: pressed ? '0.5' : '1',
          flex: pressed ? 0.8 : 0.9,
          transform: [{ translateY: pressed ? 1 : 0 }],
          // width: pressed ? 84 : 90,
        }, // Change the colors as needed
      ]}
      onPress={
        () => {
          router.back()
        }
      }
    >
        <Ionicons name="arrow-back" size={24} color="black" />
    </Pressable>
  </View>
);
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 40,
    height: 40,
    // borderWidth: 4,
    // borderColor: '#ffd33d',
    borderRadius: 21,
    padding: 1,
    marginBottom: 5,
    // backgroundColor: 'grey'
    justifyContent: "flex-end",
  },
  circleButton: {
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowRadius: 0,
    shadowOpacity: 1,
    borderWidth: 1,
    borderColor: "#000",
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  buttontext: {
    flex: 1,
    // justifyContent: "flex",
    // borderColor: 'red',
    // borderWidth: 1,
    textAlign: "center",
    fontSize: 32,
    color: "#25292e",
    paddingTop: "15%",
    fontWeight: "600",
  },
});
