import { IPriceRange } from '@/interfaces/interfaces.ts';
import { buildClient } from '@/core/api/client/client-build.ts';

export async function getProductsForPage(
  queryArgs: { limit: number; offset: number },
  searchText?: string,
  priceRanges?: IPriceRange[],
  sort?: string,
  categoryIds?: string[],
) {
  const filterQuery: string[] = [];
  const queryFilterArgs: Record<string, string | string[]> = {};

  if (priceRanges?.length) {
    const [first, ...rest] = priceRanges;
    const firstPart = `range(${first.min} to ${first.max})`;
    const restParts: string = rest.map((range: IPriceRange): string => `(${range.min} to ${range.max})`).join(',');
    const priceFilter = `variants.price.centAmount:${firstPart}${restParts ? ',' + restParts : ''}`;
    filterQuery.push(priceFilter);
  }

  if (sort) {
    queryFilterArgs.sort = sort;
  }

  if (categoryIds?.length) {
    const brandFilter = `categories.id:${categoryIds.map((id: string): string => `"${id}"`).join(',')}`;
    filterQuery.push(brandFilter);
  }
  if (filterQuery.length) {
    queryFilterArgs['filter.query'] = filterQuery;
  }

  const searchingParams =
    searchText && searchText.length !== 0
      ? {
          'text.en-US': `${searchText}`,
          fuzzy: true,
          fuzzyLevel: 1,
          markMatchingVariants: true,
          withTotal: true,
        }
      : {};
  try {
    const response = await buildClient()
      .productProjections()
      .search()
      .get({ queryArgs: { ...queryArgs, ...searchingParams, ...queryFilterArgs } })
      .execute();
    return response.body;
  } catch (error) {
    console.log("Can't get a products-list", error);
  }
}

export async function getCurrentProduct(id: string) {
  try {
    const response = await buildClient().productProjections().withId({ ID: id }).get().execute();
    return response.body;
  } catch (error) {
    console.log("Can't get current product list", error);
  }
}
