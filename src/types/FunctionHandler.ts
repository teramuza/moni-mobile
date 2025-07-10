export interface DefaultHandler<TData = unknown, TError= unknown> {
    onSuccess?: (data?: TData) => void;
    onFailure?: (error?: TError) => void;
}
