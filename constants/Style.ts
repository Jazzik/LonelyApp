import { StyleSheet } from "react-native";
import {Colors} from "@/constants/Colors";

export const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.dark.background,
      flex: 1,
      position: "relative", // Ensure the container is relative
    },
    buttonContainer: {
      position: "absolute",
    },
    loadingContainer: {
      flex: 1,
      // backgroundColor: 'red',
    },
    scrollView: {
      flex: 1,
    },
    content: {
      flex: 1,
      flexGrow: 1,
      padding: 20,
    },
    item: {
      height: 100,
      marginBottom: 20,
      backgroundColor: "#f9c2ff",
      justifyContent: "center",
      alignItems: "center",
    },
    itemText: {
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  export const loginStyles = StyleSheet.create({
    loginContainer: {
      flex: 1,
      marginTop: "60%",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    loginScrollView: {
      flex: 1,
      backgroundColor: Colors.dark.upper_background,
    },
    loginBox: {
      backgroundColor: "#fff",
      borderColor: "#000",
      borderWidth: 1,
      width: 300,
      borderRadius: 20,
    },
    loginItem: {
      backgroundColor: "#fff",
      paddingHorizontal: 16,
      paddingVertical: 24,
      color: "#000",
    },
    loginContent: {
      flexGrow: 1,
      padding: 20,
    },
    loginButton: {
      width: 300,
      height: 44,
      marginTop: 20,
    },
    loginErrorText: {
      color: "red",
      paddingHorizontal: 16,
      paddingTop: 8,
    },
  });