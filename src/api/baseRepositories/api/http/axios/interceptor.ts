export const authInterceptor = async (config: any) => {
  if (!config || !config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
  }

  // NOTE: Replace with actual token retrieval logic
  const token = "";

  config.headers.Authorization = `Bearer ${token}`;

  return config;
};
