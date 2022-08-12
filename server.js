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



// app root route app.get
app.get("/",(req,res)=>{
    console.log('root')
    res.send("APP ROOT")
 
})


//server initialization
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})
