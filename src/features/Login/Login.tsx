import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import AuthRepository from "../../api/domain/auth/auth.repository";
import logoSource from "../../assets/images/logo_chatter_color_2.png";
import { Text } from "../../components/Text/Text";
import { ThemedView } from "../../components/ThemedView/ThemedView";
import { Color } from "../../constants/colors";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const authRepository = useMemo(() => new AuthRepository(), []);

  // React Query
  const { mutate, isPending } = useMutation({
    mutationFn: (credentials: any) =>
      authRepository.login(credentials.username, credentials.password),
    onSuccess: async (data: any) => {
      console.log("¡LOGIN OK! Data recibida:", data);

      try {
        // Compatibility check
        if (SecureStore.setItemAsync) {
          await SecureStore.setItemAsync("userToken", data.token);
          console.log("Token guardado en SecureStore");
        }
      } catch (e) {
        console.log(
          "SecureStore no disponible en esta plataforma, ignorando..."
        );
      }

      console.log("Redirigiendo a /chat...");
      router.replace("/chat");
    },
    onError: (error: any) => {
      Alert.alert("Error de autenticación", "Usuario o contraseña incorrectos");
      console.error(error);
    },
  });

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Campos incompletos", "Por favor, completa todos los campos");
      return;
    }
    mutate({ username, password });
  };

  return (
    <ThemedView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <ThemedView style={styles.wrapper}>
          <Image source={logoSource} style={styles.logo} resizeMode="contain" />

          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!isPending} // Deshabilitar si está cargando
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isPending}
          />

          <TouchableOpacity
            style={[styles.button, isPending && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>
        </ThemedView>
      </ImageBackground>
    </ThemedView>
  );
}

export default React.memo(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.PRIMARY_500,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: "100%",
  },
  wrapper: {
    backgroundColor: "transparent",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
  logo: {
    width: "80%",
    maxHeight: 80,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ffffff99",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    width: "100%",
    height: 50,
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: Color.PRIMARY_300,
    borderRadius: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textTransform: "none",
    fontWeight: "bold",
  },
});
