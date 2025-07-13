import api from '@networks/lib/ApiReq';
import {Session} from '@models/Session';
import {BaseResponse} from "@type/networks.ts";

export const getActiveSessions = async () => {
  const res = await api.get<BaseResponse<Session[]>>('/session/active');
  return res.data.data;
};

export const getSession = async (sessionId: number) => {
  const res = await api.get<BaseResponse<Session>>('/session/' + sessionId);
  return res.data.data;
};
