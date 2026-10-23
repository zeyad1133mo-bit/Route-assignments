import express from 'express';
import { AppError } from './src/common/error/error.js';
import { logger } from './src/common/logger/logger.js';
import { otpExpired, invalidCode, invalidPassword } from './src/app/auth/errors.js';
import { userAlreadyExist, userNotExist } from './src/app/user/errors.js';

const app = express();
app.use(express.json());

// simulate routes that throw each error type
const throwErr = (e) => (_req, _res, next) => next(e);
app.get('/e/userAlreadyExist', throwErr(userAlreadyExist)); // AppError 409
app.get('/e/userNotExist', throwErr(userNotExist));         // AppError 404
app.get('/e/invalidPassword', throwErr(invalidPassword));   // PLAIN Error
app.get('/e/invalidCode', throwErr(invalidCode));           // PLAIN Error
app.get('/e/otpExpired', throwErr(otpExpired));             // PLAIN Error
app.get('/e/mongoose', throwErr(new Error('CastError: Cast to ObjectId failed'))); // plain runtime error

// exact copy of the global handler from main.js (placed AFTER routes)
app.use((err, req, res, next) => {
  logger.error(err.message, err);
  if (err.isOperational === true) {
    return res.status(err.statusCode || 500).json({
      message: err.message,
      success: false,
    });
  }
  return res.status(500).json({
    error: 'Something went wrong',
    success: false,
  });
});

const server = app.listen(3999, async () => {
  const paths = ['/e/userAlreadyExist', '/e/userNotExist', '/e/invalidPassword', '/e/invalidCode', '/e/otpExpired', '/e/mongoose'];
  for (const p of paths) {
    const r = await fetch('http://localhost:3999' + p);
    const body = await r.json();
    console.log(`POSTMAN SEES -> ${p} => status ${r.status} body:`, JSON.stringify(body));
  }
  server.close();
});
