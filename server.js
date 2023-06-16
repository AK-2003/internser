const app =require('./app')
const connectDatabase=require('./config/database')
const dotenv = require('dotenv');
const cloudinary = require('cloudinary')
//Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log(`Shutting down due to uncaught exception`);
    process.exit(1)
})

//setting   up config file
dotenv.config({path: 'config/config.env'})

// connect to Database
connectDatabase();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
  })



const server = app.listen(process.env.PORT,() =>{
    console.log(`server started on port:${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle UnHandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log(`Shutting down the server due to Unhandled Promise rejection`);
    server.close(() => {
        process.exit(1)
    })
})