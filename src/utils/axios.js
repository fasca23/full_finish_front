import axios from 'axios';

// const baseURL = "http://127.0.0.1:8000/api/";
const baseURL = "http://79.174.95.108/api/";
const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: false

});

export default axiosInstance;