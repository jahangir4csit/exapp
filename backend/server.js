const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  };

app.use(cors(corsOptions));

// Routes Middleware


// *** Error Middleware

app.get("/", (req, res)=>{
    res.send('Home Page');
})


const PORT = process.env.PORT || 5000;

// *** Connect to DB and Start Server
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server Running on Port ${PORT}`);
    })
})
.catch((err)=> console.log(err))