import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;
//const baseURL = 'https://edu-connect-admin-server.onrender.com/api';
//const baseURL = 'http://localhost:9000/api'

// Set the default base URL for axios
axios.defaults.baseURL = baseURL;

console.log('URL', axios.defaults.baseURL)

export default axios;
