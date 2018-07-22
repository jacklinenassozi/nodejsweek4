console.log("it works");
import express from 'express'
import {ContactList,Contact} from "./ContactList"
const app = express();
 const my_contact_list = new ContactList('./my_list.json')
 import bodyParser from 'body-parser';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.send('helo world')
})
app.get('/contact',(req,res)=>{
    res.send(my_contact_list.list)
})
app.get('/contact/:contact_id',(req,res)=>{
    console.log(req.params.contact_id)
    res.status(200).send('hello' + req.params.contact_id)
})


    app.patch('/contact/:contact_id', (req, res) => {
        console.log(req.body.id)
        if (req.body.id) {
            const item = my_contact_list.editContact(req.params.contact_id,req.body);
            res.status(200).send(item);
        } else {
            res.status(404).send(`The item with id ${req.params.contact_id} was not found`);
        }
     })
    
    
    //res.send('patched' + req.params.contact_id)
    
app.post('/contact',(req,res)=>{
    const contact = new Contact(req.body)
  my_contact_list.addContact(contact)
  .then(list=>res.send(list))
})
app.delete('/contact/:contact_id',(req,res)=>{
   // const contact = new Contact(req.body)
    my_contact_list.removeContact(req.params.contact_id)
    //.then(list=>res.send(list)) 
    //res.send('deleted' + req.params.contact_id)
    res.send(my_contact_list.list)
    
})

app.listen(3000,function(){
    console.log('port on 3000')
})