const salesByProfileAPI = (id: number) => `sales?profile_id=${id}`;
const allSales = 'sales/all';
const itemSalesByDay = 'sales/qty-day';
const salesSummaryItemsURL = 'sales/summary';


export default {
    salesByProfileAPI,
    allSales,
    itemSalesByDay,
    salesSummaryItemsURL,
}
