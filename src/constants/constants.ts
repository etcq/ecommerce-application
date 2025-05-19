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