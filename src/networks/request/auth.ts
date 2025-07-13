import { postData } from '@networks/lib/ApiReq.ts';
import {
    AuthUser,
    RegisterAccountPayload,
    RegisterProfilePayload,
} from '@models/AuthUser.ts';
import authAPI from '@networks/apis/authAPI.ts';
import { ObjectData } from '@type/networks.ts';

export async function login(username: string, pass: string): Promise<AuthUser> {
    try {
        const payload = {
            username,
            pass,
        };
        const response = await postData<AuthUser>(authAPI.LoginURL, payload);
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function registerUserAccount(payload: RegisterAccountPayload) {
    try {
        const response = await postData(
            authAPI.RegisterURL,
            payload as unknown as ObjectData,
        );
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function registerUserProfile(
    userId: number,
    payload: RegisterProfilePayload,
) {
    try {
        const response = await postData(
            authAPI.RegisterProfileURL(userId),
            payload as unknown as ObjectData,
        );
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
}
