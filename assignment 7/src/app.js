const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

const userRoutes = require('./routes/user.route');
const noteRoutes = require('./routes/note.route');

const app = express();

app.use(express.json());



app.use('/users', userRoutes);
app.use('/notes', noteRoutes);


const PORT = process.env.PORT || 3000;

async function startServer(){
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();
