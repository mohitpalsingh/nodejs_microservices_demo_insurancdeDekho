const connectToDatabase = require("./db/conn.js");
const cote = require('cote');

let db;
async function connectDB() {
    db = await connectToDatabase();
}
connectDB();

const receiptResponder = new cote.Responder({name : 'receipt-responder', key : 'receipt'});
const financePublisher = new cote.Publisher({name : 'finance-publisher', key : 'finance'});

receiptResponder.on('list', async (req) => {
    const collection = await db.collection("receipts");
    let results = await collection.find().toArray();
    return results;
});

receiptResponder.on('generate', async (req) => {
    const receiptMsg = "receipt for " + req.info.customer;
    const receipt = {
        receipt : receiptMsg
    }
    const collection = await db.collection("receipts");
    let result = await collection.insertOne(receipt);

    financePublisher.publish('customer_added', req);

    return result;
});