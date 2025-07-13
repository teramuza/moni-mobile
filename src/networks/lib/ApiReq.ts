import axios from 'axios';
import { useAuthStore } from '@stores/AuthStore';
import Config from "react-native-config";
import LoggingUtils from "@utils/logging.utils.ts";
import {BaseResponse, NetworkError, ObjectData} from "@type/networks.ts";

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

export function generateQueryParams(params?: ObjectData): string {
  if (!params) return '';
  const queryString = Object.keys(params)
      .filter((key) => params[key] !== undefined && params[key] !== null)
      .map(
          (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`,
      )
      .join('&');

  return queryString ? `?${queryString}` : '';
}

export async function fetchData<TResult>(url: string, params?: ObjectData) {
  try {
    const queryParams = generateQueryParams(params);
    const _url = url + queryParams;
    const res = await api.get<BaseResponse<TResult>>(_url);
    return res.data;
  } catch (err) {
    const error = err as NetworkError;
    if (error?.response?.data) {
      return Promise.reject(error?.response?.data);
    }
    return Promise.reject(err);
  }
}

export async function postData<TResult>(url: string, payload?: ObjectData, params?: ObjectData) {
  try {
    const queryParams = generateQueryParams(params);
    const _url = url + queryParams;
    const res = await api.post<BaseResponse<TResult>>(_url, payload);
    return res.data;
  } catch (err) {
    const error = err as NetworkError;
    if (error?.response?.data) {
      return Promise.reject(error?.response?.data);
    }
    return Promise.reject(err);
  }
}

export default api;
