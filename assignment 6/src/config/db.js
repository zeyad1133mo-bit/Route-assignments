const { MongoClient } = require("mongodb");
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;
async function connectDB() {
try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('Connected to MongoDB');


}catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
}
};
function getDB() 

{return db;
     
}



module.exports = {connectDB, getDB  };
