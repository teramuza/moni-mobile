const getActiveSessionURL = '/shift/sessions/active';
const getSessionURL = 'shift/session/';
const getAllActiveSessions = 'shift/sessions/all';

const checkInSessionURL = '/shift/check-in';
const addItemToSessionURL = (id: number) => `/shift/check-in/item?id=${id}`;
const updateItemSessionURL = (itemId: number) => `/shift/check-in/item/update?ciID=${itemId}`;
const deleteItemSessionURL = (itemId: number) => `/shift/check-in/item/delete?ciID=${itemId}`;
const requestCheckInURL = (id: number) => `/shift/check-in/request?id=${id}`;
const checkPointURL = (id: number) => `/shift/checkpoint?id=${id}`;
const requestCheckOutURL = (id: number) => `/shift/check-out?id=${id}`;

const approveCheckInURL = (id: number) => `/shift/check-in/verify/approve?id=${id}`;
const rejectCheckInURL = (id: number) => `/shift/check-in/verify/reject?id=${id}`;
const approveCheckOutURL = (id: number) => `/shift/check-out/verify/approve?id=${id}`;
const rejectCheckOutURL = (id: number) => `/shift/check-out/verify/reject?id=${id}`;

export default {
    getActiveSessionURL,
    getSessionURL,
    getAllActiveSessions,
    checkInSessionURL,
    addItemToSessionURL,
    updateItemSessionURL,
    deleteItemSessionURL,
    requestCheckInURL,
    checkPointURL,
    requestCheckOutURL,
    approveCheckInURL,
    rejectCheckInURL,
    approveCheckOutURL,
    rejectCheckOutURL,
}
