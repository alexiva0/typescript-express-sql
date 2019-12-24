import express from 'express';

import { adminController } from '../controllers';
import { ROUTES } from './routes.config';

const adminRouter = express.Router();

// /admin/add-product => GET
adminRouter.get(ROUTES.admin.addProduct, adminController.getAddProduct);
// /admin/add-product => POST
adminRouter.post(ROUTES.admin.addProduct, adminController.postAddProduct);

// /admin/edit-product => GET
adminRouter.get(ROUTES.admin.editProduct, adminController.getEditProduct);
// /admin/edit-product => POST
adminRouter.post(ROUTES.admin.editProduct, adminController.postEditProduct);

// /admin/delete-product => POST
adminRouter.post(ROUTES.admin.deleteProduct, adminController.deleteProduct);

// /admin/products => GET
adminRouter.get(ROUTES.admin.products, adminController.getProducts);

export { adminRouter };
