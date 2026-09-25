const { DataTypes, Model } = require('sequelize');

const sequelize = require('../config/database');

class Comment extends Model { }

Comment.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING
    },
    postId: {
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER
    },

    createdAt: {
        type: DataTypes.DATE,
    },

    updatedAt: {
        type: DataTypes.DATE
    }
},
    {
        sequelize,
        modelName: "Comment"
    });


module.exports = Comment;