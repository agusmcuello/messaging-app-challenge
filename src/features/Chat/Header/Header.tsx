import { Ionicons } from "@expo/vector-icons"; // Expo viene con iconos por defecto
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Text } from "../../../components/Text/Text";
import Avatar from "./Avatar";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      console.log("Sesión cerrada manualmente");

      router.replace("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Avatar />
        <View style={styles.textContainer}>
          <Text style={styles.name}>Agustin Levin</Text>
          <Text style={styles.status}>Últ. vez. hoy 18:59 hs.</Text>
        </View>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#003049",
    padding: 15,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  status: {
    color: "#ccc",
    fontSize: 12,
    fontStyle: "italic",
  },
  logoutButton: {
    padding: 5,
  },
});
