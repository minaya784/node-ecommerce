
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const User = require("./User");
const Cart = require("./Cart");
const Purchase = require("./Purchase");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductImg);
ProductImg.belongsTo(Product);

Product.hasMany(Cart);
Cart.belongsTo(Product);

Cart.belongsTo(User);
User.hasMany(Cart);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);


