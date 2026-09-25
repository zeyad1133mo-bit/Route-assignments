
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,

    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            checkPassword(value) {
                if (value.lengh <= 6) {
                    throw new Error("Password must be at least 6 characters long");
                }
            }
        }
    },

    role: {

        type: DataTypes.ENUM("user", "admin"),

    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }
});
User.beforeCreate((user) => {
    checkNameLength(user);
});


function checkNameLength(user) {
    if (user.name.length <= 2) {
        throw new Error("Name must be at least 3 characters long");
    }
}

module.exports = User;