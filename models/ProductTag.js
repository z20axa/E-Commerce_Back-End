const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
  {
    // define columns
    // * `id`
    id: {
      // * Integer.
      type: DataTypes.INTEGER,
      // * Doesn't allow null values.
      allowNull: false,
      // * Set as primary key.
      primaryKey: true,
      // * Uses auto increment.
      autoIncrement: true,
    },
    product_id: {
      // * Integer.
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    tag_id: {
      // * Integer.
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
