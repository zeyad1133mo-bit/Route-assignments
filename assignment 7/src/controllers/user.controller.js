const userService = require('../services/user.service');

async function signUp(req, res){

    try {
        const result = await userService.signup(req.body);
        res.status(201).json({ message: 'User created successfully', user: result });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });

    }

}
async function login(req, res){

    try{
        const {email, password} = req.body;
        const user = await userService.login(email, password);
        res.status(200).json({ 
            message: 'Login successful',
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                phone : user.phone,
                age : user.age,
            }
        });
    }catch(error){
        console.log(error)
        res.status(401).json({
            message: "Invalid email or password"
        });
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const { password, ...updateData } = req.body;

        const user = await userService.updateUser(userId, updateData);

        res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (error) {
        console.error(error);
        if (error.message === "Invalid user ID" || error.message === "User not found") {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === "Email already in use") {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        await userService.deleteUser(userId);

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error(error);
        if (error.message === "Invalid user ID" || error.message === "User not found") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function getUser(req, res) {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);

        res.status(200).json({
            message: "User found",
            user
        });
    } catch (error) {
        console.error(error);
        if (error.message === "Invalid user ID" || error.message === "User not found") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    signUp,
    login ,
    updateUser,
    deleteUser,
    getUser
}
