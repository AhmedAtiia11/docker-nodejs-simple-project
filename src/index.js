var express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg');
const os = require('os');
//create app
var app = express();
// connect to mongo db
// mongoose.connect('mongodb://root:example@mongo:27017').then(()=>console.log('connect to db...'));
//connect ro redis db
const redisclient = redis.createClient({
  url: 'redis://redis:6379'
});
redisclient.on('error', (err) => console.log('Redis Client Error', err));
redisclient.on('connect', () => console.log('Redis Client Connected...'));
redisclient.connect();



// connect to postgress
const postgressclient = new Client({
  user: 'postgresuser',
  host: 'postgres',
  database: 'test',
  password: 'password',
  port: 5432,
})
postgressclient.connect(function(err) {
  if (err) throw err;
  console.log("Connected to postgress...!");
});



//application page send requests to redis
app.get('/', function (req, res) {
  redisclient.set('product', 'you got me');
  console.log(`traffic from ${os.hostname}`);
  res.send('Hello World! broo');
});

//application page to get redis requests
app.get('/data',async(req, res)=> {
  const products = await client.get('product');
  res.send(`<h1>Hello World! broo </h1><h2>${products}</h2>`);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
