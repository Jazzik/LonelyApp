import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
export default function ({
  press,
  buttonColor,
  buttonShadowColor,
  textColor,
  text,
  fontSize,
  fontWeight,
  ShadowHeightOnPressIn,
  ShadowOpacityOnPressIn,
  ButtonTranslateOnPressIn,
  ShadowHeightOnPressOut,
  ShadowOpacityOnPressOut,
  ButtonTranslateOnPressOut,
  ShadowBorderWidth,
  ShadowBtmRightRadius,
  ShadowBtmLeftRadius,
  ShadowMarginTop,
  ShadowBGColor,
  ButtonBGColor,
  ButtonBorderRadius,
  ButtonHeight,
  ButtonBorderWidth,
  ButtonContainerWidth,
  ButtonContainerHeight
}: { 
  press: () => void;
  buttonColor?: string;
  buttonShadowColor?: string;
  textColor?: string;
  text: string;
  fontSize?: number;
  ShadowHeightOnPressIn?: number;
  ShadowOpacityOnPressIn?: number;
  ButtonTranslateOnPressIn?: number;
  ShadowHeightOnPressOut?: number;
  ShadowOpacityOnPressOut?: number;
  ButtonTranslateOnPressOut?: number;
  ShadowBorderWidth?: number;
  ShadowBtmRightRadius?: number;
  ShadowBtmLeftRadius?: number;
  ShadowMarginTop?: number;
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
  const buttonTranslate = useSharedValue(ButtonTranslateOnPressOut || 0);
  const shadowHeight = useSharedValue(ShadowHeightOnPressOut || 40);
  const shadowOpacity = useSharedValue(ShadowOpacityOnPressOut || 1);
  const animatedStyleShadow = useAnimatedStyle(() => {
    return {
      height: shadowHeight.value,
      opacity: shadowOpacity.value,
      transform: [
        {
          translateY: buttonTranslate.value,
        },
      ],
    };
  });

  return (
    <Pressable // button
        onPressIn={() => {
          // buttonTranslate.value = withSpring(10);
          shadowHeight.value = withSpring(ShadowHeightOnPressIn || 28);
          shadowOpacity.value = withSpring(ShadowOpacityOnPressIn || 0.8);
          buttonTranslate.value = withSpring(ButtonTranslateOnPressIn || -1);
        }}
        onPress={() => {
          press();
        }}
        onPressOut={() => {
          shadowHeight.value = withSpring(ShadowHeightOnPressOut || 40);
          shadowOpacity.value = withSpring(ShadowOpacityOnPressOut || 1);
          buttonTranslate.value = withSpring(ButtonTranslateOnPressOut || 0);
        }}
      >
    <View style={[styles.ButtonContainer, 
    ButtonContainerWidth ? { width: ButtonContainerWidth } : {},
    ButtonContainerHeight ? { height: ButtonContainerHeight } : {},
    ]}>
      
        <Animated.View style={[styles.Button, 
            ButtonBGColor ? { backgroundColor: ButtonBGColor } : {},
            ButtonBorderRadius ? { borderRadius: ButtonBorderRadius } : {},
            ButtonHeight ? { height: ButtonHeight } : {},
            ButtonBorderWidth ? { borderWidth: ButtonBorderWidth } : {},
            ]}>
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
      

      <Animated.View // shadow
        style={[
          { ...styles.ButtonShadow },
          ShadowBorderWidth ? { borderWidth: ShadowBorderWidth}: {},
          ShadowBtmRightRadius ? {borderBottomRightRadius: ShadowBtmRightRadius}: {},
          ShadowBtmLeftRadius ? {borderBottomLeftRadius: ShadowBtmLeftRadius}: {},
          ShadowMarginTop ? { marginTop: ShadowMarginTop } : {},
          ShadowBGColor ? { backgroundColor: ShadowBGColor } : {},

          animatedStyleShadow,
        ]}
      />
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    width: 84,
    height: 84,
    // marginHorizontal: 60,
    justifyContent: "flex-end",
  },

  Button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 21,
    borderWidth: 2,
    backgroundColor: "#f0f0f0",
  },

  ButtonShadow: {
    borderWidth: 1,
    borderBottomLeftRadius: 21,
    borderBottomRightRadius: 21,
    position: "relative",
    zIndex: -1,
    marginTop: -29,
    backgroundColor: "gray",
  },

  ButtonText: {
    // justifyContent: "center",
    // alignItems: "center",
    fontSize: 32,
    color: "#25292e",
    fontWeight: "800",
  },
});
