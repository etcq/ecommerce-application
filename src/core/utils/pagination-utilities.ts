import { BASE_LIMIT_PER_PAGE } from '@/constants/constants.ts';

const getPageCount = (total: number | null, limit: number = BASE_LIMIT_PER_PAGE) => {
  return total ? Math.ceil(total / limit) : 0;
};
const getWidthPaginationElement = (total: number | null) => {
  return total ? `calc(${100 / getPageCount(total)}% - 3px)` : '16px';
};
const getPageRange = (total: number | null, page: number, isEnd: boolean, limit: number = BASE_LIMIT_PER_PAGE) => {
  const start = page === 1 ? 1 : limit * (page - 1) + 1;
  const end = isEnd && total ? total : start + limit - 1;
  return { start, end };
};

export { getPageCount, getWidthPaginationElement, getPageRange };
