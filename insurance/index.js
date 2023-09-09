const connectToDatabase = require("./db/conn.js");
const cote = require('cote');

let db;
async function connectDB() {
    db = await connectToDatabase();
}
connectDB();

const salesResponder = new cote.Responder({name : 'sales-responder', key : 'sales'});

salesResponder.on('list', async (req) => {
    const collection = await db.collection("sales");
    let results = await collection.find().toArray();
    return results;
});

salesResponder.on('update', async (req) => {
    const insurance = {
        ...req.info    
    };
    const collection = await db.collection("sales");
    let result = await collection.insertOne(insurance);
    return result;

});