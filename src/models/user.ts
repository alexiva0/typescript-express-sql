import {
    Model,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasOneCreateAssociationMixin,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin
} from 'sequelize';

import {sequelize} from '../utils';

import {IUser} from '../types';
import {Product, Cart, Order} from './'

class User extends Model implements IUser {
    public static associations: {
        products: Association<User, Product>;
    };

    public id: number;
    public name: string;
    public email: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.

    public getProducts!: HasManyGetAssociationsMixin<Product>; // Note the null assertions!
    public addProduct!: HasManyAddAssociationMixin<Product, number>;
    public hasProduct!: HasManyHasAssociationMixin<Product, number>;
    public countProducts!: HasManyCountAssociationsMixin;
    public createProduct!: HasManyCreateAssociationMixin<Product>;

    public createCart!: HasOneCreateAssociationMixin<Cart>;
    public getCart!: HasOneGetAssociationMixin<Cart>;
    public setCart!: HasOneSetAssociationMixin<Cart, number>;

    public getOrders!: HasManyGetAssociationsMixin<Order>; // Note the null assertions!
    public addOrder!: HasManyAddAssociationMixin<Order, number>;
    public hasOrder!: HasManyHasAssociationMixin<Order, number>;
    public countOrders!: HasManyCountAssociationsMixin;
    public createOrder!: HasManyCreateAssociationMixin<Order>;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: new DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: new DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'users',
    sequelize
});

export {User};
