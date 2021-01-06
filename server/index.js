const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/codetalk',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// routes
app.use(require('./app/routes'));
app.listen(process.env.PORT || 3000, () => console.log('server on!'));

