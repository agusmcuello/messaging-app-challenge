import { format } from "date-fns";
import React from "react";
import { StyleSheet, View } from "react-native";

import { getMessageTextColor } from "../../utils/getMessageTextColor";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import { BottomComposerProps } from "./types";

function BottomComposer(props: BottomComposerProps) {
  const { icon, timestamp, isReceived } = props;

  const textColor = getMessageTextColor(isReceived);

  const time = format(timestamp, "HH:mm");

  return (
    <View style={styles.composerContainer}>
      <Text lightColor={textColor} type="small">
        {time}
      </Text>

      <Icon name={icon} size={16} color={textColor} />
    </View>
  );
}

export default React.memo(BottomComposer);

const styles = StyleSheet.create({
  composerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    alignSelf: "flex-end",
  },
});
