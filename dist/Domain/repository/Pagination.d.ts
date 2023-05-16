export declare class Pagination {
    getCurrentPage(): number;
    setCurrentPage(value: number): void;
    get totalPages(): number;
    set totalPages(value: number);
    private _currentPage;
    private _totalPages;
    perPage: number;
    hasNextPage(): boolean;
    nextPage(): boolean;
    constructor(currentPage?: number, perPage?: number);
}
export type PaginatedResult<TResult> = {
    ResultData: TResult[];
    CurrentPagination: Pagination;
};
