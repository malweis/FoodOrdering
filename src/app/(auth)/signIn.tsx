import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'

import { Stack, router } from 'expo-router'

const SingIn = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [error, setError] = React.useState('')
    

    const resetFields = () => {
        setEmail('')
        setPassword('')
    }

    const validateInputs = () => {
        setError('')
        if (!email || !password) {
            setError('Please fill all the fields')
            return false
        }

      

        return true
    }


    

    const onSubmit = () => {
        if (!validateInputs()) return
        
        console.warn('Sign In', {email, password})
        resetFields()
    }



   




  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: 'Sign in'}} />
       
        <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail}  placeholder='john@gmail.com' style={styles.input} textContentType='emailAddress' keyboardType='email-address' />
      <Text style={styles.label}>Password</Text>
      <TextInput value={password} onChangeText={setPassword}  secureTextEntry style={styles.input} textContentType='password' />
        <Text style={{color: 'red'}}>{error}</Text>
     <Button  onPress={onSubmit} text={'Sign In' } />
   <Text onPress={() => router.replace('/signUp')} style={styles.textButton}>Create an account</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container :{
        flex: 1,
        justifyContent: 'center',
        padding: 10,

    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
     
    },
    label: {
       color: 'gray',
       fontSize: 16,
    },
 
    textButton: {
        color: Colors.light.tint,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
    }

})

export default SingIn