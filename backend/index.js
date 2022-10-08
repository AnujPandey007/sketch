require('dotenv').config()

const userAuth = require('./routes/auth');
const usersApi = require('./routes/user');
const sketchesApi = require('./routes/sketch');

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const http = require("http");
const httpServer = http.createServer(app);
const {Server} = require("socket.io");

const io = new Server(httpServer, {
    cors:{
        origin: true
    }
})


io.on("connection",(socket)=>{
    
    console.log(`socket id:${socket.id} has connected`);

    socket.on("image-data",(data)=>{
      socket.broadcast.emit("image-data",data)    
    });

    socket.on("disconnect",(reason)=>{
      console.log(`${socket.id} has disconnected`) 
    });
});

const port = process.env.PORT || 3000;

//main
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://anuj:AfB5gyO6X2Xt8wuP@cluster0.easrnqk.mongodb.net/test");
  httpServer.listen(port, () => {
    console.log('Server running at', port)
})
}

//auth
app.use('/auth', userAuth);

//users 
app.use('/users', usersApi);

//sketches
app.use('/sketches', sketchesApi);