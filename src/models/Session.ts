import { CarriedItem } from './CarriedItem';
import { SalesLog } from './SalesLog';
import { Leaves, ValueOf } from '@type/base.ts';

export const SessionStatus = {
    PENDING: 10,
    VERIFY_IN: 11,

    CHECKIN: 20,
    CHECKIN_OVER_TIME: 21,
    CHECKIN_EMPTY: 22,

    VERIFY_OUT: 30,
    REJECTED_IN: 31,
    REJECTED_OUT: 32,
    FINISH: 40,
};

export type TSessionStatus = Leaves<typeof SessionStatus>;
export type TSessionStatusCode = ValueOf<typeof SessionStatus>;

export interface Session {
    id: number;
    profile_id: number;
    pick_time?: string; // or Date
    return_time?: string; // or Date
    status: TSessionStatusCode;
    skor_saw?: number;
    createdAt?: string;
    updatedAt?: string;

    total_logs?: number;
    total_qty?: number;

    carried_products?: CarriedItem[];
    sales_log?: SalesLog[];
}

export interface CheckPointPayload {
    merchant_name: string;
    location: string;
    photo_url?: string;
    items: Array<{
        ciId?: number;
        id: number;
        qty: number;
    }>;
}
