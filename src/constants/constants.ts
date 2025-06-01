export enum ROUTES {
  MAIN = '/',
  ABOUT = '/about',
  PRODUCT_LIST = '/product-list',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  PROFILE = '/profile',
  CART = '/cart',
}

export enum CartSignInModeEnum {
  MergeWithExistingCustomerCart = 'MergeWithExistingCustomerCart',
}

export enum LocalStorageKeys {
  TOKEN = 'ctp-auth-token',
  ANONYMOUS_CART_ID = 'anonymousCartId',
}

export enum AuthMessages {
  REGISTRATION = 'Your registration was successful!',
  LOGIN = 'Your login was successful!',
}

export const BASE_LIMIT_PER_PAGE = 9;
export const BASE_PAGINATION_WIDTH = 60;

export const LOCALIZATION = 'en-US';

export const CATEGORY_MESSAGE = "Don't know what to choose? Select a category...";

export enum FilterPrice {
  LOW = '20$ - 50$',
  MEDIUM = '50$ - 70$',
  HEIGHT = '70$ - 100$',
  PREMIUM = '100$ - 120$',
}
