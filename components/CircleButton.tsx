import {
  View,
  Pressable,
  StyleSheet,
  TextComponent,
  Platform,
} from "react-native";
import { Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
export default function CircleButton({
  text,
  press,
}: {
  press: () => void;
  text: string;
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
        },]
      // transform: [
      //   {

      //   }
      // ]
    };
  });
  

  return (
    <View style={styles.circleButtonContainer}>
      <Pressable
        onPressIn={() => {
          // buttonTranslate.value = withSpring(10);
          shadowheight.value = withSpring(28);
          shadowOpacity.value = withSpring(0.8);
          buttonTranslate.value = withSpring(-1);
          //timer


        }}
        onPress={press}
        onPressOut={() => {
          // buttonTranslate.value = withSpring(0);
          shadowheight.value = withSpring(40);
          shadowOpacity.value = withSpring(1);
          buttonTranslate.value = withSpring(0);


        }}
      >
        <Animated.View
          style={[
           
            {
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center",
              backgroundColor: "lightgray",
              height: 60,
              borderRadius: 21,
              borderWidth: 2,
            },
          ]}
        >
          <Text style={styles.buttontext}>{text}</Text>
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[
          {
            
            borderWidth: 1,
            borderBottomLeftRadius: 21,
            borderBottomRightRadius: 21,
            position: "relative",
            zIndex: -1,
            marginTop:-29,
            backgroundColor: "gray",
          },
          animatedStyleShadow,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    
    width: 84,
    height: 84,
    marginHorizontal: 60,
    // borderWidth: 4,
    // borderColor: '#ffd33d',
    // borderRadius: 21,
    // padding: 3,
    // backgroundColor: 'grey'
    justifyContent: "flex-end",
  },
  circleButton: {
    // height: 10,
    borderWidth: 1,
    borderColor: "#000",
    flex: 0.8,
    // justifyContent: 'end',
    // alignItems: 'flex-end',
    borderRadius: 21,
    backgroundColor: "#fff",
  },
  buttontext: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    fontSize: 32,
    color: "#25292e",
    fontWeight: "600",
  },
});
