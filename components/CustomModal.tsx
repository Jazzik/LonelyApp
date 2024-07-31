import { Modal } from "react-native"
import { View, Button, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import Animated from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
export default function CustomModal( {visible, title, description, onClose }: {visible:boolean,title:string, description:string, onClose:()=>void }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.dark.background,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      left: 10,
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

    },
    descContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',

    },
    modalContent: {
      width: '80%',
      padding: 20,
      height:'70%',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      alignItems: 'center',
    },
    textTitle:{
      fontSize: 20,
    },
    textDescription:{
      marginBottom:0
    }
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
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close-circle" size={30} color="black" />
        </TouchableOpacity>
          <Text style={styles.textTitle}>{title}</Text>
          <Animated.ScrollView
        // onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
          <Animated.View style={styles.descContainer} >
          <Text style={styles.textDescription}>{description}</Text>
          <Button title="Start" onPress={onClose} />
          </Animated.View>
        </Animated.ScrollView>
        </View>
      </View>
    </Modal>
  );
  
}
