export class Pagination {
  public getCurrentPage(): number {
    return this._currentPage;
  }

  public setCurrentPage(value: number) {
    this._currentPage = value;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  set totalPages(value: number) {
    this._totalPages = value;
  }

  private _currentPage: number;

  private _totalPages: number;

  public perPage: number;

  public hasNextPage(): boolean {
    return this._currentPage < this._totalPages;
  }

  public nextPage(): boolean {
    if (this.hasNextPage()) {
      this._currentPage += 1;

      return true;
    }

    return false;
  }

  constructor(currentPage = 0, perPage = 0) {
    this._currentPage = currentPage;
    this._totalPages = 0;
    this.perPage = perPage;
  }
}
export type PaginatedResult<TResult> = {
  // PaginatedList: Record<number, TArg[]>;
  ResultData: TResult[];
  CurrentPagination: Pagination;
};
