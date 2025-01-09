import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="Authentication" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
