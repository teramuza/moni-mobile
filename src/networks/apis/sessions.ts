import api from '@networks/lib/ApiReq';
import {Session} from '@models/Session';

export const getActiveSessions = async () => {
  const res = await api.get<Session[]>('/session/active');
  return res.data;
};

export const getSession = async (sessionId: number) => {
  const res = await api.get<Session>('/session/' + sessionId);
  return res.data;
};
