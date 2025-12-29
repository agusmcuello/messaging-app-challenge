import React from "react";
import { StyleSheet, View } from "react-native";
import { Color } from "../../constants/colors";
import { RootProps } from "./types";

function Root(props: RootProps) {
  const { isReceived, children } = props;

  const bgColor = isReceived ? Color.PRIMARY_100 : Color.PRIMARY_500;

  return (
    <View
      style={[
        {
          backgroundColor: bgColor,
          alignSelf: isReceived ? "flex-start" : "flex-end",
        },
        styles.messageRoot,
      ]}
    >
      {children}
    </View>
  );
}

export default React.memo(Root);

const styles = StyleSheet.create({
  messageRoot: {
    alignItems: "flex-start",
    gap: 4,
    paddingVertical: 8,
    borderRadius: 12,
    maxWidth: "80%",
    minWidth: "35%",
    paddingHorizontal: 6,
  },
});
