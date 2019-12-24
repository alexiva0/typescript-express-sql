import {
    Model,
    DataTypes,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyHasAssociationMixin
} from 'sequelize';

import { sequelize } from '../utils';

import { IProduct } from '../types';
import { Cart, Order, CartItem, OrderItem } from './';

class Product extends Model implements IProduct {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    description: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;


    addCart!: BelongsToManyAddAssociationMixin<Cart, number>;
    addCarts!: BelongsToManyAddAssociationsMixin<Cart, number>;
    countCarts!: BelongsToManyCountAssociationsMixin;
    createCart!: BelongsToManyCreateAssociationMixin<Cart>;
    getCarts!: BelongsToManyGetAssociationsMixin<Cart>;
    hasCart!: BelongsToManyHasAssociationMixin<Cart, number>;

    CartItem: CartItem;

    addOrder!: BelongsToManyAddAssociationMixin<Order, number>;
    addOrders!: BelongsToManyAddAssociationsMixin<Order, number>;
    countOrders!: BelongsToManyCountAssociationsMixin;
    createOrder!: BelongsToManyCreateAssociationMixin<Order>;
    getOrders!: BelongsToManyGetAssociationsMixin<Order>;
    hasOrder!: BelongsToManyHasAssociationMixin<Order, number>;

    OrderItem: OrderItem;
}

Product.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: new DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: new DataTypes.DOUBLE(255, 2),
        allowNull: false
    },
    imageUrl: {
        type: new DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: new DataTypes.TEXT(),
        allowNull: false
    }
}, {
    tableName: 'product',
    sequelize
});

export { Product };
