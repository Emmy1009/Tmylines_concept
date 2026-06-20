import axios from "axios";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://tmylines-ex4l.onrender.com"
const instance = axios.create({
    baseURL: BASE_URL, 
    withCredentials: true
});

export default instance;
