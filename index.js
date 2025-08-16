import express from 'express';
import { Server } from 'socket.io';
import cors from "cors"


const app=express()
app.use(cors())

app.use(express.json())


const PORT=process.env.PORT || 3000
const server=app.listen(PORT,()=>
{
    console.log(`Server is running on port ${PORT}`)
})


const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
    }
})

io.on("connection",(socket)=>
{
    console.log(`New client connected: ${socket.id}`)

    socket.on("message",(data)=>
    {
        console.log(`Message received from ${socket.id}: ${data}`)
        // we will handle it using redis in the future
    })
})
