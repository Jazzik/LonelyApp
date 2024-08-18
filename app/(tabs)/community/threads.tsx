import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { use } from "i18next";
import { useEffect, useRef, useState } from "react";

import { object } from "yup";
import { eventEmitter } from "@/api/apiv1";
export default function ThreadsScreen() {
  const [messages, setMessages] = useState([]);
  const flashListRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  useEffect(() => {
    const fetchMessages = async () => {
      const messagesString = await AsyncStorage.getItem("messages");
      
      // console.log("threads", messagesString); // array of messages
      const messages = messagesString ? JSON.parse("["+messagesString+"]") : [];
      // console.log("press",Object.entries(messages))

      setMessages(messages);
      // console.log(messages);
      console.log("current state",isAtBottom)
      // if (isAtBottom) {
      //   scrollToEnd();
      // }
      
    };
    
    eventEmitter.on("message", () => {
      fetchMessages();
      
    });

    fetchMessages();
    
    if (flashListRef.current) {
      flashListRef.current.scrollToEnd({ animated: true });
    }
    return () => {
      // Cleanup actions if any
    };
  }, []);
  
  
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
    if (contentOffsetY + layoutMeasurementHeight >= contentSizeHeight - 10) {
      setIsAtBottom(true);
      // console.log(true);
    } else {
      setIsAtBottom(false);
      // console.log(isAtBottom);
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <FlashList
        // onTouchEnd={()=>scrollToEnd()}
        // onScrollToTop={() => console.log("Scrolled to top")}
        // initialScrollIndex={30}
        
        
        // onLayout={ scrollToEnd}
        data={messages}
        // onScroll={handleScroll}
        // scrollEventThrottle={16}
        ref={flashListRef}
        // key={messages}
        renderItem={({ item }) => (
          // Assuming you have a component or a way to render each message
          <Text>{item['text']}</Text>
          
        )}
        estimatedItemSize={60}
      />
      {isAtBottom ? null : <Button title="Scroll to End" onPress={scrollToEnd} />}
      
    </View>
  );
}
