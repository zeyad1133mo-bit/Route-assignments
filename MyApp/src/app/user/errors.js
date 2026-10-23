import { AppError } from "../../common/error/error.js";

export const userNotExist = new AppError ('User Mot Exist',404);
export const userAlreadyExist = new AppError('User Already Exist',409);
export const userAlreadyVerified = new AppError('User Already Verified',400);
export const userNotVerified = new AppError ('User Not Verified',403);

// Error{message, cause, stack, name}
// Error.statusCode = 409
//  Error{message, cause, stack, name, statusCode = 409}
// JS >> allow ay7aga
// TS >> error >> statusCode in error object
// custom Class AppError >> Error & {statusCode}
