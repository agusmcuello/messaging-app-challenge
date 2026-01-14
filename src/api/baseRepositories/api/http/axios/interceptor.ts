import * as SecureStore from "expo-secure-store";

export const authInterceptor = async (config: any) => {
  // Content-Type
  if (config.headers && !config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
  }

  try {
    // Recover token
    const token = await SecureStore.getItemAsync("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token enviado:", token);
    }
  } catch (error) {
    console.error("Error al obtener el token del SecureStore:", error);
  }

  return config;
};
