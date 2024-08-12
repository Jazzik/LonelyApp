import { Pressable, Text, View, Image, Platform, Vibration } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import Dart from "@/assets/svg/dart-board.svg";
import Gold from "@/assets/svg/gold.svg";
import Diamond from "@/assets/svg/diamond.svg";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation


interface HeaderItemsProps {
  dartValue: number;
  goldValue: number;
  diamondValue: number;
  userPhotoIsLoaded: boolean;
}
export function HeaderItems(props: HeaderItemsProps) {
  // give an array
  const {
    dartValue,
    goldValue,
    diamondValue,
    userPhotoIsLoaded: userPhoto,
  } = props;

  const navigator = useNavigation();

  const scalePhoto = useSharedValue(1);
  const scaleGold = useSharedValue(1);
  const scaleDart = useSharedValue(1);
  const scaleDiamonds = useSharedValue(1);
  
  const animatedStyleDart = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleDart.value }],
    };
  });

  const animatedStyleGold = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleGold.value }],
    };
  });

  const animatedStyleDiamonds = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleDiamonds.value }],
    };
  });

  const animatedStylePhoto = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scalePhoto.value }],
    };
  });
  const vibrations = () => {
    if (Platform.OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }if (Platform.OS === "android") {
          Vibration.vibrate([0, 10, 200, 0]);
        }
  }
  return (
    <View // header container
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        // justifyContent: "",
        // backgroundColor: "red",
        gap: 27,
        paddingBottom: 10,
      }}
    >
      <Pressable // dart
        onPressIn={() => {
          scaleDart.value = 0.9;
        }}
        onPress={() => {
          vibrations();
        }}
        onPressOut={() => {
          scaleDart.value = 1;
        }}
      >
        <Animated.View
          style={[
            { flexDirection: "row", gap: 5, alignItems: "flex-end" },
            animatedStyleDart,
          ]}
        >
          <Dart width={30} height={30} />
          <Text style={{ color: "white", fontSize: 26 }}>{dartValue}</Text>
        </Animated.View>
      </Pressable>

      <Pressable // gold
        onPressIn={() => {
          scaleGold.value = 0.9;
        }}
        onPress={() => {
          vibrations();
        }}
        onPressOut={() => {
          scaleGold.value = 1;
        }}
      >
        <Animated.View
          style={[
            { flexDirection: "row", gap: 5, alignItems: "flex-end" },
            animatedStyleGold,
          ]}
        >
          <Gold width={30} height={30} />
          <Text style={{ color: "white", fontSize: 26 }}>{goldValue}</Text>
        </Animated.View>
      </Pressable>

      <Pressable // diamond
        onPressIn={() => {
          scaleDiamonds.value = 0.9;
        }}
        onPress={() => {
         vibrations();
        }}
        onPressOut={() => {
          scaleDiamonds.value = 1;
        }}
      >
        <Animated.View
          style={[
            { flexDirection: "row", gap: 5, alignItems: "flex-end" },
            animatedStyleDiamonds,
          ]}
        >
          <Diamond width={30} height={30} />
          <Text style={{ color: "white", fontSize: 26 }}>{diamondValue}</Text>
        </Animated.View>
      </Pressable>

      <Pressable // user photo
        onPressIn={() => {
          scalePhoto.value = 0.9;
        }}
        onPress={() => {
          vibrations();
          navigator.navigate("user_profile");
        }}
        onPressOut={() => {
          scalePhoto.value = 1;
        }}
      >
        <Animated.View
          style={[
            {
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "red",
            },
            animatedStylePhoto,
          ]}
        >
          <View
            style={{
              width: 60, // Circle size
              height: 60, // Circle size
              borderRadius: 30, // Half of the width/height to make it a circle
              backgroundColor: Colors.dark.background, // Circle color
              justifyContent: "center", // Center the image vertically
              alignItems: "center",
              marginRight: 20, // Center the image horizontally
            }}
          >
            <Image
              source={
                userPhoto
                  ? require("@/assets/images/user/user-photo.png")
                  : require("@/assets/images/user/default-photo.png")
              }
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                borderColor: "white",
                borderWidth: 2,
              }}
            />
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}
