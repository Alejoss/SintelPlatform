import axios from "axios";
import Cookies from "js-cookie";

// Determine the base URL, with a fallback to localhost
const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log("import.meta.env.VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
// Log the base URL for debugging purposes
console.log("Axios Base URL:", baseURL);

const instance = axios.create({
  baseURL: baseURL, // Uses the environment variable or fallback
  withCredentials: true, // Ensure cookies are sent with requests
});

// Set up a request interceptor to attach the CSRF token header
instance.interceptors.request.use((config) => {
  const csrftoken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken; // Attach the CSRF token to the headers
    console.log("CSRF Token added to request headers:", csrftoken);
  }
  console.log("Request Config:", config); // Log the entire config object for debugging
  return config;
}, (error) => {
  console.error("Error in Request Interceptor:", error);
  return Promise.reject(error);
});

// Log response for debugging
instance.interceptors.response.use((response) => {
  console.log("Response Data:", response.data); // Log the response data
  return response;
}, (error) => {
  console.error("Error in Response Interceptor:", error);
  return Promise.reject(error);
});

export default instance;
