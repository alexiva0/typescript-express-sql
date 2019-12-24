import {Model, DataTypes} from 'sequelize';

import {sequelize} from '../utils';

import {ICartItem} from '../types';

class CartItem extends Model implements ICartItem {
    public id: number;
    public quantity: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CartItem.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER
}, {
    tableName: 'cartItem',
    sequelize
});

export {CartItem};
