import { Modal } from "react-native"
import { View, Button, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function CustomModal( {visible, title, description, onClose }: {visible:boolean,title:string, description:string, onClose:()=>void }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.dark.background,
    },
    scrollView: {
      flex: 1,
    },
    container1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.light.tabIconDefault,
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      alignItems: 'center',
    },
  });

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text>{title}</Text>
        </View>
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
}