import { View, Text, TextInput } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "react-native";
import { Link } from "expo-router";
import { getChats,addChat } from "@/messenger/sql";
import { useSQLiteContext } from "expo-sqlite";
export default function FriendsScreen() {
  const db = useSQLiteContext();
  const data = getChats(db)
  // addChat(db,1,"mac",'','18')
  // addChat(db,2,"Iphone",'','19')
  console.log(data)
  if (data){
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{ height: 50, width: "100%", backgroundColor: "purple" }}
      ></TextInput>
      <FlashList
        data={data}
        estimatedItemSize={50}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/[chat_id]",
              params: { chat_id: item.participants, name: item.name },
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 8,
                gap: 15,
              }}
            >
              <Image
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  borderColor: "red",
                  borderWidth: 2,
                }}
                source={require("@/assets/images/user/default-photo.png")}
              />

              <Text style={{ fontSize: 35 }}>{item.name}</Text>
            </View>
          </Link>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: "black" }} />
        )}
      />
    </View>
  );
}
}
