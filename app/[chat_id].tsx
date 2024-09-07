import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text,  Keyboard, KeyboardAvoidingView, Platform, Animated,  } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
} from "react-native-gifted-chat";
import { Dict } from "i18n-js";
import { eventEmitter, sendMessage } from "@/messenger/webSockets";
import { useSQLiteContext } from "expo-sqlite";
import { createTable, getDialog, getChats, getMessages, addChat } from "@/messenger/sql";
import { Colors } from "@/constants/Colors";
import { InferProps, Requireable } from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ThreadsScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]); // Updated line with default parameter
  const db = useSQLiteContext();
  const { chat_id, name } = useLocalSearchParams();

  const fetchData = async () => {
    console.log(await getDialog(db, chat_id));
    console.log(await AsyncStorage.getItem("userId"));
    createTable(db);
    setMessages(getMessages(db));
    eventEmitter.on("message", () => {
      setMessages(getMessages(db));
    });
    console.log("use effect");
    //setMessages(msgs.reverse())
  };
  
  useEffect(() => {
    fetchData();
    
  }, []);
  // const renderAvatar = (avatar = require('@/assets/images/user/default-photo.png')) => avatar;
  if (messages != undefined) {
    console.log("render");
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
            await sendMessage( Number(chat_id), newMessage[0].text);
          }}
          showUserAvatar={true}
        //   keyboardShouldPersistTaps={"never"}
          // showAvatarForEveryMessage={true}
          // renderAvatar={() => null}
          // renderAvatarOnTop={true}
          user={{
            _id: 8,
          }}
          //   renderAvatar={() => null}
          scrollToBottom={true}
          messagesContainerStyle={{
            backgroundColor: Colors.dark.background,
          }}
          renderLoading={() => <Text>Loading</Text>}
          loadEarlier={true}
          onLoadEarlier={() => console.log("load earlier")}
          renderLoadEarlier={() => <Text>Load earlier</Text>}
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
