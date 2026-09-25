const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "sequelize_assignment",
  "root",
  "12345",
  {
    host: "localhost",
    dialect: "mysql"
  }
);
module.exports = sequelize;