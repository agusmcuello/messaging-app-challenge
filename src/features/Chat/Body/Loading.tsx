import React from "react";
import { ActivityIndicator, ImageBackground, StyleSheet } from "react-native";
import { Text } from "../../../components/Text/Text";
import { Color } from "../../../constants/colors";

function Loading() {
  return (
    <ImageBackground
      source={require("../../../assets/images/chat-bg-pattern.jpg")}
      style={styles.bodyContainer}
      resizeMode="repeat"
    >
      <ActivityIndicator size="large" color={Color.PRIMARY_500} />

      <Text lightColor="#333" type="default">
        Cargando...
      </Text>
    </ImageBackground>
  );
}

export default React.memo(Loading);

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
