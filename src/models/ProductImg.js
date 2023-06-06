const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductImg = sequelize.define('productimg', {
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = ProductImg;