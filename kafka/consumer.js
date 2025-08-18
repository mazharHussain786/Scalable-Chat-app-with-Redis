
import { kafkaClient } from "./kafka-client.js";
import { saveMessageToDb } from "../db/models/message.js";

export const TOPIC = "MESSAGES";
const consumer = kafkaClient.consumer({ groupId: "chat-group" });

await consumer.connect();
console.log("consumer connected")
await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

await consumer.run({
  autoCommit: true,
  eachMessage: async ({ message, pause }) => {
    console.log("Consumer Detected Message ")
    try {
      await saveMessageToDb(message.value.toString())
    }
    catch (err) {
      pause()
      setTimeout(() => {
        consumer.resume()
      }, 60 * 1000)

    }
  }
});
