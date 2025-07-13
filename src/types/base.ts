type Join<K, P> = K extends string | number
    ? P extends string | number
        ? `${K}${'' extends P ? '' : '.'}${P}`
        : never
    : never;

export type Leaves<T> = T extends object
    ? {[K in keyof T]-?: Join<K, Leaves<T[K]>>}[keyof T]
    : '';

export type ValueOf<T> = T[keyof T];

import { RefObject } from 'react';

export interface DefaultRefType<TOpenParam = unknown> {
    close: () => void;
    open: (params?: TOpenParam) => void;
    isOpen?: () => boolean;
    expand?: () => void;
    collapse?: () => void;
}

export type DefaultRefObject = RefObject<DefaultRefType | null>;
