import axios from "axios";
import Cookies from "js-cookie";


const instance = axios.create({
  baseURL: "http://localhost:8000", // Adjust according to your Django server's address
  withCredentials: true, // Ensure cookies are sent with requests
});

// Set up a request interceptor to attach the CSRF token header
instance.interceptors.request.use((config) => {
  const csrftoken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken; // Attach the CSRF token to the headers
  }
  return config;
});

// Set up a response interceptor to handle 401 errors globally
instance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login"; // Redirect to login page on 401 Unauthorized
    }
    return Promise.reject(error);
  }
);

export default instance;
