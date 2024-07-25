import i18n from "@/i18n";
import { Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default function CheckInternetConnection() {
  //return
  return (
    <Text style={{ ...style.text, color: Colors.dark.text }}>
      {i18n.t("check_internet_connection")}
    </Text>
  );
}

const style = StyleSheet.create({
  text: {
    textAlign: "left",
    fontSize: 18,
  },
});
