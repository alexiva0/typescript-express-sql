import {Model, DataTypes} from 'sequelize';

import {sequelize} from '../utils';

import {IOrderItem} from '../types';

class OrderItem extends Model implements IOrderItem {
    public id: number;
    public quantity: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

OrderItem.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER
}, {
    tableName: 'orderItem',
    sequelize
});

export {OrderItem};
