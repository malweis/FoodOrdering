import React from 'react';

import {  Redirect, Tabs } from 'expo-router';


import Colors from '@constants/Colors';
import { useClientOnlyValue } from '@components/useClientOnlyValue';
import { useAuth } from '@/providers/AuthProvider';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/


export default function TabLayout() {
  const {session} = useAuth();
  
  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: "gainsboro",
        tabBarStyle:{
          backgroundColor: Colors.light.tint,
          display:"none",
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
        
     
    </Tabs>
  );
}
