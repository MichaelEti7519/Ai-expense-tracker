
import { Stack } from "expo-router";
import React from 'react'

export default function Authlayout  ()  {
  return <Stack >
      <Stack.Screen name="signup" options={{ headerShown: false}} />
            <Stack.Screen name="login" options={{ headerShown: false}} />
            </Stack>;
}



