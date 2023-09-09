const connectToDatabase = require("./db/conn.js");
const cote = require('cote');

let db;
async function connectDB() {
    db = await connectToDatabase();
}
connectDB();

const customerResponder = new cote.Responder({name : 'customer-responder', key : 'customer'});

customerResponder.on('list', async (req) => {
    const collection = await db.collection("customers");
    let results = await collection.find().toArray();
    return results;
});

customerResponder.on('update', async (req) => {
    const customer = {
        name : req.info.customer    
    };
    const collection = await db.collection("customers");
    let result = await collection.insertOne(customer);
    return result;
});