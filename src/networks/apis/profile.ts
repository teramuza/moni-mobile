import {Profile} from "@models/Profile.ts";
import api from "@networks/lib/ApiReq.ts";

export async function getProfile(id: number): Promise<Profile> {
    const res = await api.get<{data: Profile}>(`/employee?id=${id}`);
    return res.data.data;
}
