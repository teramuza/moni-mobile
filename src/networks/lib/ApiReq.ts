import axios from 'axios';
import { useAuthStore } from '@stores/AuthStore';
import APP_CONFIG from "@constants/AppConfig.ts";

const BASE_URL = APP_CONFIG + '/api/v1';

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// Inject token (harus dari getState bukan langsung dari hook)
api.interceptors.request.use(async (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
