interface FindResult<T> {
    result: T[];
    page: number;
    size: number;
    total: number;
    totalPages: number;
}

export {
    FindResult
};
