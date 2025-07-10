import { StockItem } from './StockItem';

export interface Inventory {
    id: number;
    name: string;
    upc_code: string;
    item_per_pack: number;
    base_price: number;
    selling_price: number;

    StockItems?: StockItem[];
}
