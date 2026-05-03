import axios from "axios";
import Cookies from "js-cookie";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: `${backendUrl}/api`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(" Request:", config.url);

    //  Get token from cookies
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error(" Request Error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    console.log(" Response:", response.status);
    return response;
  },
  (error) => {
    console.error(" API Error:", error);

    //  Handle 401
    if (error?.response?.status === 401) {
      Cookies.remove("token");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(
      error?.response?.data || {
        message: "Something went wrong",
      },
    );
  },
);

export default api;
