import { Text } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect } from "expo-router";
import { getAuth, User } from "firebase/auth";

const index = () => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  if (!user) return <Redirect href="/(auth)/Authentication" />;

  return (
    <SafeAreaView>
      <Text>Hello {user.displayName}</Text>
      <Text>Hello {user.email}</Text>
    </SafeAreaView>
  );
};

export default index;
