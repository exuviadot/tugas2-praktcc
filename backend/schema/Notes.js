const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notes = sequelize.define('Notes', {
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isi: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'notes',
    createdAt: 'tanggal_dibuat',
    updatedAt: false
});

module.exports = Notes;