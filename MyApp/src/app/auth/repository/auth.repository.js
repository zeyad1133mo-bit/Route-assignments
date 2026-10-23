import {User} from "../../user/model/user.model.js";

export async function checkUserExistByEmail(email){
    return User.findOne({email:email});
}

export async function createUser(userData){
    return User.create(userData);
}
