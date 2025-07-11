export interface BaseResponse<T> {
  data: {
    message?: string;
    data: T;
  };
  status: number;
}
