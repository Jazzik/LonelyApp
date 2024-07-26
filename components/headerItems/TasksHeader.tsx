import { Pressable, Text, View, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface TasksProps {
  tasksGroupName: string;
}
export default function TasksHeader(props: TasksProps) {
  // give an array
  const { tasksGroupName } = props;


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
        // flexDirection: "column",
        alignItems: "center",
        // justifyContent: "",
        // backgroundColor: "red",
        gap: 0,
        paddingBottom: 5,
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
        <Animated.View
          style={[
            {  },
            animatedStyleName,
          ]}
        >
          <Text style={{ color: "white", fontSize: 26 }}>{tasksGroupName}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}
