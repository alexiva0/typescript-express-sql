import {Response} from 'express';
import {IRequest} from '../types';
import {Product, OrderItem} from '../models';

const shopController = {
    getIndex: (_: IRequest, res: Response): void => {
        Product.findAll()
            .then((products) => {
                res.render('shop/index', {products, title: 'Shop', path: '/'});
            })
            .catch(err => {
                console.log(err);
            });
    },
    getProducts: (_: IRequest, res: Response) => {
        Product.findAll()
            .then((products) => {
                res.render('shop/products', {products, title: 'Products', path: '/products'});
            })
            .catch(err => {
                console.log(err);
            });
    },
    getProduct: (req: IRequest, res: Response) => {
        const productId: string = req.params.productId;
        Product.findByPk(productId)
            .then((product) => {
                res.render('shop/product-details', {
                    title: product.title,
                    path: '/products',
                    product
                })
            });
    },
    getOrders: async (req: IRequest, res: Response) => {
        try {
            const orders = await req.user.getOrders({include: ['Products']});

            res.render('shop/orders', {title: 'Orders', path: '/orders', orders});
        } catch (err) {
            console.log(err);
        }
    },
    getCart: (req: IRequest, res: Response) => {
        req.user
            .getCart()
            .then((cart) => {
                return cart.getProducts();
            })
            .then((products) => {
                res.render('shop/cart', {title: 'Cart', path: '/cart', products});
            })
            .catch((err) => console.log(err));
    },
    addToCart: async (req: IRequest, res: Response) => {
        try {
            const productId: string = req.body.productId;
            const cart = await req.user.getCart();
            let product = (await cart.getProducts({where: {id: productId}}))[0];

            if (!product) {
                product = await Product.findByPk(productId);
            }

            cart.addProduct(product, {
                through: {
                    quantity: product.CartItem ? product.CartItem.quantity + 1 : 1
                }
            });
            res.redirect('/');
        } catch (err) {
            console.log(err);
        }
    },
    deleteFromCart: async (req: IRequest, res: Response) => {
        try {
            const productId: string = req.body.productId;
            const cart = await req.user.getCart();
            const product = (await cart.getProducts({where: {id: productId}}))[0];
            product.CartItem.destroy();
            res.redirect('/cart');
        } catch (err) {
            console.log(err);
        }
    },
    getCheckout: (_: IRequest, res: Response) => {
        res.render('shop/checkout', {title: 'Checkout', path: '/checkout'});
    },
    createOrder: async (req: IRequest, res: Response) => {
        try {
            const cart = await req.user.getCart();
            const products = (await cart.getProducts()).map<Product>((product) => {
                const orderItem = {
                    quantity: product.CartItem.quantity
                };
                product.OrderItem = orderItem as OrderItem;
                return product;
            });
            const order = await req.user.createOrder();
            await order.addProducts(products);
            await cart.setProducts(null);

            res.render('shop/orders');
        } catch (err) {
            console.log(err);
        }
    }
};

export {shopController};
