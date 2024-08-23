import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dict } from 'i18n-js';
import { eventEmitter } from '@/api/apiv1';
export default function ThreadsScreen() {
  const [messages, setMessages] = useState<[]>();
  useEffect(() => {
    setMessages([])
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

  const onSend = useCallback((messages: never[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages) as [] | undefined,
    )
  }, [])
  
  // if (messages.length <= 0) {
  //   return <Text>Loading...</Text>; // Display a loading indicator while fetching data
  // }


  
  if (messages!=undefined) {
  return (
    // <View style={{ height: "100%" }}>
      <GiftedChat
        messages={messages}
        
        renderChatFooter={() => <Text style={{color: 'red'}}>Footer </Text>}
        renderChatEmpty={() => (
          <View>
            <Text style={{color: 'red'}}>No messages yet</Text>
          </View>
        )}
        
        onSend={messages => onSend(messages)}
        user={{
          _id: 2,
          
          
        }}
      />
    // </View>
  );
}
}