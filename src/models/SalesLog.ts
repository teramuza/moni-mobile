export interface SalesLog {
    id: number;
    id_or: number;
    id_inv: number;
    qty: number;
    merchant_name: string;
    location: string;
    photo_url: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AllSalesCount {
    total: number;
    totalQty?: number;
}

export interface SalesItemCount {
    totalQty: number;
}

export interface SalesSummaryItem {
    soldItems: Array<IItems>;
    remainingItems: Array<IItems>;
}

export interface IItems {
    name: string;
    upc_code: string;
    qty: number;
}
