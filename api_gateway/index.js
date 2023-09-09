const express = require('express');
const bodyParser = require('body-parser');
const cote = require('cote');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

const salesFetchRequester = new cote.Requester({name : 'sales-fetch-requester', key : 'sales_fetch'});
const salesUpdateRequester = new cote.Requester({name: 'sales-update-requester', key : 'sales_update'})
const customerRequester = new cote.Requester({name : 'customer-requester', key : 'customer'});
const recieptRequester = new cote.Requester({name: 'reciept-requester', key : 'reciept'});

app.get('/insurances', async (req, res) => {
    const insurances = await salesFetchRequester.send({type : 'list'});
    res.sendStatus(200).send(insurances);
})

app.post('/addInsurance', async (req, res) => {
    const insurance = await salesUpdateRequester({type : 'update', info : req.body});

    const customer = await customerRequester({type : 'update', info : req.body});

    const reciept = await recieptRequester({type : 'generate', info : req.body});

    res.sendStatus(200).send(reciept);
})

app.listen(3000, () => {
    console.log('API-GATEWAY is listening on PORT- 3000!');
})