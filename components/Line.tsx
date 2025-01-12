import React from "react";
import { View, Text } from "react-native";
function Line() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginRight: "15%",
        marginLeft: "15%",
      }}
    >
      <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
      <View>
        <Text style={{ width: 50, textAlign: "center", color: "white" }}>
          or
        </Text>
      </View>
      <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
    </View>
  );
}

export default Line;
