import { Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const index = () => {
  useEffect(() => {
    console.log(process.env.API_KEY);
  }, []);

  return (
    <SafeAreaView>
      <Text>index</Text>
      <Link href="/(auth)/Authentication">Login</Link>
    </SafeAreaView>
  );
};

export default index;
