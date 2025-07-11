import api from '@networks/lib/ApiReq';
import {Session} from '@models/Session';
import {FetchResponse} from "@type/networks.ts";

export const getActiveSessions = async () => {
  const res = await api.get<FetchResponse<Session[]>>('/session/active');
  return res.data.data;
};

export const getSession = async (sessionId: number) => {
  const res = await api.get<FetchResponse<Session>>('/session/' + sessionId);
  return res.data.data;
};
