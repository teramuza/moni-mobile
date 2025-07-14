export function getMinutesDuration(startTimestamp: string | Date, endTimestamp?: string | Date) {
    const _startTimestamp = new Date(startTimestamp)
    const _endTimestamp = endTimestamp ? new Date(endTimestamp) : new Date();

    const diffInMs = _endTimestamp.getTime() - _startTimestamp.getTime();
    return Math.floor(diffInMs / (1000 * 60));
}

export function getDurationString(durationInMinutes?: number) {
    if (durationInMinutes == null || isNaN(durationInMinutes) || durationInMinutes < 0) {
        return '0m';
    }

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    if (hours > 0 && minutes > 0) {
        return `${hours}j${minutes}m`;
    } else if (hours > 0) {
        return `${hours}j`;
    } else {
        return `${minutes}m`;
    }
}
