import { buildClient } from '../client/client-build.ts';

export default async function getProductsList() {
  try {
    const response = await buildClient().productProjections().get().execute();
    return response.body.results;
  } catch (error) {
    console.log("Can't getting a products-list", error);
  }
}
