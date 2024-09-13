import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Vibration,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import makeColorDarker from "@/utils/makeColorDarker";
import { Shadow } from "react-native-shadow-2";
import * as Haptics from "expo-haptics";
export default function ({
  press,
  textColor,
  text,
  fontSize,
  fontWeight,
  ShadowHeight,
  ShadowBGColor,
  ButtonBGColor,
  ButtonBorderRadius,
  ButtonHeight,
  ButtonBorderWidth,
  ButtonContainerWidth,
  ButtonContainerHeight,
  accessible,
}: {
  press: () => void;
  textColor?: string;
  text: string;
  fontSize?: number;
  ShadowHeight?: number;
  ShadowBGColor?: string;
  ButtonBGColor?: string;
  ButtonBorderRadius?: number;
  ButtonHeight?: number;
  ButtonBorderWidth?: number;
  ButtonContainerWidth?: number;
  ButtonContainerHeight?: number;
  accessible?: boolean;
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | "ultralight"
    | "thin"
    | "light"
    | "medium"
    | "semibold"
    | "heavy"
    | "black";
}) {
  const [buttonTranslate, setBButtonTranslate] = useState(0);
  const [shadowDisabled, setShadowDisabled] = useState(false);
  const translateXButton = useSharedValue(0);
  const animatedStyleButton = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateXButton.value }, // Translate 10 pixels along the X axis
      ],
    };
  });

  const startWiggleAnimation = () => {
    translateXButton.value = withSequence(
      withTiming(5, { duration: 50 }), // Move right
      withTiming(-5, { duration: 50 }), // Move left
      withTiming(5, { duration: 50 }), // Move right
      withTiming(0, { duration: 50 }) // Return to starting position
    );
  };
  const HandlePressIn = () => {
    if (accessible) {
      setBButtonTranslate(ShadowHeight || 12);
      setShadowDisabled(true);
    } else {
      setBButtonTranslate(ShadowHeight ? ShadowHeight / 4 : 3);
    }
  };
  const HandlePressOut = () => {
    setBButtonTranslate(0);
    setShadowDisabled(false);
  };

  return (
    <View>
      <Pressable // button
        onPressIn={() => {
          HandlePressIn();
        }}
        onPress={() => {
          accessible
            ? (press(),
              Platform.OS === "ios"
                ? Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                  )
                : Vibration.vibrate([0, 10, 200, 0]))
                  
            : (startWiggleAnimation(),
              Platform.OS === "ios"
                ? Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                  )
                :
                Vibration.vibrate([0, 10, 200, 10, 200, 10]))
        }}
        onPressOut={() => {
          HandlePressOut();
        }}
      >
        <Animated.View
          style={[
            styles.ButtonContainer,
            ButtonContainerWidth ? { width: ButtonContainerWidth } : {},
            ButtonContainerHeight ? { height: ButtonContainerHeight } : {},
            animatedStyleButton,
          ]}
        >
          <Shadow
            distance={1}
            {...(accessible
              ? ShadowBGColor
                ? {
                    startColor: ShadowBGColor,
                  }
                : { startColor: "#808080" }
              : ShadowBGColor
              ? {
                  startColor: makeColorDarker(ShadowBGColor),
                }
              : { startColor: makeColorDarker("#808080") })}
            {...(ShadowHeight
              ? { offset: [0, ShadowHeight] }
              : { offset: [0, 12] })}
            disabled={shadowDisabled}
            stretch={true}
          >
            <Animated.View
              style={[
                styles.Button,
                accessible
                  ? ButtonBGColor
                    ? { backgroundColor: ButtonBGColor }
                    : {} //standart color
                  : ButtonBGColor
                  ? { backgroundColor: makeColorDarker(ButtonBGColor) }
                  : {
                      backgroundColor: makeColorDarker(
                        styles.Button.backgroundColor
                      ),
                    },
                ButtonBorderRadius ? { borderRadius: ButtonBorderRadius } : {},
                ButtonHeight ? { height: ButtonHeight } : {},
                ButtonBorderWidth ? { borderWidth: ButtonBorderWidth } : {},
                buttonTranslate
                  ? {
                      transform: [{ translateY: buttonTranslate }],
                    }
                  : {},
              ]}
            >
              <Text
                style={[
                  styles.ButtonText,
                  textColor ? { color: textColor } : null,
                  fontSize ? { fontSize: fontSize } : null,
                  fontWeight ? { fontWeight: fontWeight } : null,
                ]}
              >
                {text}
              </Text>
            </Animated.View>
          </Shadow>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    // width: 84,
    height: 84,
    justifyContent: "flex-end",
  },

  Button: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 21,
    borderWidth: 2,
    backgroundColor: "#f0f0f0",
    zIndex: 2,
  },
  ButtonText: {
    fontSize: 25,
    color: "#25292e",
    fontWeight: "800",
  },
});
