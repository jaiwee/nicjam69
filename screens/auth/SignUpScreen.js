import React, { Component, useEffect, useState } from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Image } from 'react-native'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth, db } from '../../firebaseConfig.js'
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import SCREENS from '../screens.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '../../constants/colors.js';

const image = require('../../images/bg3.jpeg');

const SignUpScreen = () => {
    // const {navigation} = props;

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [home, setHome] = useState('')

    const navigation = useNavigation();

    const handleSignup = () => {
        writeUserData(username, email);

        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigation.navigate(SCREENS.LOGIN);
        })
        .catch(error => alert(error.message))
    }

    const writeUserData = (username, email) => {

        const docRef = addDoc(collection(db, "users"), {
            username: username,
            email: email
        });

        console.log("Document written with ID: ", docRef.id);

    }

    // if (!user) {
        return (
            <KeyboardAvoidingView
                style = {styles.container}
                behaviour = "padding" 
            >

                <View style = {styles.headerContainer}>
                    <Text style = {styles.welcomeText}> 
                        Sign Up 
                    </Text>

                    <Image source = {require('../../assets/star.png')}/>
                </View>

                <View style = {styles.inputContainer}>
                    <Text> Email </Text>
                    <TextInput
                        placeholder = "example@gmail.com"
                        value = {email}
                        onChangeText = {text => setEmail(text)}
                        style = {styles.input} 
                    />
                </View>

                <View style = {styles.inputContainer}>
                    <Text> Username </Text>
                    <TextInput
                        placeholder = "epicslayer29"
                        value = {username}
                        onChangeText = {text => setUsername(text)}
                        style = {styles.input} 
                    />
                </View>

                <View style = {styles.inputContainer}>
                    <Text> Create a password </Text>
                    <TextInput
                        placeholder = "must be 8 characters"
                        value = {password}
                        onChangeText = {text => setPassword(text)}
                        style = {styles.input} 
                        secureTextEntry
                    />
                </View>

                <View style = {styles.inputContainer}>
                    <Text> Confirm Password </Text>
                    <TextInput
                        placeholder = "repeat password"
                        value = {confirmPassword}
                        onChangeText = {text => setConfirmPassword(text)}
                        style = {styles.input} 
                        secureTextEntry
                    />
                </View>

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

                {/* <View style = {{flex: 0.1, alignItems: 'center', flexDirection: 'row'}}>
                    <Divider style = {{borderWidth: 0.2, width: '30%'}}/>
                    <Text style = {{marginHorizontal: 10, fontFamily: 'Helvetica'}}> Or Register with</Text>
                    <Divider style = {{borderWidth: 0.2, width: '30%'}}/>
                </View> */}

            </KeyboardAvoidingView>
        )
    // }
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
        // alignItems: 'center',
        backgroundColor: COLORS.BLUE,
        rowGap: 20,
        
    },
    headerContainer: {
        flex: 0.15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        columnGap: 170,
    },
    image: {
        width: '100%', 
        height: '100%', 
        flex: 1,
    },
    inputContainer: {
        // width: '85%'
    },
    welcomeText: {
        fontWeight: 'bold',
        fontSize: 35,
        fontFamily: 'HelveticaNeue-Bold'
    },
    forgotPasswordContainer: {
        paddingTop: 10,
    },
    forgotPasswordText: {
        fontFamily: 'Helvetica-Oblique'
    },  
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 18,
        borderRadius: 10,
        marginTop: 7,
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
