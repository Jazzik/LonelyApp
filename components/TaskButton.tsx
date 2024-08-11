import {
  View,
  Pressable,
  StyleSheet,
  TextComponent,
  Platform,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
export default function TaskButton({
  text,
  press,
  accessible,
}: {
  press: () => void;
  text: string;
  accessible: boolean;
}) {
  const buttonTranslate = useSharedValue(0);
  const shadowheight = useSharedValue(40);
  const shadowOpacity = useSharedValue(1);
  const animatedStyleShadow = useAnimatedStyle(() => {
    return {
      height: shadowheight.value,
      opacity: shadowOpacity.value,
      transform: [
        {
          translateY: buttonTranslate.value,
        },
      ],
    };
  });

  return (
    <View style={styles.taskButtonContainer}>
      <Pressable // button
        onPressIn={() => {
          if (accessible) {
            // buttonTranslate.value = withSpring(10);
            shadowheight.value = withSpring(28);
            shadowOpacity.value = withSpring(0.8);
            buttonTranslate.value = withSpring(-1);
          } else {
            shadowheight.value = withSpring(37);
          }
        }}
        onPress={() => {
          if (accessible) {
            press();
          }
        }}
        onPressOut={() => {
          shadowheight.value = withSpring(40);
          shadowOpacity.value = withSpring(1);
          buttonTranslate.value = withSpring(0);
        }}
      >
        <Animated.View
          style={[
            accessible
              ? { ...styles.taskButtonAcessible }
              : { ...styles.taskButtonUnacessible },
          ]}
        >
          <Text style={styles.buttontext}>{text}</Text>
        </Animated.View>
      </Pressable>

      <Animated.View // shadow
        style={[
          accessible
            ? { ...styles.taskShadowAccesible }
            : { ...styles.taskShadowUnaccesible },
          animatedStyleShadow,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  taskButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    justifyContent: "flex-end",
  },

  taskButtonAcessible: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 60,
    borderRadius: 21,
    borderWidth: 2,
    backgroundColor: "#f0f0f0",
  },
  taskButtonUnacessible: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 60,
    borderRadius: 21,
    borderWidth: 2,
    backgroundColor: "#5c5c5c",
  },
  taskShadowAccesible: {
    borderWidth: 1,
    borderBottomLeftRadius: 21,
    borderBottomRightRadius: 21,
    position: "relative",
    zIndex: -1,
    marginTop: -29,
    backgroundColor: "gray",
  },
  taskShadowUnaccesible: {
    borderWidth: 1,
    borderBottomLeftRadius: 21,
    borderBottomRightRadius: 21,
    position: "relative",
    zIndex: -1,
    marginTop: -29,
    backgroundColor: "#363636",
  },

  buttontext: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    fontSize: 32,
    color: "#25292e",
    fontWeight: "500",
  },
});
