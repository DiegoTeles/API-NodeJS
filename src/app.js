'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// Conectar ao banco
mongoose.connect('mongodb://telles:telles@ds014118.mlab.com:14118/ndstore');

//Carregar Models
const Products = require('./models/product-model');
const Customer = require('./models/customer-model');
const Order = require('./models/order-model');

//Carregar Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;