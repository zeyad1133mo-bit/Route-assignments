import { toMs } from "../../../common/utlits/time.js";
import * as authService from "../service/auth.service.js";

export async function register(req, res, next) {

    try {
        const createUser = await authService.register(req.body);
        res.status(201).json({
            message: 'User Created Successfuly',
            success: true,
            data: createUser,
        });
    } catch (error) {
        next(error);
    }
}


export async function verifyAcount(req,res,next){

    try{
        const{ email,code} = req.body;
        const updatedUser = await authService.verifyAcount(email, code);

        res.json({
            message: 'User Verified Successfuly',
            successA: true,
            data: updatedUser,
        })

    }catch(error){
       next(error);
    }
}

export async function login(req,res,next){
    try{
const {email,password} = req.body;
const token = await authService.login(email,password);
res.cookie('access_token',token,{
    httpOnly: true,
    maxAge: toMs(1,'hours')
})
res.json({
    message: 'User Login Successfuly',
    success: true
})
    }catch(error){

        next(error);
    }
}