const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "booking-service",
  brokers: ["localhost:9092"],
});

module.exports = kafka;