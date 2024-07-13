import { useState } from "react";
import { View, Text,StyleSheet } from "react-native";
import Animated,{interpolate, useSharedValue} from "react-native-reanimated";
export function ChallengeBar({progress,title}){
    const [isEnabled, setIsEnabled] = useState(false);
    return (    
    <View style={styles.container}>
        <Text style={styles.label}>{title}</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width:`${progress}%`},
              { backgroundColor: isEnabled ? '#81b0ff' : '#767577' }
            ]}
          />
        </View>
    </View>);


}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
  },
})