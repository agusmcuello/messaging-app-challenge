import axios from "axios";
import { config } from "../../../../config";
import { authInterceptor } from "./interceptor";

const apiClient = axios.create({
  baseURL: config.apiUrl,
  timeout: 120000, // 2 minutes
});

apiClient.interceptors.request.use(authInterceptor);

export default apiClient;
