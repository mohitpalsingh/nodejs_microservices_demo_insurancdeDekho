const cote = require('cote');

const receipts = [{
    id : 1,
    receipt : "receipt for Pratham"
}, {
    id : 2,
    receipt : "receipt for Abhay"
}, {
    id : 3,
    receipt : "receipt for Vinay"
}, {
    id : 4,
    receipt : "receipt for Avijit"
}, {
    id : 5,
    receipt : "receipt for Gagan"
}];

let idCounter = 6;

const receiptResponder = new cote.Responder({name : 'receipt-responder', key : 'receipt'});

const financePublisher = new cote.Publisher({name : 'finance-publisher', key : 'finance'});

receiptResponder.on('list', req => {
    return Promise.resolve(receipts);
})

receiptResponder.on('generate', req => {
    const receiptMsg = "receipt for " + req.info.customer;
    const receipt = {
        id : idCounter++,
        receipt : receiptMsg
    }
    receipts.push(receipt);

    financePublisher.publish('customer_added', req);

    return Promise.resolve(receipt);
})