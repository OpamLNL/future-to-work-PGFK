//axiosConfig.js


import axios from 'axios';
import { apiBaseURL } from '../configs/urls';
export const axiosInstance = axios.create({
    baseURL: apiBaseURL
});

