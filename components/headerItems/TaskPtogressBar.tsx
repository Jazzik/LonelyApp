import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
export default function () {
  return (
    <View>
      <FlashList
        horizontal={true}
        estimatedItemSize={5}
        data={[{"progress":"100"}, {"progress":"100"}, {"progress":"40"}, {"progress":"0"}, {"progress":"0"}]}
        renderItem={(item) => (
          <View
            style={{
              height: 25,
              width: 50,
              backgroundColor: "white",
              marginRight: 10,
              borderRadius: 10,
              overflow: "hidden",

            }}
          >
            <View
              style={{
                height: 25,
                width: `${item.item.progress}%`, // Convert to number
                backgroundColor: "green",
                marginRight: 10,
              }}>
            </View>
          </View>
        )}
      />
    </View>
  );
}
