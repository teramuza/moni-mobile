import api from '@networks/lib/ApiReq.ts';
import {
  AuthUser,
  RegisterAccountPayload,
  RegisterProfilePayload,
} from '@models/AuthUser';
import {BaseResponse} from "@type/networks.ts";

export async function login(username: string, pass: string): Promise<AuthUser> {
  try {
    const res = await api.post<BaseResponse<AuthUser>>('/users/login', {username, pass});
    return res.data.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function registerUserAccount(payload: RegisterAccountPayload) {
  const res = await api.post<Omit<AuthUser, 'access'>>('/users/register', payload);
  return res.data;
}

export async function registerUserProfile(
  userId: number,
  payload: RegisterProfilePayload,
): Promise<AuthUser> {
  const res = await api.post<AuthUser>(`/users/register/${userId}`, payload);
  return res.data;
}
