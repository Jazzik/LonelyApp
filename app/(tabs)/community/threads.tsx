import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dict } from 'i18n-js';
import { eventEmitter } from '@/api/apiv1';
export default function ThreadsScreen() {
  const [messages, setMessages] = useState<[]>();
  useEffect(() => {
    const fetchData = async () => {
      
      let messagesString = await AsyncStorage.getItem('messages');
      let msgs = messagesString ? JSON.parse(messagesString) : [];
      setMessages(msgs.reverse())
      eventEmitter.on("message", async (message)=>{ 
        let messagesString = await AsyncStorage.getItem('messages');
        let msgs = messagesString ? JSON.parse(messagesString) : [];
        setMessages(msgs.reverse())
      })
      //setMessages(msgs.reverse())
    };

    fetchData();
  }, []);
  
  if (messages!=undefined) {
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
}