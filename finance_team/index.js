const connectToDatabase = require("./db/conn.js");
const cote = require('cote');

let db;
async function connectDB() {
    db = await connectToDatabase();
}
connectDB();

const financeSubscriber = new cote.Subscriber({name : 'finance-subscriber', key : 'finance'});
const financeResponder = new cote.Responder({name : 'finance-responder', key : 'financeTeam'});

financeResponder.on('list', async (req) => {
    const collection = await db.collection("finance_team");
    let finance_members = await collection.find().toArray();
    return finance_members;
});

financeResponder.on('update', async (req) => {
    const member = {
        name : req.info.name
    };
    const collection = await db.collection("finance_team");
    let result = await collection.insertOne(member);
    return result;
});

financeSubscriber.on('customer_added', async (req) => {
    const collection = await db.collection("finance_team");
    let finance_members = await collection.find().toArray();
    for (const member of finance_members) {
        console.log(`Alert for customer ${req.info.customer} to member ${member.name} is generated!`);
    }
});