import React from 'react';
import { TouchableOpacity, Text, Button, View, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import Animated, { useAnimatedStyle, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import { Link, router } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import i18n from '@/i18n';



console.log(i18n.t('welcome'), i18n.t('name'));

const LoginSchema = Yup.object().shape({
    email: Yup.string().email(i18n.t('wrong_email')).required(i18n.t('required_field')),
    password: Yup.string().min(6, i18n.t('password_min')).required(i18n.t('required_field')),
});

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

    interface LoginFormValues {
        email: string;
        password: string;
    }

    const succesfullLogin = (values: LoginFormValues) => {
        axios.post('https://bcab36b9-02fb-4f51-a72c-9b5227d997ec.mock.pstmn.io', values)
            .then(response => {
                console.log('succesfull login');
                router.replace('/home');
            })
            .catch(error => {
                console.log('error login');
                console.error(error);
            });
    }

    return (
        <Animated.ScrollView 
        scrollEventThrottle={16}
        style={styles.scrollView}>
            <SafeAreaView style={styles.container}>
                <View>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => succesfullLogin(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={styles.loginBox}>
                                <TextInput
                                    placeholderTextColor='#000'
                                    style={{ ...styles.loginItem,  borderTopStartRadius: 20, borderTopEndRadius: 20 }}
                                    autoComplete='email'
                                    keyboardType='email-address'
                                    inputMode="email"
                                    placeholder={i18n.t('email')}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                {errors.email && touched.email ? (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                ) : null}
                                <TextInput
                                    placeholderTextColor='#000'
                                    style={{ ...styles.loginItem, borderTopWidth: 1 }}
                                    secureTextEntry={true}
                                    autoComplete='current-password'
                                    placeholder={i18n.t('password')}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                {errors.password && touched.password ? (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                ) : null}
                                <View style={{borderTopWidth:1}}> 
                                <Button onPress={() => handleSubmit()} title={i18n.t('login')} />
                                </View>
                                
                            </View>
                        )}
                    </Formik>

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
                                // handle errors
                            }
                        }}
                    />
                </View>
            </SafeAreaView>
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    scrollView: {
        flex: 1,
        
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
    errorText: {
        color: 'red',
        paddingHorizontal: 16,
        paddingTop: 8,
    },
});
