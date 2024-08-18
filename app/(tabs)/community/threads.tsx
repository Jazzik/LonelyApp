import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useRef, useState } from "react";
import { eventEmitter } from "@/api/apiv1";
import { GiftedChat } from "react-native-gifted-chat";
export default function ThreadsScreen() {
  const [messages, setMessages] = useState<{ _id: number; text: string; createdAt: Date; user: { _id: number; name: string; avatar: string; }; }[]>([]);
  const flashListRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [timer, setTimer] = useState(300);
  
  useEffect(() => {
    // const fetchMessages = async () => {
    //   const messagesString = await AsyncStorage.getItem("messages");

    //   // console.log("threads", messagesString); // array of messages
    //   const messages = messagesString ? JSON.parse("["+messagesString+"]") : [];
    //   // console.log("press",Object.entries(messages))
    //   setMessages(messages);
    //   // console.log(messages);
    //   console.log("current state",isAtBottom)

    // };

    // eventEmitter.on("message", () => {
    //   fetchMessages();

    // });

    // fetchMessages();
    setMessages([
      {
        _id: 1,
        text: "Hello! How can I help you today?",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "",
        },
      },
      {
        _id: 2,
        text: "First text",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "",
        },
      },
    ]);

    return () => {
      // Cleanup actions if any
    };
  }, []);
  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };
  const scrollToEnd = () => {
    if (flashListRef.current) {
      flashListRef.current.scrollToEnd({ animated: true });
    }
  };
  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;

    // Check if user is at the bottom of the list
    if (contentOffsetY + layoutMeasurementHeight >= contentSizeHeight - 50) {
      setIsAtBottom(true);
      console.log(true);
    } else {
      setIsAtBottom(false);
      console.log(isAtBottom);
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id:2,
        }}
      />

      {/* <FlashList
        onContentSizeChange={isAtBottom ? scrollToEnd : undefined}
        data={messages}
        onScroll={handleScroll}
        // scrollEventThrottle={16}
        ref={flashListRef}
        // key={messages}
        
        
        renderItem={({ item }) => (
          // Assuming you have a component or a way to render each message
          <Text>{item['text']}</Text>
          
        )}
        estimatedItemSize={60}
      />
      {isAtBottom ? null : <Button title="Scroll to End" onPress={scrollToEnd} />} */}
    </View>
  );
}
