import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import Redis from "ioredis";
import { configDotenv } from "dotenv";
import { connectDb } from "./db/connect.js";
import { createTopic, produceMessage } from "./kafka/producer.js";
import { TOPIC } from "./kafka/consumer.js";

const app = express();

(async () => {
  await createTopic(TOPIC);
})();

const env = process.env.NODE_ENV;

configDotenv({ path: `.env.${env}` });

const redisInstance = () => {
  return new Redis({
    port: process.env.PORT,
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.PASSWORD,
    tls: {},
  });
};

const Channel = "MESSAGES";

const Pub = redisInstance();
const Sub = redisInstance();

(async () => {
  await Sub.subscribe(Channel);
})();

app.use(cors());

app.use(express.json());

const PORT = 3000;

(async () => {
  await connectDb();
})();
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("message", async (data) => {
    // we will handle it using redis in the future

    await Pub.publish(Channel, JSON.stringify(data));
  });

  Sub.on(
    "message",
    (Channel,
    async (channel, message) => {
      console.log(`Message: ${message} came from ${channel}`);
      await produceMessage(`MESSAGE ${Date.now()}`, message, TOPIC);
      socket.emit("message", { id: socket.id, message });
    })
  );
});
