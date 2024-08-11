import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";
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
  const HandlePressIn = () => {
    setBButtonTranslate(ShadowHeight || 12);
    setShadowDisabled(true);
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
          press();
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
          ]}
        >
          <Shadow
            distance={1}
            {...(ShadowBGColor
              ? { startColor: ShadowBGColor }
              : { startColor: "#d3d3d3" })}
            {...(ShadowHeight
              ? { offset: [0, ShadowHeight] }
              : { offset: [0, 12] })}
            disabled={shadowDisabled}
            stretch={true}
          >
            <Animated.View
              style={[
                styles.Button,
                ButtonBGColor ? { backgroundColor: ButtonBGColor } : {},
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
    width: 84,
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
    fontSize: 32,
    color: "#25292e",
    fontWeight: "800",
  },
});
