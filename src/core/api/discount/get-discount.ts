import { buildClient } from '@/core/api/client/client-build.ts';

export async function getDiscount() {
  try {
    const response = await buildClient().discountCodes().get().execute();
    return response.body;
  } catch (e) {
    console.error(e);
  }
}
