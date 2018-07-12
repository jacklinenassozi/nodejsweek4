"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _ContactList = require("./ContactList");

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("it works");

const app = (0, _express2.default)();
const my_contact_list = new _ContactList.ContactList('./my_list.json');


// parse application/x-www-form-urlencoded
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// parse application/json
app.use(_bodyParser2.default.json());
app.get('/', (req, res) => {
    res.send('helo world');
});
app.get('/contact', (req, res) => {
    res.send(my_contact_list.list);
});
app.get('/contact/:contact_id', (req, res) => {
    res.status(200).send('hello' + req.params.contact_id);
});

app.patch('/contact/:contact_id', (req, res) => {
    console.log(my_contact_list.list[req.params.id]);
    if (my_contact_list.list[req.params.id]) {
        const item = my_contact_list.editContact(req.params.id, req.body);
        res.status(200).send(item);
    } else {
        res.status(404).send(`The item with id ${req.params.id} was not found`);
    }
});

//res.send('patched' + req.params.contact_id)

app.post('/contact', (req, res) => {
    const contact = new _ContactList.Contact(req.body);
    my_contact_list.addContact(contact).then(list => res.send(list));
});
app.delete('/contact/:contact_id', (req, res) => {
    // const contact = new Contact(req.body)
    my_contact_list.removeContact(0);
    //.then(list=>res.send(list)) 
    //res.send('deleted' + req.params.contact_id)
    res.send(my_contact_list.list);
    console.log(my_contact_list.list);
});

app.listen(3000, function () {
    console.log('port on 3000');
});
//# sourceMappingURL=index.js.map