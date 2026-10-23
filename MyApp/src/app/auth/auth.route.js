import { Router } from 'express';
import * as authController from "./controller/auth.controller.js";

const authRouter = Router();

authRouter.post('/register',authController.register);
authRouter.patch('/verify-account',authController.verifyAcount);
authRouter.post('/login',authController.login);
authRouter.post('/send-otp',authController.sendotp);
authRouter.patch('/reset-password',authController.resetPassword);
export default authRouter;
