const express = require ('express')
const mongo = require ('mongodb').MongoClient
const cors = require ('cors')

require('dotenv/config')

const app = express()
app.use(cors())
app.use(express.json())


const url = process.env.MONGO_URL
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

let menudb, customersdb

mongo.connect(url, options, (err, mongoClient) => {
    if (err){
        console.error(err)
        return
    }
    console.log('We are connected!')
    app.listen(3000, () => console.log('App is listening on port 3000'))

    const db = mongoClient.db('restaurant')
    customersdb = db.collection('customers')
    menudb = db.collection('menu')
})


// Get
app.get('/', (req, res) => res.status(200).send('Hey Class Good Morning!'))



app.post('/', (req, res) => {
    //console.log('This is the ', req.body)
    //const dish1 = { name:'Leche de Tigre'}
    menudb.insertOne(req.body)
    //menudb.insertOne(dish1)
    res.status(201).send('Item was added')
})

// patch
app.patch('/', (req, res) => {
    menudb.updateOne({name: 'ceviche'}, {$set: {name: 'Tequila', cost: 30, stock: true}})
    .then(() => res.send('Item was updated'))

})

//app.patch('/:id', (req, res))  waitng for jo




// delete
app.delete('/', (req, res) => {
    menudb.deleteOne({name:req.body.name}).then(() => res.send('Item was deleted'))
})
