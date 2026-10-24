import * as authRepositorty from "../repository/auth.repository.js";
import * as otpRepository from "../../message/repository/otp.repository.js";
import * as userRepository from "../../user/repository/user.repository.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import {hashPassword, comparePassword} from "../utils/hash.js";
import { generateToken } from "../utils/token.js";
import { sendMail } from "../../../common/email/nodemailer.js";
import { otpExpired, invalidCode, invalidPassword } from "../errors.js";
import { userAlreadyVerified, userNotExist, userAlreadyExist, userNotVerified, } from "../../user/errors.js";
import { toMs, toSeconds } from "../../../common/utlits/time.js"
import { generateOTPCode } from "../../../common/utlits/otp.js";

export async function register(userData) {

    //1. check user existance

    const userExist = await authRepositorty.checkUserExistByEmail(userData.email)

    //2. if yes, throw an error

    if (userExist) throw userAlreadyExist;

    //3. prepare data [hash-password]

    userData.password = await hashPassword(userData.password);

    //4. save user into DB -> is verified: false

    const createUser = await authRepositorty.createUser(userData);

    //5. save otp into DB

    const code = generateOTPCode();
    await otpRepository.createOTP({
        code: code,
        email: userData.email,
        expiresAt: new Date(Date.now() + toMs(5, 'minutes')),
    });

    //6. send email verification OTP

    await sendMail(userData.email, 'verification code', `<h1>Your verification code is ${code} </h1>`);

    return createUser;

}

export async function verifyAcount(email, code) {

    // 1. check user existance 
    const user = await authRepositorty.checkUserExistByEmail(email);
    // 1.1 if you don't exist >> error "User not exist"
    if (!user) throw userNotExist
    // 1.2 if isVerified = true >> error " you already verified"\
    if (user.isVerified === true) throw userAlreadyVerified;
    // 2 check otp validation 
    const otp = await otpRepository.getOtpByEmail(email);
    // 2.1 not exist into db >> error >> " otp expired " resend otp
    if (!otp) throw otpExpired;
    // 2.2 otp stored into db >> code not equal code stored >> error >> 'invalid otp
    if (otp.code !== code) throw invalidCode;
    // 3 switch your isVerified to true [update user]
    const updatedUser = await userRepository.updateUserByEmail(email, { isVerified: true });
    // 4. delete otp from db
    await otpRepository.deleteOTPsByEmail(email);

    return updatedUser;

}

export async function login(email, password) {

    // 1. check user existance
    const user = await authRepositorty.checkUserExistByEmail(email);
    // 1.1 not exist
    if (!user) throw userNotExist;// ==>>
    // 1.2 not verified 
    if (user.isVerified === false) throw userNotVerified;
    // 2 compare password
    const match = await comparePassword(password, user.password);
    if (!match) throw invalidPassword;
    // 3 generate access token
   
        return generateToken({ id: user._id, email: user.email, role: user.role });
}

export async function sendOtp(email, message) {
    // 1. check User existence
    const user = await authRepositorty.checkUserExistByEmail(email);
    if (!user) throw userNotExist;
    // 2. delete all old OTP
    await otpRepository.deleteOTPsByEmail(email);
    // 3. generate otp and save into database
    const code = generateOTPCode();
    // save into db
    await otpRepository.createOTP({
        code: code,
        email: email,
        expiresAt: new Date(Date.now() + toMs(5, 'minutes')),
    });
    // 4. send otp email
    await sendMail(email, 'new otp', `<p>your otp is ${code} </p>`);
}


export async function resetPassword(email, code, newPassword) {

    // 1. check otp existence
    const otp = await otpRepository.getOtpByEmail(email);
    if (!otp) throw otpExpired;
    // 2. check code validity
    if (otp.code !== code) throw invalidCode;
    // 3. hash new password
    const hashedPassword = await hashPassword(newPassword);
    // 4. update user password
    await userRepository.updateUserByEmail(email, { password: hashedPassword });
    // 5. delete all otps for this email
    await otpRepository.deleteOTPsByEmail(email);
    // 6. delete otp from db
    await otpRepository.deleteOTPByEmail(email);                                                                                                                                                                 
}