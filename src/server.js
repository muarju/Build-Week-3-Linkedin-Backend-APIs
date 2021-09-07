import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from 'mongoose'
import bodyParser from "body-parser";
import postRoutes from './services/posts/routes.js'
import profileRouter from './services/profile/routes.js'
import {badRequestErrorHandler, catchAllErrorHandler, notFoundErrorHandler} from './errorHandlers.js'
import cors from "cors";

const server = express()

const port = process.env.PORT || 3001 || 3000

// ******************** MIDDLEWARES ******************
server.use(cors());

server.use(express.json())
// parse requests of content-type - application/json
server.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

// ******************* ROUTES ***********************
server.use('/post',postRoutes)
server.use('/profile', profileRouter)

// ******************* ERROR HANDLERS ******************

server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(catchAllErrorHandler)


mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log('Successfully connected to mongo!')
  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log("Server is running on port ", port)
  })
})

mongoose.connection.on("error", err => {
  console.log("MONGO ERROR: ", err)
})
