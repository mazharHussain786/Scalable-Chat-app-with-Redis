import { Kafka } from "kafkajs";
import { configDotenv } from "dotenv";

import fs from "fs";

const env = process.env.NODE_ENV || "production";
configDotenv({ path: `.env.${env}` });

export const kafkaClient = new Kafka({
  clientId: "chat-app",
  brokers: ["kafka-b0eceb2-mianmazhar301-4d78.c.aivencloud.com:16927"],
  ssl: {
    ca: [fs.readFileSync("./kafka/ca.pem", "utf-8")],
  },
  sasl: {
    username: process.env.KAFKA_USER,
    password: process.env.KAFKA_PASSWORD,
    mechanism: "plain",
  },
});
