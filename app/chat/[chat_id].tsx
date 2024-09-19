import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Avatar,
  GiftedChat,
  IMessage,
  InputToolbar,
} from "react-native-gifted-chat";
import { eventEmitter, sendMessage } from "@/messenger/webSockets";
import { useSQLiteContext } from "expo-sqlite";
import { createTable, getDialog, getMessages, addChat } from "@/messenger/sql";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserId } from "@/utils/storageActions";
export default function ThreadsScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]); // Updated line with default parameter
  const [id, setId] = useState<number | null>(null);
  const getId = async () => {
    setId(await getUserId());
  };
  const db = useSQLiteContext();
  const { group_id, name } = useLocalSearchParams();
  const fetchData = async () => {

    getId();
    createTable(db);
    setMessages(getMessages(db));
    eventEmitter.on("message", () => {
      setMessages(getMessages(db));
    });

    //setMessages(msgs.reverse())
  };
  
  useEffect(() => {
    fetchData();
    
  }, []);
  const defaultAvatar = require('@/assets/images/user/default-photo.png');

  if (messages != undefined) {
    
    return (
    <SafeAreaView 
    edges={["bottom", ]}
    
    style={{flex: 1,
        backgroundColor: Colors.dark.third_color}}>
      <View style={{ flex: 1, }}>
        <Stack.Screen
          options={{
            title: "My home",
            headerStyle: { backgroundColor: Colors.dark.upper_background },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },

            headerTitle: (props) => <Text {...props}>{name}</Text>,
          }}
        />
        <GiftedChat
        
          messages={messages}
          onSend={async (newMessage) => {
            console.log("send message", newMessage);
            await sendMessage( group_id, newMessage[0].text);
            console.log(newMessage);
          }}
          animateUsernameOnMessage={true}
          
        //   keyboardShouldPersistTaps={"never"}
          // showAvatarForEveryMessage={true}
          renderAvatar={(props) => <Avatar {...props} src={require('@/assets/images/user/default-photo.png')} style={{ width: 50, height: 50 }} />} // show avatar with default image
          // renderAvatarOnTop={true}
          user={{
               _id: id,
               avatar: defaultAvatar
              // _id: 3,
          }}
          maxInputLength={250}
          //   renderAvatar={() => null}
          scrollToBottom={true}
          messagesContainerStyle={{
            backgroundColor: Colors.dark.background,
          }}
          showUserAvatar={true}
          
          
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={{  backgroundColor: Colors.dark.third_color, opacity: 0.99, }}
            />
          )}
          alwaysShowSend={true}
        />
        </View>
      </SafeAreaView>
    );
  }
}
