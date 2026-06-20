import axios from "axios";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://tmylines-00ep.onrender.com/api"
const instance = axios.create({
    baseURL: BASE_URL, 
    withCredentials: true
});

export default instance;
