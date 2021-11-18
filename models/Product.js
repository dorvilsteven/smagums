const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model {}

Product.init(
  {
    // table columns in db
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productType: {
      // ?how to join tables
      allowNull: false,
    },
    brandName: {
      // ?
      allowNull: false,
    },
    productImageUrl,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    //table config
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "product",
  }
);

module.exports = Product;
