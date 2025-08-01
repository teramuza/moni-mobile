export const ErrorCodes = {
    DEFAULT: 40000,

    AUTH_UNAUTHORIZED_USER: 40100,
    AUTH_UNAUTHORIZED_USER_LOGIN: 40101,
    AUTH_UNFINISHED_REGISTERED: 40102,
    AUTH_USER_ID_REQUIRED: 40001,
    AUTH_USER_PROFILE_EXISTS: 40002,
    AUTH_USER_NOT_FOUND: 40401,

    PROFILE_EMPTY: 40002,
    PROFILE_ID_REQUIRED: 40003,
    PROFILE_NOT_FOUND: 40402,

    INVENTORY_ID_REQUIRED: 40010,
    INVENTORY_NOT_FOUND: 40411,
    INVENTORY_EMPTY: 40412,
    INVENTORY_STOCK_INVALID: 40011,

    SESSION_ID_REQUIRED: 40021,
    SESSION_NOT_FOUND: 40421,
    CARRIED_ITEM_REQUIRED: 40022,
    CARRIED_ITEM_NOT_FOUND: 40422,
    SESSION_NOT_PENDING: 40023,
    SESSION_NOT_WAITING_APPROVAL: 40024,
    SESSION_NOT_COMPLETED: 40025,
    SESSION_TOKEN_REQUIRED: 40026,
    CARRIED_ITEM_STOCK_NOT_AVAILABLE: 40027,

    FAILED_ADD_CARRIED_ITEM: 50020,
    FAILED_UPDATE_CARRIED_ITEM: 50021,
};

export const ErrorMessage = {
    [ErrorCodes.DEFAULT]: 'Terjadi kesalahan, silahkan coba kembali dalam beberapa saat',

    [ErrorCodes.AUTH_UNAUTHORIZED_USER]: 'Akun anda telah logout, silahkan login kembali',
    [ErrorCodes.AUTH_UNAUTHORIZED_USER_LOGIN]: 'Email atau password anda invalid',
    [ErrorCodes.AUTH_USER_ID_REQUIRED]: 'Ada masalah di akun anda, silahkan login kembali',
    [ErrorCodes.AUTH_USER_PROFILE_EXISTS]: 'Akun ini sudah terdaftar',

    [ErrorCodes.AUTH_USER_NOT_FOUND]: 'Akun tidak ditemukan',
    [ErrorCodes.PROFILE_NOT_FOUND]: 'Data Profil tidak ditemukan',

    [ErrorCodes.INVENTORY_NOT_FOUND]: 'Data Barang tidak ditemukan',

    [ErrorCodes.SESSION_NOT_FOUND]: 'Sesi tidak ditemukan',
}
