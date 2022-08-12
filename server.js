const express = require('express')
const app = express()
const mongoose = require('mongoose')
const axios = require('axios')

app.use((req, res, next) => {
   
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin.toString();
    if (allowedOrigins.includes(origin)) {
     res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
     console.log('origin' + origin);
     res.setHeader( 'Access-Control-Allow-Methods', '*')
     res.setHeader("Access-Control-Allow-Headers", "*");
     next();
   });
 

   const users = require('./routes/users')
   const gifts = require('./routes/gifts')
   const beta = require('./routes/beta')
   const lulu = require('./routes/lulu')
   const payment = require('./routes/stripe')
   const email = require('./routes/email')
   const userID = require('./routes/check')

   //initialization of variables 
const port = process.env.PORT || 3001

//middleware
app.use(express.urlencoded({ extended: true }))

// db connection - mongo atlas
const connectDB = async ()=>{
    await mongoose.connect(
        process.env.DB_URI,
                { useUnifiedTopology: true, useNewUrlParser: true },
                (err)=> {
                    if (err) {
                        console.log("could not connect to mongodb atlas" + '\n' + err)
                    }else {
                        console.log("connected to mongo")
                    }
                    
                }
            )
            
            }
//execute connection
connectDB()


// app route controllers - app.use
app.use("/users", users);
app.use("/gifts", gifts)
app.use("/beta", beta)
app.use("/lulu", lulu) // for all requests that go to the print api
app.use('/stripe', payment);
app.use('/email', email);
app.use('/unique', userID);
