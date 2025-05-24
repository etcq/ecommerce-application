import { buildClient } from '../client/client-build.ts';

export async function getProductsList() {
  try {
    const response = await buildClient().productProjections().get().execute();
    return response.body.results;
  } catch (error) {
    console.log("Can't getting a products-list", error);
  }
}

export async function getProductsForPage(queryArgs: { limit: number; offset: number }) {
  try {
    const response = await buildClient().productProjections().get({ queryArgs }).execute();
    return response.body;
  } catch (error) {
    console.log("Can't get a products-list", error);
  }
}
