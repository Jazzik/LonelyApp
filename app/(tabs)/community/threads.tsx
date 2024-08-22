import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ThreadsScreen() {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const messagesString = await AsyncStorage.getItem('messages');
      const msgs = messagesString ? JSON.parse(messagesString) : [];
      setMessages(msgs); // Update loading state after setting messages
    };

    fetchData();
  }, []);

  if (!messages) {
    return <Text>Loading...</Text>; // Display a loading indicator while fetching data
  }

  return (
    <View style={{ height: '100%' }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessage) => {
          console.log(newMessage);
        }}
        user={{
          _id: 2,
          name: 'User',
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
    </View>
  );
}