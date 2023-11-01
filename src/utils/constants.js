import axios from 'axios';

export const BASE_URL = "http://localhost:5595/";

export const axiosRequest = axios.create({
    baseURL : BASE_URL
})