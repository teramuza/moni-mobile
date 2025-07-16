import { fetchData, postData } from '@networks/lib/ApiReq.ts';
import { CheckPointPayload, Session } from '@models/Session.ts';
import { BaseResponse, ObjectData } from '@type/networks.ts';
import sessionAPI from '@networks/apis/sessionAPI.ts';
import { useAuthStore } from '@stores/AuthStore.ts';
import {CarriedItem} from "@models/CarriedItem.ts";

export async function getActiveSessions() {
    try {
        const response = await fetchData<Session>(
            sessionAPI.getActiveSessionURL,
        );
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getSession = async (sessionId: number) => {
    try {
        const res = await fetchData<Session>(
            sessionAPI.getSessionURL + sessionId,
        );
        return res.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const checkInSession = async () => {
    const user = useAuthStore.getState().user;
    try {
        const response = await postData<Session>(sessionAPI.checkInSessionURL, {
            profile_id: user?.profile_id,
        });
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const addItemToSession = async (
    sessionId: number,
    item: { id_inv: number; qty: number },
) => {
    try {
        const response = await postData<CarriedItem>(
            sessionAPI.addItemToSessionURL(sessionId),
            item,
        );
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateItemSession = async (itemId: number, qty: number) => {
    try {
        const response = await postData(
            sessionAPI.updateItemSessionURL(itemId),
            { qty },
        );
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const requestCheckInSession = async (sessionId: number) => {
    try {
        const response = await postData(sessionAPI.rejectCheckInURL(sessionId));
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const checkpointSession = async (
    sessionId: number,
    data: CheckPointPayload,
) => {
    try {
        const response = await postData(
            sessionAPI.checkPointURL(sessionId),
            data as unknown as ObjectData,
        );
        return response.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const requestCheckoutSession = async (sessionId: number) => {
    try {
        const response = await postData(
            sessionAPI.requestCheckOutURL(sessionId),
        );
        if (response) {
            return {
                success: true,
            };
        }
    } catch (err) {
        return Promise.reject(err);
    }
};
