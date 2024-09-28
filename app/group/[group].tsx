import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Avatar,
  GiftedChat,
  IMessage,
  InputToolbar,
} from "react-native-gifted-chat";
import { eventEmitter, sendMessage } from "@/messenger/webSockets";
import { useSQLiteContext } from "expo-sqlite";
import { createTable, getDialog, addChat } from "@/messenger/sql";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserId } from "@/utils/storageActions";
import i18n from "@/i18n";
import { getAvatar, getMembers } from "@/api/apiv1";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
export default function ThreadsScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]); // Updated line with default parameter
  const [id, setId] = useState <string | number>(0);
  const [userAvatarUri, setUserAvatarUri] = useState<string>("");
  const getId = async () => {
    setId(await getUserId());
  };
  const db = useSQLiteContext();
  const { group_id, name } = useLocalSearchParams();
  const fetchData = async () => {
    setUserAvatarUri(await AsyncStorage.getItem("UserPhotoPath"))    // console.log(await getDialog(db, group_id));
    getId();
    createTable(db);
    setMessages(await getDialog(db, group_id));
    eventEmitter.on("message", async () => {
      setMessages(await getDialog(db, group_id));
    });
    console.log("use effect");
    const members =  await getMembers(group_id);
    console.log(members);
    members.forEach(async (member) => {
      const memberid = member.memberid;
      console.log(memberid);
      // getAvatar(memberid).then((avatar) => {
      //   addChat(db, group_id, memberid, avatar);
      // }
      getAvatar(memberid)
    });
    //setMessages(msgs.reverse())
  };
  

  useEffect(() => {
    fetchData();
   
  }, []);
  const defaultAvatar = require("@/assets/images/user/default-photo.png");

  if (messages != undefined) {
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
}
