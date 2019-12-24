import { Sequelize } from 'sequelize';
import { envs } from '../config';

const dbName = envs.DB_NAME;
const dbKey = envs.DB_KEY;

if (!dbName || !dbKey) {
    throw new Error('DB_NAME or DB_KEY did not set.')
}

const sequelize = new Sequelize(
    dbName,
    'root',
    dbKey,
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

export {sequelize};
