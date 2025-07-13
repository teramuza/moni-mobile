import {AxiosError} from "axios";

export interface BaseResponse<T> {
  message?: string;
  data: T;
}

export interface BaseErrorResponse {
  type?: string;
  error?: {
    code: number;
    message?: string;
    info?: Record<string, any>
    data?: Record<string, any>
  }
}

export type NetworkError = AxiosError<BaseErrorResponse>

export type ObjectData = Record<
    string,
    string | number | boolean | undefined | null
>;
