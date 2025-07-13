import {Profile} from "@models/Profile.ts";
import api from "@networks/lib/ApiReq.ts";
import {BaseResponse} from "@type/networks.ts";

export async function getProfile(id: number): Promise<Profile> {
    try {
        const res = await api.get<BaseResponse<Profile>>(`/employee?id=${id}`);
        return res.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
