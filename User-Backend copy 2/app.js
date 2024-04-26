import express from 'express'
import authRouter from './src/Routes/User.Routes.js'

import dotenv from 'dotenv'
import 'dotenv/config'
import cookieParser from 'cookie-parser'



const app = express ()


dotenv.config({
    path:'./env'
})

app.use(cookieParser())

app.use(
    express.json({
      limit: "16kb",
    })
  );
  // to take the data from url
  app.use(
    express.urlencoded({
      extended: true,
      limit: "16kb",
    })
  );



// for routes 
app.use('/api/v1/user',authRouter);




export default app