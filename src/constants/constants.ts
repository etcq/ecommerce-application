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
  CART_ID = 'cartId',
  CART_VERSION = 'cartVersion',
  ANONYMOUS_CART_ID = 'anonymousCartId',
  ANONYMOUS_ID = 'anonymousId',
  ACTIVE_PROMO = 'activePromo'
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

export enum CartMessages {
  DISCOUNT_CODE = 'Your code has been successfully accepted!',
  CART_CLEAR = 'Cart cleared successfully!',
  ITEM_DELETE = 'Product removed successfully!',
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

export enum FilterTitle {
  PRICE_RANGE = 'Price Range',
  SORT_BY = 'Sort By',
}

export enum SortingLabels {
  TO_HIGH = 'Price low to high',
  TO_LOW = 'Price high to low',
  BY_ALPHABET = 'By alphabet',
}

export const FilterCheckboxIds = {
  ALPHABETICAL_SORT: 'alphabetical',
  PRICE_ASCENDING_SORT: 'ascending',
  PRICE_DESCENDING_SORT: 'descending',
};

export enum ACTIONS {
  ADD_LINE_ITEM = 'addLineItem',
  CHANGE_LINE_ITEM_QUANTITY = 'changeLineItemQuantity',
  REMOVE_LINE_ITEM = 'removeLineItem',
  ADD_DISCOUNT_CODE = 'addDiscountCode',
  REMOVE_DISCOUNT_CODE = 'removeDiscountCode',
}

export enum DiscountSliderAlign {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export const menuDefaultLinks = [
  { route: ROUTES.MAIN, caption: 'Home' },
  { route: ROUTES.PRODUCT_LIST, caption: 'Catalog' },
  { route: ROUTES.ABOUT, caption: 'About Us' },
  { route: ROUTES.CART, caption: 'Cart' },
];

export enum RootCategories {
  MAN = 'Man',
  WOMAN = 'Woman',
}
