import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust the URL based on your Django server's address
});

// No interceptors are needed to handle the token as it's managed by the browser via HTTP-only cookies
export default API;