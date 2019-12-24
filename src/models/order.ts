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

import {sequelize} from '../utils';

import {IOrder} from '../types';
import {Product} from './product';

class Order extends Model implements IOrder {
    public id: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public addProduct!: BelongsToManyAddAssociationMixin<Product, number>;
    public addProducts!: BelongsToManyAddAssociationsMixin<Product, number>;
    public countProducts!: BelongsToManyCountAssociationsMixin;
    public createProduct!: BelongsToManyCreateAssociationMixin<Product>;
    public getProducts!: BelongsToManyGetAssociationsMixin<Product>;
    public hasProduct!: BelongsToManyHasAssociationMixin<Product, number>;
}

Order.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
}, {
    tableName: 'order',
    sequelize
});

export {Order};
