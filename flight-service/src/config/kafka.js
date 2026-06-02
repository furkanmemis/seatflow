const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "flight-service",
  brokers: ["localhost:29092"],
});

module.exports = kafka;