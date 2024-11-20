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
  // TODO Probably an axios interceptor should logout the user if 401
export default instance;
