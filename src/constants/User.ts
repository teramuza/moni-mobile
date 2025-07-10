export const UserRole = {
    SU: 99,
    ADMIN: 88,
    SUPERVISOR: 1,
    EMPLOYEE: 0,
} as const;

export const UserStatus = {
    INACTIVE: 0,
    ACTIVE: 1,
    UNVERIFIED: 2,
} as const;

export const Gender = {
    MALE: 'M',
    FEMALE: 'F',
} as const;

export type TRole = typeof UserRole[keyof typeof UserRole];
export type TUserStatus = typeof UserStatus[keyof typeof UserStatus];
export type TGender = typeof Gender[keyof typeof Gender];
