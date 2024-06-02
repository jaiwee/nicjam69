import React, { Component, useEffect, useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from '../firebaseConfig.js'
import { useNavigation } from '@react-navigation/native';

const image = require('../images/background.png');

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [home, setHome] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace("Home")
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

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with', user.email)
            setHome(true)
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
                            BusiNUS
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
                            onPress = {handleLogin}
                            style = {[styles.button]}
                        >
                            <Text
                                style = {styles.buttonText}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress = {handleSignup}
                            style = {[styles.button, styles.buttonOutline]}
                        >
                            <Text
                                style = {styles.buttonOutlineText}
                            >
                                Sign Up
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        )
    // }
}

export default LoginScreen

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
        marginTop: 180,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontWeight: 'bold',
        fontSize: 35,
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
        fontStyle: 'bold'
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
