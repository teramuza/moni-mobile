import { Inventory } from './Inventory';

export interface CarriedItem {
    id: number;
    id_or: number;
    id_inv: number;
    name?: string;
    qty: number;
    initial_qty: number;

    Inventory?: Inventory;
}
