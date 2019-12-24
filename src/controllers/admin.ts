import {Response} from 'express';
import {ROUTES} from '../routes/routes.config';
import {Product} from '../models';
import {IRequest, IProduct} from '../types';

const ROUTE_PREFIX = '/admin';

const adminController = {
    getProducts: (req: IRequest, res: Response): void => {
        req.user.getProducts()
            .then((products) => {
                res.render('admin/products', {products, title: 'Admin Products', path: '/admin/products'});
            })
            .catch(err => console.log(err));
    },
    getAddProduct: (_: IRequest, res: Response): void => {
        res.render('admin/edit-product', {title: 'Add Product', path: '/admin/add-product', editing: false});
    },
    postAddProduct: (req: IRequest, res: Response): void => {
        const productData: IProduct = req.body;
        req.user.createProduct({
            title: productData.title,
            price: productData.price,
            imageUrl: productData.imageUrl,
            description: productData.description
        })
            .then(() => {
                res.redirect(getAdminRoute(ROUTES.admin.products));
            })
            .catch(err => {
                console.log(err);
            });
    },
    getEditProduct: (req: IRequest, res: Response): void => {
        const productId = req.params.productId;
        if (!productId) {
            return res.redirect('/');
        }
        // Product.findByPk(productId)
        req.user.getProducts({where:{id: productId}})
            .then((products) => {
                const product = products[0];
                if (!product) {
                    return res.redirect('/');
                }
                res.render('admin/edit-product', {
                    title: 'Edit Product',
                    path: '/admin/edit-product',
                    editing: true,
                    product
                });
            });
    },
    postEditProduct: (req: IRequest, res: Response): void => {
        const productData: IProduct = req.body;
        const {id, description, imageUrl, price, title} = productData;
        Product.findByPk(id)
            .then((product) => {
                product.title = title;
                product.description = description;
                product.imageUrl = imageUrl;
                product.price = price;

                return product.save();
            })
            .then(() => {
                res.redirect(getAdminRoute(ROUTES.admin.products));
            })
            .catch((err) => console.log(err));
    },
    deleteProduct: (req: IRequest, res: Response): void => {
        Product.findByPk(req.body.id)
            .then((product) => {
                return product.destroy();
            })
            .then(() => {
                res.redirect(getAdminRoute(ROUTES.admin.products));
            })
            .catch((err) => console.log(err));
    }
};

function getAdminRoute(particialRoute: string): string {
    return ROUTE_PREFIX + particialRoute;
}

export {adminController};
