import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";


export const Punkboy1 = () => {
    
  return (
    <View >
      <Image source={require('@/assets/images/characters/punkboy/pb1.png')}
       style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 15,
  },
  image: {
    color: 'white',
    opacity: 1,
    width: 100, 
    height: 260,
  },
})
