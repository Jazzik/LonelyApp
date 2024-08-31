import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
export default function FriendsScreen() {
  return (
    <View style={{flex:1}}>
     <FlashList 
      data={[
        {id: 1, name: "John Doe"},
        {id: 2, name: "Jane Doe"},
        {id: 3, name: "John Smith"},
        {id: 4, name: "Jane Smith"},
        {id: 5, name: "John Johnson"},
        {id: 6, name: "Jane Johnson"},
        {id: 7, name: "John Brown"},
        {id: 8, name: "Jane Brown"},
        {id: 9, name: "John White"},
        {id: 10, name: "Jane White"},
        {id: 11, name: "John Black"},
        {id: 12, name: "Jane Black"},
        {id: 13, name: "John Green"},
        {id: 14, name: "Jane Green"},
        {id: 15, name: "John Blue"},
        {id: 16, name: "Jane Blue"},
        {id: 17, name: "John Red"},
        {id: 18, name: "Jane Red"},
        {id: 19, name: "John Yellow"},
        {id: 20, name: "Jane Yellow"},
        {id: 21, name: "John Orange"},
        {id: 22, name: "Jane Orange"},
        {id: 23, name: "John Purple"},
        {id: 24, name: "Jane Purple"},
        {id: 25, name: "John Pink"},
        {id: 26, name: "Jane Pink"},
        {id: 27, name: "John Gray"},
        {id: 28, name: "Jane Gray"},
        {id: 29, name: "John Silver"},
        {id: 30, name: "Jane Silver"},
        {id: 31, name: "John Gold"},
        {id: 32, name: "Jane Gold"},
        {id: 33, name: "John Copper"},
        {id: 34, name: "Jane Copper"},
        {id: 35, name: "John Iron"},
        {id: 36, name: "Jane Iron"},
        {id: 37, name: "John Aluminum"},
        {id: 38, name: "Jane Aluminum"},
      ]}
      renderItem={({item}) => <Text>{item.name}</Text>}

     />
    </View>
  );
}
