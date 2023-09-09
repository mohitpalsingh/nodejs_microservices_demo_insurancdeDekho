const { MongoClient } = require('mongodb');

const connectionString = "mongodb://127.0.0.1:27017";

const client = new MongoClient(connectionString);

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db("insuranceDB");
        console.log("Connected to insuranceDB");
        return db;
    } catch (e) {
        console.error("Error connecting to insuranceDB:", e);
    }
}

module.exports = connectToDatabase;