import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { Pressable, TouchableOpacity, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export function CustomBackButton({ press }: { press?: () => void }) {
  const router = useRouter();
  
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.circleButton,
          {
            shadowOffset: pressed
              ? { width: 0, height: 0 }
              : { width: 0, height: 7 },

            flex: pressed ? 0.8 : 0.9,
            transform: [{ translateY: pressed ? 5 : 0 }],
          }, // Change the colors as needed
        ]}
        onPress={() => {
          //if press exists, call it
          if (press) press();
          router.back();
        }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 80,
    height: 80,
    // borderRadius: 40,
    padding: 1,
    marginBottom: 5,
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
  },
  buttontext: {
    flex: 1,

    textAlign: "center",
    fontSize: 32,
    color: "#25292e",
    paddingTop: "15%",
    fontWeight: "600",
  },
});
