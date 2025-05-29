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
