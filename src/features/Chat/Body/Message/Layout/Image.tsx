import { Image, StyleSheet, View } from "react-native";

export const ImageLayout = ({ uri }: { uri: string }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: 4,
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
    maxWidth: "75%",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 240,
    height: 180,
    backgroundColor: "#ccc",
  },
});
