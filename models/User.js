const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password); // method from bcrypt will determine true or false
  }
}

User.init(
  {
    // table columns in db,
    // that stores info from user when signing up
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    hooks: {
      // set up beforeCreate to run before /user-routes runs the route for .create
      // beforeCreate(data) {
      //   return bcrypt.hash(data.password, 10).then((newData) => {
      //     return newData;
      //   });
      // },
      async beforeCreate(newData) {
        newData.password = await bcrypt.hash(newData.password, 10);
        return newData;
      },
      // set up for .update
      async beforeUpdate(updatedData) {
        updatedData.password = await bcrypt.hash(updatedData.password, 10);
        return updatedData;
      },
    },
    //table config
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "user",
  }
);

module.exports = User;
