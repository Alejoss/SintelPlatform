import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://localhost:8000", // Adjust according to your Django server's address
  withCredentials: true, // This is essential to make sure cookies are sent with requests
});

// Set up a request interceptor to attach the CSRF token header
instance.interceptors.request.use((config) => {
  // Get the CSRF token from the cookie
  const csrftoken = Cookies.get('csrftoken');

  // Add the CSRF token to the headers only if it's available
  if (csrftoken) {
    config.headers['X-CSRFToken'] = csrftoken;
  }

  return config;
});

export default instance;
