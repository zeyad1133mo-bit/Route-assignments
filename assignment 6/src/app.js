const express = require('express');
require('dotenv').config();
const { connectDB } = require('./config/db');
const app = express();

const collectionRoutes = require('./routes/collection.routes');
const bookRoutes = require('./routes/book.routes');
const logRoutes = require('./routes/log.routes');

app.use(express.json());
 
app.use('/collection', collectionRoutes);
app.use('/books', bookRoutes);
app.use('/logs', logRoutes);

const PORT = process.env.PORT || 3000;


async function startServer() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
startServer();


