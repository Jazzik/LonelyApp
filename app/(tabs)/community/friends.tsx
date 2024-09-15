import { View, Text, TextInput } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "react-native";
import { Link } from "expo-router";
import { getLocalChats, addChat } from "@/messenger/sql";
import { useSQLiteContext } from "expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useEffect,useState } from "react";
export default function FriendsScreen() {
  const db = useSQLiteContext();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    setData(await getLocalChats(db));
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (data) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.dark.background }}
      >
        <View
          style={{
            backgroundColor: "none",
            paddingVertical: 5,
            paddingHorizontal: 35,
          }}
        >
          <TextInput
            style={{
              height: 25,
              width: "100%",
              backgroundColor: Colors.dark.third_color,
              borderRadius: 25,
              paddingHorizontal: 10,
              color: Colors.dark.text,
            }}
            placeholder="Search"
            placeholderTextColor={Colors.dark.text}
          ></TextInput>
        </View>
        <FlashList
          data={data}
          estimatedItemSize={50}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: Colors.dark.upper_background,
                margin: 10,
                borderRadius: 15,
              }}
            >
              <Link
                href={{
                  // pathname: "/[chat_id]",
                  // params: { chat_id: item.participants, name: item.name },
                  pathname: "/group/[group]",
                  params: { group_id: item.id, name: item.name },
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
                      borderColor: "black",
                      borderWidth: 2,
                    }}
                    source={require("@/assets/images/user/default-photo.png")}
                  />

                  <Text style={{ fontSize: 35 }}>{item.name}</Text>
                </View>
              </Link>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "black" }} />
          )}
        />
      </SafeAreaView>
    );
  }
}
