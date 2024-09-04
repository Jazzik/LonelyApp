import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Dict } from 'i18n-js';
import { eventEmitter, sendMessage} from '@/messenger/webSockets';
import { useSQLiteContext } from "expo-sqlite"
import {createTable, getMessages} from "@/messenger/sql"
export default function ThreadsScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]); // Updated line with default parameter
  const db = useSQLiteContext();
  useEffect(() => {
    setMessages([]);
    const fetchData = async () => {
      await createTable(db);
      setMessages(getMessages(db));
      eventEmitter.on("message", () => {
        console.log("message received");
        setMessages(getMessages(db));
      });
      console.log("use effect");
      //setMessages(msgs.reverse())
    };

    fetchData();
  }, []);
  // const renderAvatar = (avatar = require('@/assets/images/user/default-photo.png')) => avatar;
  if (messages != undefined) {
    console.log("render")
    return (
      <GiftedChat
        messages={messages}
        onSend={async (newMessage) => {
          await sendMessage('USER0.07130147202152248', newMessage[0].text);
        }}
        showUserAvatar={false}
        // showAvatarForEveryMessage={true}
        // renderAvatar={() => null}
        // renderAvatarOnTop={true}
        user={{
          _id: 8,
          
        }}
      />
    );
  }
}