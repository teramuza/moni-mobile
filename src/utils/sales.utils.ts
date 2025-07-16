import {CarriedItem} from "@models/CarriedItem.ts";

export function getAvailableCarriedProducts(products: CarriedItem[] = []): CarriedItem[] {
    return products?.filter(product => product.qty > 0);
}


export function formatOrderRequestId(orId: number): string {
    return `OR${String(orId).padStart(4, '0')}`;
}

export function parseOrderRequestId(formattedId: string): number {
    return Number(formattedId.replace(/^OR/, ''));
}
