import express from 'express';
import authRouter from './app/auth/auth.route.js';
import messageRouter from './app/message/message.route.js';
import userRouter from './app/user/user.route.js';
import { connectDB } from './common/db/mongoose.js';
import { OTP } from './app/auth/model/otp.model.js';

import {logger} from './common/logger/logger.js'

const app = express();
app.use(express.json());


app.use('/auth', authRouter);
app.use('/message', messageRouter);
app.use('/user', userRouter);

// global error handler
app.use((err,req,res,next) => {
  logger.error(err.message,err);
  if(err.isOperational === true){
    return res.status(err.statusCode || 500).json({
    message: err.message,
    success: false,

  })}
  return res.status(500).json({
    error: 'Something went wrong',
    success: false
  })
})
await connectDB();

app.listen(3000, () => {
  logger.info('Server is running on port 3000');
});
