import React, { Component, useEffect, useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from '../../firebaseConfig.js'
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../screens.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const image = require('../../images/bg3.jpeg');

const LoginScreen = () => {
    // const {navigation} = props;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [home, setHome] = useState('')

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace(SCREENS.HOME)
            }
        })
        return unsubscribe;
    }, [])

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Signed up with', user.email)
        })
        .catch(error => alert(error.message))
    }

    const handleLogin = props => {
        
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with', user.email)
            setHome(true)
            navigation.navigate('HOME')
            // setUser(userCredentials)
        })
        .catch(error => alert(error.message))
    }

    // if (!user) {
        return (
            <KeyboardAvoidingView
                style = {styles.container}
                behaviour = "padding" 
            >
                <ImageBackground source={image} style={styles.image} resizeMode='cover'>
                    
                    <View style = {styles.welcomeTextContainer}>
                        <Text style = {styles.welcomeText}>
                            Trendly.
                        </Text>
                        <Text style = {styles.bottomText}>
                            by students, for students.
                        </Text>
                    </View>

                    <View style = {styles.inputContainer}>
                        <TextInput
                            placeholder = "Email"
                            value = {email}
                            onChangeText = {text => setEmail(text)}
                            style = {styles.input} 
                        />

                        <TextInput
                            placeholder = "Password"
                            value = {password}
                            onChangeText = {text => setPassword(text)}
                            style = {styles.input} 
                            secureTextEntry
                        />
                    </View>

                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                handleLogin();
                            }}
                            style = {[styles.button]}
                        >
                            <Text
                                style = {styles.buttonText}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                handleSignup();
                                
                               }}
                            style = {[styles.button, styles.buttonOutline]}
                        >
                            <Text
                                style = {styles.buttonOutlineText}
                            >
                                Sign Up
                            </Text>
                        </TouchableOpacity>

                        <TouchableWithoutFeedback
                        onPress={() => {
                        navigation.navigate(SCREENS.HOME);
                        }}>
                        <View
                        style={{
                            height: 50,
                            backgroundColor: 'black',
                            marginTop: 20,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                            color: 'white',
                            fontSize: 16,
                            }}>
                            For Devs
                        </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        )
    // }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%', 
        height: '100%', 
        flex: 1,
    },
    inputContainer: {
        marginLeft: 40,
        width: '80%'
    },
    welcomeTextContainer: {
        marginLeft: 5,
        marginTop: 350,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontWeight: 'bold',
        fontSize: 35,
        fontFamily: 'Helvetica'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 18,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonContainer: {
        marginLeft: 40,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#6e0280',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {   
        color: 'white',
        fontWeight: 800,
        fontSize: 16,
        fontStyle: 'bold',
        fontFamily: 'Helvetica-Neue'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#6e0280',
        borderWidth: 1

    },
    buttonOutlineText: {
        fontWeight: 800,
        fontSize: 16,
        fontStyle: 'bold'

    },
    bottomText: {
        marginTop: 5,
        fontStyle:"italic"
    }

})
