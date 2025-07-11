import axios from 'axios';
import { useAuthStore } from '@stores/AuthStore';
import Config from "react-native-config";
import LoggingUtils from "@utils/logging.utils.ts";

const BASE_URL = Config.API_URL + '/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(async config => {
  LoggingUtils.info('[REQ]', config.baseURL, config.method, config.url)
  LoggingUtils.info('[REQ Body]', config.data)

  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  LoggingUtils.warn('APIREQ ERROR:', error?.response?.data || error.message);
  return Promise.reject(error);
});

export default api;
