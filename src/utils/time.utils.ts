export function getMinutesDuration(startTimestamp: string | Date, endTimestamp?: string | Date) {
    const _startTimestamp = new Date(startTimestamp)
    const _endTimestamp = endTimestamp ? new Date(endTimestamp) : new Date();

    const diffInMs = _endTimestamp.getTime() - _startTimestamp.getTime();
    return Math.floor(diffInMs / (1000 * 60));
}
