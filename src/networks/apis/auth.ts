import api from '@networks/lib/ApiReq.ts';
import {
  AuthUser,
  RegisterAccountPayload,
  RegisterProfilePayload,
} from '@models/AuthUser';

export async function login(username: string, pass: string): Promise<AuthUser> {
  const res = await api.post<AuthUser>('/login', {username, pass});
  return res.data;
}

export async function registerUserAccount(payload: RegisterAccountPayload) {
  const res = await api.post<Omit<AuthUser, 'access'>>('/register', payload);
  return res.data;
}

export async function registerUserProfile(
  userId: number,
  payload: RegisterProfilePayload,
): Promise<AuthUser> {
  const res = await api.post<AuthUser>(`/register/${userId}`, payload);
  return res.data;
}
