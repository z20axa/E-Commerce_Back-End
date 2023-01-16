// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: ''
});

// Categories have many Products
Category.belongsToMany(Product, {
  foreignKey: ''
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: ''
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: ''
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
