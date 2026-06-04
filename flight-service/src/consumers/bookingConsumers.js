const kafka = require("../config/kafka");
const {updateFlightSeats} = require("../services/flight");

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
        bookingId
      } = event;

      console.log("booking-created event received:", event);

      await updateFlightSeats(flightId, seatRow, seatNumber, "reserved", userId, bookingId);
    },
  });
};

module.exports = startConsumer;