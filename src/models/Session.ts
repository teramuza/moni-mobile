import {CarriedItem} from './CarriedItem';
import {SalesLog} from './SalesLog';

export type TSessionStatusCode = 'pending' | 'active' | 'done'; // contoh enum

export interface Session {
  id: number;
  profile_id: number;
  pick_time?: string; // or Date
  return_time?: string; // or Date
  status: TSessionStatusCode;
  createdAt?: string;
  updatedAt?: string;

  CarriedItems?: CarriedItem[];
  SalesLogs?: SalesLog[];
}
