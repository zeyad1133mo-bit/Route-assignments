import { toMs } from "../../../common/utlits/time.js";
import * as authService from "../service/auth.service.js";
import { validateBody } from "../../../common/validation/validation.js";
import { registerDTO, verifyAccountDTO, resetPasswordDTO, sendOtpDTO, loginDTO } from "../dto/auth.dot.js";

export async function register(req, res, next) {

    try {
        // add layer of validation >> throw error if not valid
        const data = validateBody(registerDTO, req.body);
        const createUser = await authService.register(data);
        res.status(201).json({
            message: 'User Created Successfuly',
            success: true,
            data: createUser,
        });
    } catch (error) {
        next(error);
    }
}


export async function verifyAcount(req, res, next) {

    try {
        // add layer of validation >> throw error if not valid
        const data = validateBody(verifyAccountDTO, req.body);
        const { email, code } = data;
        const updatedUser = await authService.verifyAcount(email, code);

        res.json({
            message: 'User Verified Successfuly',
            successA: true,
            data: updatedUser,
        })

    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        // add layer of validation >> throw error if not valid
        const data = validateBody(loginDTO, req.body);
        const { email, password } = data;
        const token = await authService.login(email, password);
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: toMs(1, 'hours')
        })
        res.json({
            message: 'User Login Successfuly',
            success: true
        })
    } catch (error) {

        next(error);
    }
}

export async function sendotp(req, res, next) {
    try {
        // add layer of validation >> throw error if not valid
        const data = validateBody(sendOtpDTO, req.body);
        const { email } = data;
        await authService.sendOtp(email);
        res.json({
            message: "new otp sent, check user email",
            success: true
        })


    } catch (error) {
        next(error)
    }
}

export async function resetPassword(req, res, next) {


    try {
        
        // add layer of validation >> throw error if not valid

        const data = validateBody(resetPasswordDTO, req.body) ;
        const { email, code, newPassword } = data ;
        const updatedUser = await authService.resetPassword(email, code, newPassword);
        res.json({
            message: "password reset successfuly",
            success: true,
            data: updatedUser
        })
    } catch (error) {
        next(error)
    }
}