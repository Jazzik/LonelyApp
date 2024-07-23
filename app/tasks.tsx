import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
export default function Tasks(){
  const nav = useNavigation()
  return (
    <View>
      <Text>New Screen</Text>
      <Button
        title="Go Back"
        onPress={() => nav.goBack()}
      />
    </View>
  );
}