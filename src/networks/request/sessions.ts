import api, {fetchData} from '@networks/lib/ApiReq.ts';
import {Session} from '@models/Session.ts';
import {BaseResponse} from "@type/networks.ts";
import sessionAPI from "@networks/apis/sessionAPI.ts";

export async function getActiveSessions() {
  try {
    const response = await fetchData<Session[]>(sessionAPI.getActiveSessionURL);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export const getSession = async (sessionId: number) => {
  const res = await api.get<BaseResponse<Session>>('/session/' + sessionId);
  return res.data.data;
};
