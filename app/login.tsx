import { TouchableOpacity,Text,Button, View, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import Animated, {useAnimatedStyle,useAnimatedScrollHandler, useSharedValue ,withSpring} from 'react-native-reanimated';
import { Link, router } from 'expo-router';
import { Redirect } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function LoginScreen() {
    const translationY = useSharedValue(0);
    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: -scrollY.value }],
        };
    });

    const succesfullLogin = () => {
        console.log('succesfull login')
        return router.replace('/home');
        
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.loginBox}>
                    <TextInput placeholderTextColor='#000' style={{...styles.loginItem, borderBottomWidth: 1, borderTopStartRadius: 20,borderTopEndRadius: 20, }} autoComplete='email' keyboardType='email-address' inputMode="email" placeholder="Email" /> 
                    <TextInput placeholderTextColor='#000' style={{...styles.loginItem, borderBottomWidth: 1}} secureTextEntry={true} autoComplete='current-password' placeholder="Password" />
                    <Button onPress={succesfullLogin} title="Login" />
                </View>

                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={30}
                    style={styles.button}
                    onPress={async () => {
                    try {
                        const credential = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                        });
                        // signed in
                    } catch (e) {
                        // if (e.code === 'ERR_REQUEST_CANCELED') {
                        // // handle that the user canceled the sign-in flow
                        // } else {
                        // // handle other errors
                        // }
                    }
                }}
                />

            </View>
        </SafeAreaView>
    );
  

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    backgroundColor: '#fff',
    borderColor: '#000', 
    borderWidth: 1,
    width: 300,
    borderRadius: 20,
  },
  loginItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
    color: '#000',
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  button: {
    width: 300,
    height: 44,
    marginTop: 20,
  },
});