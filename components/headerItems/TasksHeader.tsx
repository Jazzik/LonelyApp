import { Pressable, Text, View, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { CustomBackButton } from "../navigation/custiomBackButton";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";

interface TasksProps {
  tasksGroupName: string|string[]|undefined;
  navigation: any;
}
export default function TasksHeader(props: TasksProps) {
  // give an array
  const { tasksGroupName, navigation } = props;

  const scaleName = useSharedValue(1);

  const animatedStyleName = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleName.value }],
    };
  });

  return (
    <View // header container
      style={{
        // flex: 1,
        flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "",
        // backgroundColor: "red",
        backgroundColor: Colors.dark.third_color,
        gap: 10,
        paddingBottom: 5,
        // marginBottom: 10,
        borderRadius: 15,
        height: 50,
        
      }}
    >
      <View
        style={{
          paddingLeft: 10,
          justifyContent: "center",
          // backgroundColor: "red"
        }}
      >
        <CustomBackButton navigation={navigation} />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "left",
          paddingLeft: 20,
        }}
      >
        <Pressable // name
          onPressIn={() => {
            scaleName.value = 0.9;
          }}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          onPressOut={() => {
            scaleName.value = 1;
          }}
        >
          <Animated.View style={[{}, animatedStyleName]}>
            <Text style={{ color: "white", fontSize: 26 }}>
              {tasksGroupName}
            </Text>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}
