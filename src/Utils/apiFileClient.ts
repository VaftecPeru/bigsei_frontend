import axios from "axios";
import Cookies from "js-cookie";
import configApi from "./ConfigApi";

const apiFileClient = axios.create({
  baseURL: configApi.baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Interceptor para agregar automáticamente el token a cada petición
apiFileClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiFileClient;