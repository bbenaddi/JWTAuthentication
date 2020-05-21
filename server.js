const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

const userRoute = require('./user');

app.use('/user',userRoute);

app.listen(3000,() => console.log('Server is Up and Running !', 'localhost:3000'));