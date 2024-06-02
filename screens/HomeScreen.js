import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context'


const HomeScreen = () => {

    const navigation = useNavigation();

    const handleSignout = () => {
        signOut(auth)
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }
    return (
        <SafeAreaView style = {styles.container}>
            <View>
                <Text style = {styles.welcomeText}>
                    Welcome back!
                </Text>
                <Text> Email: {auth.currentUser?.email} </Text>

                <TouchableOpacity onPress = {handleSignout} style = {styles.button}>
                    <Text style = {styles.buttonText}> Sign out </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'

    },
    welcomeTextContainer: {
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
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#6e0280',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 50,
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

    }

})