import * as authRepositorty from "../repository/auth.repository.js";
import * as otpRepository from "../../message/repository/otp.repository.js";
import * as userRepository from "../../user/repository/user.repository.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { sendMail } from "../../../common/email/nodemailer.js";
import { otpExpired, invalidCode, invalidPassword } from "../errors.js";
import { userAlreadyVerified, userNotExist, userAlreadyExist, userNotVerified, } from "../../user/errors.js";
import { toMs, toSeconds } from "../../../common/utlits/time.js"


export async function register(userData) {

    //1. check user existance

    const userExist = await authRepositorty.checkUserExistByEmail(userData.email)

    //2. if yes, throw an error

    if (userExist) throw userAlreadyExist;

    //3. prepare data [hash-password]

    userData.password = await bcrypt.hash(userData.password, 10);

    //4. save user into DB -> is verified: false

    const createUser = await authRepositorty.createUser(userData);

    //5. save otp into DB

    const otp = crypto.randomInt(100000, 999999).toString();
    await otpRepository.createOTP({
        code: otp,
        email: userData.email,
        expiresAt: new Date(Date.now() + toMs(5, 'minutes')),
    });

    //6. send email verification OTP

    await sendMail(userData.email, 'verification code', `<h1>Your verification code is ${otp} </h1>`);

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
    await otpRepository.deleteOTP(email);

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
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw invalidPassword;
    // 3 generate access token
    const token = jwt.sign({ id: user.__id, email: user.email, name: user.name },
        'proccess.env.JWT_SECRET',
        { expiresIn: toMs(1, 'hours') })
        return token;
}

