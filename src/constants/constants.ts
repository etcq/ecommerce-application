export enum ROUTES {
  MAIN = '/',
  ABOUT = '/about',
  PRODUCT_LIST = '/product-list',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  PROFILE = '/profile',
  BUCKET = '/bucket',
}

export enum CartSignInModeEnum {
  MergeWithExistingCustomerCart = 'MergeWithExistingCustomerCart',
}

export enum LocalStorageKeys {
  TOKEN = 'ctp-auth-token',
  ANONYMOUS_CART_ID = 'anonymousCartId',
}
