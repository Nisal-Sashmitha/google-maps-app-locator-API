const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = 3000
const Store = require('./API/model/Store');

app.use(express.json({limit: '50mb'}));
//aKWgKjaZOZM2J5NM

mongoose.connect('mongodb+srv://Admin:aKWgKjaZOZM2J5NM@cluster0.1bqn7.mongodb.net/?retryWrites=true&w=majority');

app.get('/locations/', (req, res) => {
    res.send('Hello World!');
  })
app.post('/api/stores', (req, res) => {
    let dbStores = [];
    let stores = req.body;
    for(const store of stores){
        dbStores.push({
            storeName: store.name,
            phoneNumber:store.phoneNumber,
            address:store.address,
            openStatusText:store.openStatusText,
            addressLines: store.addressLines,
            location: {
              type:'Point',
              coordinates:[
                    store.coordinates.longitude,
                    store.coordinates.latitude
                ]
            }
        })
    }
    Store.create(dbStores, (err, stores)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(stores);
        }
    })
    
    
 })

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
app.delete('/api/stores', (req, res) => {
    Store.deleteMany({},(err)=>{
        res.status(200).send(err);
    });
 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
