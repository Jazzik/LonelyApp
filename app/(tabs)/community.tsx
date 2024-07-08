import { TouchableOpacity,Text,Button, View, StyleSheet } from 'react-native';
import Animated, {useAnimatedStyle,useAnimatedScrollHandler, useSharedValue ,withSpring} from 'react-native-reanimated';


const scrollY = useSharedValue(0);

const scrollHandler = useAnimatedScrollHandler((event) => {
scrollY.value = event.contentOffset.y;
});


const animatedStyle = useAnimatedStyle(() => {
return {
  transform: [{ translateY: -scrollY.value }],
};
});


export default function community() {

    return (
      <View style={styles.container}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        <Animated.View style={[styles.content, animatedStyle]}>
            <Text>Biba!</Text>
        </Animated.View>
      </Animated.ScrollView>
    </View>
    );
  

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#221240",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  item: {
    height: 100,
    marginBottom: 20,
    backgroundColor: '#f9c2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});