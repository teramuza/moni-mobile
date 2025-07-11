export interface BaseResponse<T> {
  data: {
    message?: string;
    data: T;
  };
  status: number;
}

export interface FetchResponse<T> {
  message?: string;
  data: T;
}
