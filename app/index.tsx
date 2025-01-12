import { Redirect } from "expo-router";
import { User } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const index = () => {
  const user: User | null = auth.currentUser;

  if (!user) return <Redirect href="/(auth)/Authentication" />;

  return <Redirect href="/(tabs)/Incomplete" />;
};

export default index;
