const cote = require('cote');

const customers = [{
    id : 1,
    name : "Pratham"
}, {
    id : 2,
    name : "Abhay"
}, {
    id : 3,
    name : "Vinay"
}, {
    id : 4,
    name : "Avijit"
}, {
    id : 5,
    name : "Gagan"
}];

let idCounter = 6;

const customerResponder = new cote.Responder({name : 'customer-responder', key : 'customer'});

customerResponder.on('list', req => {
    return Promise.resolve(customers);
})

customerResponder.on('update', req => {
    const customer = {
        id : idCounter++,
        customer : req.info.customer
    }
    customers.push(customer);
    return Promise.resolve(customer);
})