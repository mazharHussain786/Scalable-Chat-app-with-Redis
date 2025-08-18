import { kafkaClient } from "./kafka-client.js";
export const createTopic = async (topic) => {
  const admin = kafkaClient.admin();
  await admin.connect();
  const topics = await admin.listTopics();
  if (!topics.includes(topic)) {
    await admin.createTopics({
      topics: [{ topic: topic, numPartitions: 1 }],
    });
    console.log("topic is created");
  } else {
    console.log("Topic Already Exists");
  }

  await admin.disconnect();
  console.log("admin disconnected");
};

let producer = null;

export const produceMessage = async (key, value, topic) => {
  if (!producer) {
    producer = kafkaClient.producer();
  }

  await producer.connect();
  await producer.send({
    messages: [{ key: key, value: JSON.stringify(value) }],
    topic: topic,
  });
  console.log("Message is send Successfully");
};
