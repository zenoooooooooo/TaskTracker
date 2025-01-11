import { Redirect } from "expo-router";
import { getAuth, User } from "firebase/auth";

const index = () => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  if (!user) return <Redirect href="/(auth)/Authentication" />;

  return <Redirect href="/(tabs)/Incomplete" />;
};

export default index;
