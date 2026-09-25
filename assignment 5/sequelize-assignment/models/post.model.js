 const { DataTypes, Model } = require("sequelize");

const sequelize = require("../config/database");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    title: {
      type: DataTypes.STRING
    },

    content: {
      type: DataTypes.TEXT
    },

    userId: {
      type: DataTypes.INTEGER
    },

    createdAt: {
      type: DataTypes.DATE
    },

    updatedAt: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    modelName: "Post",
    paranoid: true
  }
);

module.exports = Post; 