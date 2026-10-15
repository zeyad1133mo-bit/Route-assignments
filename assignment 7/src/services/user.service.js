const User = require('../models/user.model');
const mongoose = require('mongoose');
async function signup(userData) {

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const user = new User(userData);
    return await user.save();
}

async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    if (user.password !== password) {
        throw new Error('Invalid password');
    }
    return user;
}


async function updateUser(userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }
    if (updateData.email) {
        const existingUser = await User.findOne({ email: updateData.email, _id: { $ne: userId } });
        if (existingUser) {
            throw new Error("Email already in use");
        }
    }
    const user = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true }
    );
    if (!user) {
        throw new Error("User not found");
    }
    const { password, ...userData } = user.toObject();
    return userData;
}

async function deleteUser(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

async function getUserById(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const { password, ...userData } = user.toObject();
    return userData;
}



module.exports = {
    signup,
    login,
    updateUser,
    deleteUser,
    getUserById
}