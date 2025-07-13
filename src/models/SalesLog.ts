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
