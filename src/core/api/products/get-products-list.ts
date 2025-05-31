import { buildClient } from '../client/client-build.ts';

export async function getProductsForPage(queryArgs: { limit: number; offset: number }, searchText?: string) {
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
      .get({ queryArgs: { ...queryArgs, ...searchingParams } })
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
