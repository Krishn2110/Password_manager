const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors');

dotenv.config()

// Connection URL
// const url = 'mongodb://localhost:27017';
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
// const dbName = 'passop';
const dbName = process.env.DB_NAME 
const app = express()
app.use(bodyparser.json())
app.use(cors())

// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working
const port = 3000

client.connect();

//  get all the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//  save the all passswords
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success:true , result: findResult})
})

//  delete the password
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success:true , result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})