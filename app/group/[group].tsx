import React, { useEffect, useState, useCallback } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text,ActivityIndicator, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Avatar,GiftedChat,IMessage,InputToolbar, LoadEarlier,} from "react-native-gifted-chat";
import { eventEmitter, sendMessage } from "@/messenger/webSockets";
import { useSQLiteContext } from "expo-sqlite";
import { createTable, getDialog, addMessagesRaw } from "@/messenger/sql";
import {getMessages} from "@/apiv1/chats"
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserId } from "@/utils/storageActions";
import i18n from "@/locales/i18n";
import {objectifyMessages} from "@/utils/storageActions"

import { getAvatar } from "@/apiv1/apiv1";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
export default function ThreadsScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]); // Updated line with default parameter
  const [id, setId] = useState <string | number>(0);
  const [userAvatarUri, setUserAvatarUri] = useState<string>("");
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const getId = async () => {
    setId(await getUserId());
  };
  const db = useSQLiteContext();
  const { group_id, name } = useLocalSearchParams();
  const fetchData = async () => {
    setUserAvatarUri(await AsyncStorage.getItem("UserPhotoPath"))    // console.log(await getDialog(db, group_id));
    getId();
    createTable(db);
    const dialog = await getDialog(db, group_id)
    if (dialog.length > 0) {
    setMessages(dialog);
    }
    else{
      setIsLoadingEarlier(true)
      const earlierMessages = await getMessages(group_id,99999, 20); 
      await addMessagesRaw(db,earlierMessages);
      setMessages(await getDialog(db, group_id))
      setIsLoadingEarlier(false)
    }
  
    eventEmitter.on("message", async () => {
      setMessages(await getDialog(db, group_id));
    });
    // const members =  await getMembers(group_id);
    // members.forEach(async (member) => {
    //   const memberid = member.memberid;
    //   // getAvatar(memberid).then((avatar) => {
    //   //   addChat(db, group_id, memberid, avatar);
    //   // }
    //   //getAvatar(memberid)
    // });
    //setMessages(msgs.reverse())
  };
  

  useEffect(() => {
    fetchData();
   
  }, [isLoadingEarlier]);
  const defaultAvatar = require("@/assets/images/user/default-photo.png");

  const onLoadEarlier = useCallback( async () => {
      console.log("load earlier");
      setIsLoadingEarlier(true);
      const mess = await getDialog(db, group_id)
      const lastMessageId = mess[mess.length - 1]._id;  // Get last message id
      const earlierMessages = await getMessages(group_id,lastMessageId, 30);
      await addMessagesRaw(db,earlierMessages)
      const giftedMessages = objectifyMessages(earlierMessages);
      setMessages(GiftedChat.prepend(mess, giftedMessages));
      setIsLoadingEarlier(false);
    
  }, []);

    return (
      
      <SafeAreaView
        edges={["bottom"]}
        style={{ flex: 1, backgroundColor: Colors.dark.third_color }}
      >
        
        <View style={{ flex: 1 }}>
          <Stack.Screen
            options={{
              headerBackTitle: i18n.t("back"),
              title: "title",
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
              await sendMessage(group_id, newMessage[0].text);
              console.log(newMessage);
            }}
            
            // animateUsernameOnMessage={true}
            renderUsernameOnMessage={true}
            //   keyboardShouldPersistTaps={"never"}
            // showAvatarForEveryMessage={true}
          
            showUserAvatar={true}
            user={{
              _id: id,
              avatar: userAvatarUri,
              
              
            }}
            loadEarlier = {true}
            infiniteScroll={true}
            onLoadEarlier={onLoadEarlier}
            isLoadingEarlier={isLoadingEarlier}
            maxInputLength={250}
            //   renderAvatar={() => null}
            scrollToBottom={true}
            messagesContainerStyle={{
              backgroundColor: Colors.dark.background,
            }}
            
            renderInputToolbar={(props) => (
              <InputToolbar
                {...props}
                containerStyle={{
                  backgroundColor: Colors.dark.third_color,
                  opacity: 0.99,
                }}
              />
            )}
            
            alwaysShowSend={true}
          />
        </View>
      </SafeAreaView>
    );
  
}
