const paginate = <T>(array: T[], page: number, size: number): T[] => {
    return array.slice((page - 1) * size, page * size);
}

const estimateTotalPages = (total: number, size: number): number => {
    return Math.ceil(total / size);
}

export {
    paginate,
    estimateTotalPages
};
