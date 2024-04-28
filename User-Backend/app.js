import express from 'express'
import authRouter from './src/Routes/User.Routes.js'
import courseRouter from './src/Routes/Shop.Routes.js'
import cors from 'cors'
import dotenv from 'dotenv'
import 'dotenv/config'
import cookieParser from 'cookie-parser'



const app = express ()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);


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
app.use('/api/v1/shop',courseRouter);




export default app