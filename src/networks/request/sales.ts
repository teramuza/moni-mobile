import { fetchData } from '@networks/lib/ApiReq.ts';
import {
    AllSalesCount,
    SalesItemCount,
    SalesSummaryItem,
} from '@models/SalesLog.ts';
import salesAPI from '@networks/apis/salesAPI.ts';
import LoggingUtils from "@utils/logging.utils.ts";

export async function getSalesByEmployee(id: number) {
    try {
        const response = await fetchData<AllSalesCount>(
            salesAPI.salesByProfileAPI(id),
        );
        LoggingUtils.log('getSalesByEmployee', id, response);
        return response.data;
    } catch (error) {
        LoggingUtils.log('getSalesByEmployee error', id, error);
        return Promise.reject(error);
    }
}

export async function getAllSales() {
    try {
        const response = await fetchData<AllSalesCount>(salesAPI.allSales);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getSalesItemByToday() {
    try {
        const response = await fetchData<SalesItemCount>(
            salesAPI.itemSalesByDay,
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getSalesItems(sessionId: number) {
    try {
        const response = await fetchData<SalesSummaryItem>(
            salesAPI.salesSummaryItemsURL,
            { session_id: sessionId },
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
