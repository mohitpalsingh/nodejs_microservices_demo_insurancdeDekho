const express = require('express');
const bodyParser = require('body-parser');
const cote = require('cote');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

const salesFetchRequester = new cote.Requester({name : 'sales-fetch-requester', key : 'sales_fetch'});
const salesUpdateRequester = new cote.Requester({name: 'sales-update-requester', key : 'sales_update'})
const customerRequester = new cote.Requester({name : 'customer-requester', key : 'customer_update'});
const recieptRequester = new cote.Requester({name: 'reciept-requester', key : 'reciept_generate_and_fetch'});

app.get('/insurances', async (req, res) => {
    const insurances = await salesFetchRequester.send({type : 'list'});
    console.log("get insurances");
    res.send(insurances);
})

app.post('/addInsurance', async (req, res) => {
    const insurance = await salesUpdateRequester.send({type : 'update', info : req.body});
    console.log("added insurance");

    const customer = await customerRequester.send({type : 'update', info : req.body});
    console.log("added customer in customer-db");

    // const reciept = await recieptRequester.send({type : 'generate', info : req.body});
    
    res.send(customer);
})

app.listen(3000, () => {
    console.log('API-GATEWAY is listening on PORT- 3000!');
})