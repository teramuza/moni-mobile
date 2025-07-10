import {Profile} from './Profile';

export interface User {
  id: number;
  username: string;
  role: number;
  status: number;
  profile?: Profile;
}
