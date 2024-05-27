import { View, Text, ActivityIndicator, Alert } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

const index = () => {
  const {session, loading} = useAuth();

  if (loading) {
    return <ActivityIndicator/>;
  }


  if (!session) {
    return <Redirect href="/signIn" />
  }
  const  handleSingOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => supabase.auth.signOut() },
    ]);
    
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={'/(auth)'} asChild>
        <Button text="Auth" />
      </Link>
      <Button text="Sign Out" onPress={handleSingOut} />
    </View>
  );
};

export default index;