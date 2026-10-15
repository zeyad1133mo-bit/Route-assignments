import express from 'express';
import authRouter from './app/auth/auth.route.js';
import messageRouter from './app/message/message.route.js';
import userRouter from './app/user/user.route.js';


const app = express();
app.use(express.json());


app.use('/auth', authRouter);
app.use('/message', messageRouter);
app.use('/user', userRouter);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});