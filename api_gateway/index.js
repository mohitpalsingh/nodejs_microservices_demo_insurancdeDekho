const express = require('express');
const bodyParser = require('body-parser');
const cote = require('cote');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());


const salesRequester = new cote.Requester({name: 'sales-requester', key : 'sales'})
const customerRequester = new cote.Requester({name : 'customer-requester', key : 'customer'});
const recieptRequester = new cote.Requester({name: 'reciept-requester', key : 'reciept'});

app.get('/insurances', async (req, res) => {
    const insurances = await salesRequester.send({type : 'list'});
    console.log("listed insurances");
    res.send(insurances);
})

app.get('/customers', async (req, res) => {
    const customers = await customerRequester.send({type : 'list'});
    console.log("listed customers");
    res.send(customers);
})

app.post('/addInsurance', async (req, res) => {
    const insurance = await salesRequester.send({type : 'update', info : req.body});
    console.log("added insurance");

    const customer = await customerRequester.send({type : 'update', info : req.body});
    console.log("added customer in customer-db");

    // const reciept = await recieptRequester.send({type : 'generate', info : req.body});
    
    res.send(customer);
})

app.listen(3000, () => {
    console.log('API-GATEWAY is listening on PORT- 3000!');
})