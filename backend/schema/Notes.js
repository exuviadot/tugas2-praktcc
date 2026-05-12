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
    timestamps: true
});

module.exports = Notes;