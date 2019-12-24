import express from 'express';

import { shopController } from '../controllers';
import { ROUTES } from './routes.config';

const shopRouter = express.Router();

shopRouter.get(ROUTES.shop.default, shopController.getIndex);
shopRouter.get(ROUTES.shop.products, shopController.getProducts);
shopRouter.get(ROUTES.shop.product, shopController.getProduct);
shopRouter.get(ROUTES.shop.orders, shopController.getOrders);
shopRouter.get(ROUTES.shop.cart, shopController.getCart);
shopRouter.post(ROUTES.shop.cart, shopController.addToCart);
shopRouter.post(ROUTES.shop.deleteFromCart, shopController.deleteFromCart);
shopRouter.get(ROUTES.shop.checkout, shopController.getCheckout);
shopRouter.post(ROUTES.shop.createOrder, shopController.createOrder);

export { shopRouter };
