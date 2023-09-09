const cote = require('cote');

finance_members = [{
    id : 1,
    name : "Dedeepya"
}, {
    id : 2,
    name : "Krishna"
}, {
    id : 3,
    name : "SaiMani"
}, {
    id : 4,
    name : "Niharika"
}, {
    id : 5,
    name : "Ajay"
}];

let idCounter = 6;

const financeSubscriber = new cote.Subscriber({name : 'finance-subscriber', key : 'finance'});

financeSubscriber.on('customer_added', req => {
    for (const member of finance_members) {
        console.log(`Alert for customer ${req.info.customer} to member ${member.name} is generated!`);
    }
})