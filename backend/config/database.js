const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('notes_db', 'tugas2', 'exuvia', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;