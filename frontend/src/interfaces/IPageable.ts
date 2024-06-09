/* eslint-disable @typescript-eslint/no-explicit-any */
import IArticle from "./IArticle";

interface IPageable {
  content: IArticle[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElement: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: any;
    unpaged: boolean;
  };
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
}

export default IPageable;
