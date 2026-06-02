const kafka = require("../config/kafka");

const consumer = kafka.consumer({
  groupId: "flight-group",
});

const startConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: "booking-created",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());

      const {
        flightId,
        seatRow,
        seatNumber,
        userId,
      } = event;

      console.log(`Processing booking for flight ${flightId}, seat ${seatRow}${seatNumber} `+ userId + " "+ new Date().toLocaleDateString("tr-TR") + " " + new Date().toLocaleTimeString("tr-TR"));
    },
  });
};

module.exports = startConsumer;