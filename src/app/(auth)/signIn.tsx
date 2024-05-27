import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'

import { Stack, router } from 'expo-router'

const SingIn = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

   
    const [loading, setLoading] = React.useState(false)
    

    const resetFields = () => {
        setEmail('')
        setPassword('')
    }

  

    

    async function  onSubmit( )   {
        setLoading(true);
         const {error} = await supabase.auth.signInWithPassword({ email, password });
    
        if (error) {
    Alert.alert("Error", error.message);
    setLoading(false);
        } else {
            Alert.alert("Success", "Logged in successfully");
            setLoading(false);
            resetFields();
            // router.replace("/signIn");
            }
      };



   




  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: 'Sign in'}} />
       
        <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail}  placeholder='john@gmail.com' style={styles.input} textContentType='emailAddress' keyboardType='email-address' />
      <Text style={styles.label}>Password</Text>
      <TextInput value={password} onChangeText={setPassword}  secureTextEntry style={styles.input} textContentType='password' />
        {/* <Text style={{color: 'red'}}>{error}</Text> */}
     <Button  onPress={onSubmit} text={ loading ? 'Signing In...' : 'Sign In' }  disabled={loading} />
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