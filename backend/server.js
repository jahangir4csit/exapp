const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportStrategy = require("./passport");

const cookieParser = require('cookie-parser');
const path = require('path');

const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const errorHandler = require('./middleWare/errorMiddleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
    cookieSession({
        name: "session",
        keys: ['exapp'],
        maxAge: 24*60*60*100
    })
);
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
    origin: ['http://localhost:3000', 'https://nodexapp.netlify.app/'],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  };

app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes Middleware
app.use('/api/users',  userRoute);
app.use('/api/products', productRoute);


// *** Error Middleware
app.use(errorHandler);

mongoose.set('strictQuery', false);

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