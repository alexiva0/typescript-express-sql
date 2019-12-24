import express, {Express} from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import {envs} from './config';

import {rootDir, sequelize} from './utils';
import {Product, User, Cart, CartItem, Order, OrderItem} from './models';

import {adminRouter, shopRouter} from './routes';
import {errorController, userController, ADMIN_ID} from './controllers';
import {Sequelize} from 'sequelize/types';

const PORT = envs.PORT || 3333;

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(rootDir, '/views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));

app.use(userController.addAdminToReq);

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use(errorController.getErrorPage);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Order.belongsTo(User);
User.hasMany(Order);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsToMany(Product, {through: OrderItem});
Product.belongsToMany(Order, {through: OrderItem});

runApplication(sequelize, app);

async function runApplication(sequelize: Sequelize, app: Express) {
    try {
        await sequelize.sync();
        // await sequelize.sync({force: true});

        let user = await User.findByPk(ADMIN_ID);

        if (!user) {
            user = await User.create({name: 'Alex', email: 'test@test.com'})
        }

        if (!user) {
            throw new Error('Admin is not defined or database is damaged.')
        }

        let cart = await user.getCart();

        if (!cart) {
            cart = await user.createCart();
        }

        if (!cart) {
            throw new Error('Cart for this user is not defined or database is damaged.')
        }

        console.log(`Listen on the port ${PORT || '3333'}`);
        app.listen(PORT);
    } catch (err) {
        console.log(err);
    }
}
