import React, { useCallback, useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftedChat, IMessage, InputToolbar, InputToolbarProps } from "react-native-gifted-chat";
import { Dict } from "i18n-js";
import { eventEmitter, sendMessage } from "@/messenger/webSockets";
import { useSQLiteContext } from "expo-sqlite";
import { createTable, getDialog, getMessages } from "@/messenger/sql";
import { Colors } from "@/constants/Colors";
import { InferProps, Requireable } from "prop-types";
export default function ThreadsScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]); // Updated line with default parameter
  const db = useSQLiteContext();
  const { chat_id, name } = useLocalSearchParams();
  
  const fetchData = async () => {
    console.log(await getDialog(db, 8));
    await createTable(db);
    setMessages(getMessages(db));
    eventEmitter.on("message", () => {
      console.log("message received");
      setMessages(getMessages(db));
    });
    console.log("use effect");
    //setMessages(msgs.reverse())
  };
  const CustomInputToolbar = (props: React.JSX.IntrinsicAttributes & Pick<InputToolbarProps<IMessage>, keyof InputToolbarProps<IMessage>> & Pick<InferProps<{ renderAccessory: Requireable<(...args: any[]) => any>; renderActions: Requireable<(...args: any[]) => any>; renderSend: Requireable<(...args: any[]) => any>; renderComposer: Requireable<(...args: any[]) => any>; onPressActionButton: Requireable<(...args: any[]) => any>; containerStyle: Requireable<number | boolean | object>; primaryStyle: Requireable<number | boolean | object>; accessoryStyle: Requireable<number | boolean | object>; }>, never> & Pick<InputToolbarProps<IMessage>, "options" | "optionTintColor">) => {
    return (
      <View>
        
      </View>
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  // const renderAvatar = (avatar = require('@/assets/images/user/default-photo.png')) => avatar;
  if (messages != undefined) {
    console.log("render");
    return (
    
      <View style={{ flex: 1}}>
        <Stack.Screen
          options={{
            title: "My home",
            headerStyle: { backgroundColor: "#f4511e" },
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
            await sendMessage("USER0.07130147202152248", newMessage[0].text);
          }}
          showUserAvatar={true}
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
          renderInputToolbar={(props) => <InputToolbar
            {...props}
            containerStyle={{backgroundColor:"red", opacity:0.99, }} />}
          alwaysShowSend={true}
          
          
        />
      </View>
      
    );
  }
}
