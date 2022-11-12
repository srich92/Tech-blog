const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

let database = 'techblog_db';
let username = 'root';
let password = '';

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        database,
        username, password, {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
        }
    );
}

module.exports = sequelize;