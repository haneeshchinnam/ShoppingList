export const API_ENDPOINTS = {
    session: {
      refreshToken: '/api/auth/refresh',
      login: '/api/auth/login',
      register: '/api/auth/register'
    },
    product: {
      products: '/api/products',
      product: (productId: string) => `/api/products/${productId}`,
      category: '/api/products/category'
    },
    cart: {
      cart: '/api/cart',
    },
    order: {
      order: '/api/order',
    }
}