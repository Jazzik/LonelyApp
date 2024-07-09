import { View, Pressable, StyleSheet, TextComponent } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text } from 'react-native';
export default function CircleButton({ onPress, text }) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={({ pressed }) => [
          styles.circleButton,
          { backgroundColor: pressed ? '#fff' : '#fff', 
            shadowOffset: pressed ? { width: 0, height: 0 } : { width: 0, height: 10 },
            // shadowOpacity: pressed ? '0.5' : '1',
            flex: pressed ? 0.8 : 0.9,
            transform: [{ translateY: pressed ? 7 : 0 }],
            // width: pressed ? 84 : 90,
          }, // Change the colors as needed
        ]} onPress={onPress}>
  
        <Text style={styles.buttontext}>{text}</Text> 
        
         
        {/* <MaterialIcons name="add" size={38} color="#25292e" /> */}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    
    width: 84,
    height: 84,
    marginHorizontal: 60,
    // borderWidth: 4,
    // borderColor: '#ffd33d',
    borderRadius: 21,
    padding: 3,
    // backgroundColor: 'grey'
    justifyContent: 'flex-end',
    
  },
  circleButton: {
    height: 10,
    shadowColor: 'darkgrey',
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    borderWidth: 1,
    borderColor: '#000',
    flex: 0.8,
    // justifyContent: 'end',
    // alignItems: 'flex-end',
    borderRadius: 21,
    backgroundColor: '#fff',
    
  },
  buttontext: {
    flex: 1,
    justifyContent: 'flex',
    // borderColor: 'red',
    // borderWidth: 1,
    textAlign: 'center',
    fontSize: 32,
    color: '#25292e',
    paddingTop: "15%",
    fontWeight: '600',
    
  }
});
