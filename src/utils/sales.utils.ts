import {CarriedItem} from "@models/CarriedItem.ts";

export function getAvailableCarriedProducts(products: CarriedItem[] = []): CarriedItem[] {
    return products?.filter(product => product.qty > 0);
}
