import {fetchData, postData} from '@networks/lib/ApiReq.ts';
import sessionAPI from '@networks/apis/sessionAPI.ts';
import {Session} from "@models/Session.ts";

export const getAllActiveSessions = async () => {
    try {
        const response = await fetchData<Session[]>(
            sessionAPI.getAllActiveSessions,
        );
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        return Promise.reject(err);
    }
};

export const approveCheckInSession = async (sessionId: number) => {
    try {
        const response = await postData(
            sessionAPI.approveCheckInURL(sessionId),
        );
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const approveCheckOutSession = async (sessionId: number) => {
    try {
        const response = await postData(
            sessionAPI.approveCheckOutURL(sessionId),
        );
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const rejectCheckInSession = async (sessionId: number) => {
    try {
        const response = await postData(sessionAPI.rejectCheckInURL(sessionId));
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const rejectCheckOutSession = async (sessionId: number) => {
    try {
        const response = await postData(
            sessionAPI.rejectCheckOutURL(sessionId),
        );
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
};
