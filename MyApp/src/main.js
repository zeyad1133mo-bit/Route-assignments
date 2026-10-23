import express from 'express';
import authRouter from './app/auth/auth.route.js';
import messageRouter from './app/message/message.route.js';
import userRouter from './app/user/user.route.js';
import { connectDB } from './common/db/mongoose.js';
import { OTP } from './app/auth/model/otp.model.js';


const app = express();
app.use(express.json());


app.use('/auth', authRouter);
app.use('/message', messageRouter);
app.use('/user', userRouter);

// global error handler
app.use((err,req,res,next) => {
  res.json({
    message: err.message,
    success: false,
    stack: err.stack
  })
})
await connectDB();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
