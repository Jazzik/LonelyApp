import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Dict } from 'i18n-js';
import { eventEmitter, sendMessage} from '@/messenger/webSockets';
import { useSQLiteContext } from "expo-sqlite"
import {createTable,addMessageObject, getMessages} from "@/messenger/sql"
export default function ThreadsScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const db = useSQLiteContext();

  useEffect(() => {
    setMessages([])
    const fetchData = async () => {
      await createTable(db)
      setMessages(getMessages(db))
      eventEmitter.on("message", ()=>{ 
        console.log("message received")
        setMessages(getMessages(db))
      })
      console.log("use effect")
      //setMessages(msgs.reverse())
    };

    fetchData();
  }, []);  
  if (messages!=undefined) {
  return (
    // <View style={{ height: "100%" }}>
      <GiftedChat
        messages={messages}
        onSend={async (newMessage) => {
          console.log(newMessage)
          await sendMessage('USER0.07130147202152248',newMessage[0].text) 
          
        }}
        user={{
          _id: 8,
        }}
      />
    // </View>
  );
}
}