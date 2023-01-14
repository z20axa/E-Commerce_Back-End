const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    // * `id`
    id: {
      // * Integer.
      type: DataTypes.INTEGER
      
      // * Doesn't allow null values.
    
      // * Set as primary key.
    
      // * Uses auto increment.
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
