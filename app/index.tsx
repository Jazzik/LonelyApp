import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';

console.log('index.tsx');

const checkLoginStatus = async () => {
  
  const token = await AsyncStorage.getItem('userToken');
  // let token = false;
  console.log('token is: ', token);
  if (token) {
    console.log('token found: ', token);
    // Optionally validate the token
    // Navigate to the home screen or wherever appropriate
    return '/home';
  } else {
    console.log('token not found');
    return '/login';
  }
}

export default function HomeScreen() {
  const [url, setUrl] = useState<"/home" | "/login" | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      const url = await checkLoginStatus();
      setUrl(url);
    };
    fetchUrl();
  }, []);

  if (!url) {
    return <View><Text>Loading...</Text></View>; // Or any other loading state
  }

  return (
    <Redirect href={url}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
});