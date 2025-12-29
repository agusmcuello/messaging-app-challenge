import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

function Avatar() {
  return (
    <ImageBackground
      source={require("../../../assets/images/chat-avatar.png")}
      style={styles.avatarContainer}
      resizeMode="cover"
    ></ImageBackground>
  );
}

export default React.memo(Avatar);

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
    borderRadius: 999,
    width: 50,
    height: 50,
    overflow: "hidden",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
  },
});
