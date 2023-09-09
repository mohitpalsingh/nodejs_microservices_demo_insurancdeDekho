const express = require('express');
const cote = require('cote');
const axios = require('axios');

const app = express();

app.use(express.json());

const salesRequester = new cote.Requester({name: 'sales-requester', key : 'sales'})
const customerRequester = new cote.Requester({name : 'customer-requester', key : 'customer'});
const receiptRequester = new cote.Requester({name : 'receipt-requester', key : 'receipt'});
const financeRequester = new cote.Requester({name : 'finance-requester', key : 'financeTeam'});

app.get('/insurances', async (req, res) => {
    const insurances = await salesRequester.send({type : 'list'});
    console.log("listed insurances");

    res.send(insurances);
});

app.get('/customers', async (req, res) => {
    const customers = await customerRequester.send({type : 'list'});
    console.log("listed customers");

    res.send(customers);
});

app.get('/receipts', async (req, res) => {
    const receipts = await receiptRequester.send({type : 'list'});
    console.log("listed receipts");

    res.send(receipts);
});

app.get('/financeTeamMembers', async (req, res) => {
    const members = await financeRequester.send({type : 'list'});
    console.log("listed finance team members");

    res.send(members);
});

app.post('/addInsurance', async (req, res) => {
    const insurance = await salesRequester.send({type : 'update', info : req.body});
    console.log("added insurance");

    const customer = await customerRequester.send({type : 'update', info : req.body});
    console.log("added customer in customer-db");

    const receipt = await receiptRequester.send({type : 'generate', info : req.body});
    console.log("generated receipt");

    res.send(receipt);
});

app.post('/financeTeamMembers', async (req, res) => {
    const member = await financeRequester.send({type : 'update', info : req.body});
    console.log("added finance team member");

    res.send(member);
});

app.listen(3000, () => {
    console.log('API-GATEWAY is listening on PORT- 3000!');
});