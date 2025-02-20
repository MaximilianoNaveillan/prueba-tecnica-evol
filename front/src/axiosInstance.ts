import axios from "axios";

// Crear una instancia de Axios con la configuración global
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Cambia esto por la URL base de tu backend
  headers: {
    "Content-Type": "application/json", // Ajusta según tu tipo de contenido
  },
});

// Puedes agregar interceptores si necesitas manejar errores o agregar tokens de autenticación
axiosInstance.interceptors.request.use(
  (config) => {
    // Si tienes un token de autenticación, lo puedes agregar aquí
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo global de errores
    console.error("Error en la respuesta: ", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
