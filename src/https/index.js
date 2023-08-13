import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29596647-f7db787be5835d1b0c2ce2eda'

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
        per_page: 12,
    },
})

export default api;