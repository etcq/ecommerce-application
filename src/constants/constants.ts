export enum ROUTES {
  MAIN = '/',
  ABOUT = '/about',
  PRODUCT_LIST = '/product-list',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  PROFILE = '/profile',
  PASSWORD = '/password',
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

export enum UserUpdateMessages {
  UPDATE = 'Saved successfully!',
  ADDRESS_UPDATE = 'Address updated successfully!',
  ADDRESS_NEW = 'New address added successfully!',
  ADDRESS_REMOVE = 'Address deleted successfully!',
  ADDRESS_SHIPPING = 'Default shipping address updated!',
  ADDRESS_BILLING = 'Default billing address updated!',
}

export const BASE_LIMIT_PER_PAGE = 9;
export const BASE_PAGINATION_WIDTH = 60;
export const SEARCH_DEBOUNCE_TIME = 1000;

export const LOCALIZATION = 'en-US';

export const CATEGORY_MESSAGE = "Don't know what to choose? Select a category...";

export const PriceFiltersArray = [
  {
    key: 'LOW',
    label: '20$ - 50$',
    range: { min: 2000, max: 5000 },
  },
  {
    key: 'MEDIUM',
    label: '50$ - 70$',
    range: { min: 5000, max: 7000 },
  },
  {
    key: 'HEIGHT',
    label: '70$ - 100$',
    range: { min: 7000, max: 10000 },
  },
  {
    key: 'PREMIUM',
    label: '100$ - 120$',
    range: { min: 10000, max: 12000 },
  },
];

export enum SortingLabels {
  TO_HIGH = 'Price low to high',
  TO_LOW = 'Price high to low',
  BY_ALPHABET = 'By alphabet',
}
