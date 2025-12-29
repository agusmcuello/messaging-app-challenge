import React from "react";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import { getChatEvents } from "../../../redux/chat/chat.selector";
import { useAppSelector } from "../../../redux/hooks";
import Message from "./Message/Message";

function Body() {
  const events = useAppSelector(getChatEvents);

  const e = Object.values(events || {}).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <ImageBackground
      source={require("../../../assets/images/chat-bg-pattern.jpg")}
      style={styles.bodyContainer}
      resizeMode="repeat"
    >
      <FlatList
        data={e}
        renderItem={({ item }) => <Message key={item.id} id={item.id} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        inverted
        overScrollMode="never"
      />
    </ImageBackground>
  );
}

export default React.memo(Body);

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexDirection: "column",
    gap: 8,
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});
