const cote = require('cote');

const insurances = [{
    id : 1,
    agent : 'Pranav',
    customer : 'Pratham',
    tenure : 3
}, {
    id : 2,
    agent : 'Abhishek',
    customer : 'Abhay',
    tenure : 5
}, {
    id : 3,
    agent : 'Manoj',
    customer : 'Vinay',
    tenure : 2
}, {
    id : 4,
    agent : 'Shashi',
    customer : 'Avijit',
    tenure : 1
}, {
    id : 5,
    agent : 'Puneet',
    customer : 'Gagan',
    tenure : 3
}];

let idCounter = 6;

const salesFetchResponder = new cote.Responder({name : 'sales-fetch-responder', key : 'sales_fetch'});

salesFetchResponder.on('list', req => Promise.resolve(insurances));

const salesUpdateResponder = new cote.Responder({name : 'sales-update-responder', key : 'sales_update'});

salesUpdateResponder.on('update', req => {
    const insurance = {
        id : idCounter++,
        ...req.info    
    };
    insurances.push(insurance);
    return Promise.resolve(insurance);
})