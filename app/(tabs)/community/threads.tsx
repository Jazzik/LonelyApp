import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftedChat } from "react-native-gifted-chat";

export default function ThreadsScreen() {
  const [messages, setMessages] = useState<{ _id: number; text: string; createdAt: Date; user: { _id: number; name: string; avatar: string; }; }[]>([]);

  useEffect(() => {
    setMessages([])
    const fetchData = async () => {
      const messagesString = await AsyncStorage.getItem("messages");
      const msgs = messagesString ? JSON.parse(messagesString) : [];
      console.log(msgs);
      setMessages(msgs.reverse()); // Update loading state after setting messages
    };

    fetchData();
  }, []);

  const onSend = useCallback((messages: never[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])
  
  // if (messages.length <= 0) {
  //   return <Text>Loading...</Text>; // Display a loading indicator while fetching data
  // }

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
