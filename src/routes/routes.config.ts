const ROUTES = {
    shop: {
        default: '/',
        products: '/products',
        cart: '/cart',
        deleteFromCart: '/cart-delete-item',
        checkout: '/checkout',
        orders: '/orders',
        product: '/products/:productId',
        createOrder: '/create-order'
    },
    admin: {
        addProduct: '/add-product',
        products: '/products',
        editProduct: '/edit-product/:productId',
        deleteProduct: '/delete-product'
    }
}

export { ROUTES };
