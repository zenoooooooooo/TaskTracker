import { Tabs } from "expo-router";
import { View, Image, Text, ImageSourcePropType } from "react-native";

interface TabIconProps {
  icon: ImageSourcePropType;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 pt-8">
      <Image source={icon} resizeMode="contain" className="w-8 h-8" />
      <Text
        className={`${
          focused ? "font-bold text-yellow-400" : "font-normal"
        } w-full text-white`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1e90ff",
          height: 70,
          borderColor: "yellow",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="Incomplete"
        options={{
          title: "Incomplete",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={require("@/assets/images/incomplete.png")}
              name="Incomplete"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Completed"
        options={{
          title: "Completed",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={require("@/assets/images/completed.png")}
              name="Completed"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={require("@/assets/images/create.png")}
              name="Create"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
