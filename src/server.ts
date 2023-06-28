import express from 'express';
import http from 'http'; 
import mongoose from 'mongoose';
import { config } from './config/config';
import Logger from './library/Logging';
import logger from './library/Logging';
import author_routes from './routes/author' 
import book_routes from './routes/Book' 
const router = express() 

// connect to mongoose 

mongoose.connect(config.mongo.url, {'retryWrites': true, w:'majority'})
.then(()=>{
    logger.info("connected to mongoDB")
    start_server()
})
.catch(error=>{
    logger.error(error)
}); 


// starting server. 


const start_server = () =>{
    router.use((req,res, next)=>{
        // log the request 
        
        logger.info(`--> Incoming request Method [${req.method}] -url : [${req.url}]- IP [${req.socket.remoteAddress}]`); 

        res.on('finish', ()=> {
         logger.info(`--> Outgoing request Method [${req.method}] -url : 
         [${req.url}]- IP [${req.socket.remoteAddress}] - Status[${res.statusCode}]`);
        })

        next(); 
    })
    
    router.use(express.urlencoded({extended:true})) 
    router.use(express.json())

   
    // rules for API 
    router.use((req,res,next)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        res.header('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')

        if (req.method == 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).json({})
        }

        next()
    })
    
    // Routes 

    router.use('/authors', author_routes); 

    router.use('/books', book_routes); 

   // Health check 
   router.get('/ping', (req,res, next)=> res.status(200).json({
        message: 'pong'
   }))

   
   router.use((req,res,next)=>{
    const error = new Error('not found')
    logger.error(error)

    return res.status(404).json({message:error.message})
   })
   
   http.createServer(router).listen(config.server.port, ()=>
   logger.info(`listening on port: ${config.server.port}`))
}

 
