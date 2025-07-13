export const shortNumber = (_num: number) => {
    const absNumber = Math.abs(_num);

    const units = [
        { value: 1_000_000, suffix: 'jt' },
        { value: 1_000, suffix: 'rb'}
    ]

    for (const unit of units) {
        if (absNumber >= unit.value) {
            const short = _num / unit.value;
            const formatted = new Intl.NumberFormat('id-ID', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }).format(short);

            return `${formatted}${unit}`;
        }
    }
    return `${_num}`
}
