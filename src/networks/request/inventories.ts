import {fetchData} from "@networks/lib/ApiReq.ts";
import inventoryAPI from "@networks/apis/inventoryAPI.ts";
import {Inventory} from "@models/Inventory.ts";

export async function getInventories() {
    try {
        const response = await fetchData<Array<Inventory>>(inventoryAPI.inventories);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
